package net.smart.core.analyzer.visitor;

import com.google.common.collect.Lists;
import net.smart.core.analyzer.store.AnalysisAssetStore;
import net.smart.core.domain.AnalysisAsset;
import net.smart.core.domain.AnalysisAssetOperation;
import net.smart.core.domain.AnalysisAssetOperationItem;
import net.smart.core.domain.AnalysisAssetOperationItemType;
import org.apache.bcel.classfile.Constant;
import org.apache.bcel.classfile.ConstantPool;
import org.apache.bcel.classfile.EmptyVisitor;
import org.apache.bcel.classfile.JavaClass;
import org.apache.bcel.classfile.Method;
import org.apache.bcel.generic.ConstantPoolGen;
import org.apache.bcel.generic.MethodGen;
import org.apache.bcel.generic.Type;

import java.util.List;

public class ClassVisitor extends EmptyVisitor {
    private JavaClass clazz;
    private ConstantPoolGen constants;
    private String classReferenceFormat;
    private AnalysisAssetStore store;
    private AnalysisAsset asset;

    public ClassVisitor(JavaClass jc, AnalysisAssetStore store) {
        clazz = jc;
        this.store = store;
        constants = new ConstantPoolGen(clazz.getConstantPool());
        initAnalysisAsset();
        classReferenceFormat = "C:" + clazz.getClassName() + " %s";
    }

    private void initAnalysisAsset() {
        asset.setAssetFullPath(clazz.getFileName());
        asset.setAssetName(clazz.getClassName());
        asset.setAssetSize("0");
        asset.setAssetLoc("0");
        asset.setAssetSourceFullPath(clazz.getSourceFileName());
        asset.setAssetSourceCode(String.valueOf(clazz.getSource()));
        asset.setAnalysisAssetOperationList(Lists.newArrayList());
        for (Method method : clazz.getMethods()) {
            AnalysisAssetOperation operation = AnalysisAssetOperation.builder()
                    .assetOperationName(method.getName())
                    .assetOperationCode(method.getCode().toString())
                    .analysisAssetOperationItems(Lists.newArrayList())
                    .build();
            operation.getAnalysisAssetOperationItems().add(
                    AnalysisAssetOperationItem.builder()
                     .itemType(AnalysisAssetOperationItemType.RETURN_TYPE)
                     .itemName(method.getReturnType().getSignature())
                     .itemOrder(0)
                    .build());
            int index = 0;
            for (Type type :  method.getArgumentTypes()) {
                operation.getAnalysisAssetOperationItems().add(
                        AnalysisAssetOperationItem.builder()
                                .itemType(AnalysisAssetOperationItemType.ARGUMENT_TYPE)
                                .itemName(type.getSignature())
                                .itemOrder(index++)
                                .build());
            }
            asset.getAnalysisAssetOperationList().add(operation);
        }
        store.addAnalysisAsset(Lists.newArrayList(asset));
    }

    public void visitJavaClass(JavaClass jc) {
        jc.getConstantPool().accept(this);
        Method[] methods = jc.getMethods();
        for (Method method : methods) {
            method.accept(this);
        }
    }

    public void visitConstantPool(ConstantPool constantPool) {
        for (int i = 0; i < constantPool.getLength(); i++) {
            Constant constant = constantPool.getConstant(i);
            if (constant == null)
                continue;
            if (constant.getTag() == 7) {
                String referencedClass = constantPool.constantToString(constant);

                System.out.println(String.format(classReferenceFormat, referencedClass));
            }
        }
    }

    public void visitMethod(Method method) {
        MethodGen mg = new MethodGen(method, clazz.getClassName(), constants);
        MethodVisitor visitor = new MethodVisitor(mg, clazz);
        visitor.start();
    }

    public void start() {
        visitJavaClass(clazz);
    }
}
