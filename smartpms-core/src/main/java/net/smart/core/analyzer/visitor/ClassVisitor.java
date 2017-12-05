package net.smart.core.analyzer.visitor;

import com.google.common.collect.Lists;
import net.smart.common.domain.*;
import net.smart.core.analyzer.store.AnalysisAssetStore;
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
    private List<AnalysisAssetRelation> relations;

    public ClassVisitor(JavaClass jc, AnalysisAssetStore store) {
        clazz = jc;
        this.store = store;
        asset = AnalysisAsset.builder().build();
        relations = Lists.newArrayList();
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
                    .assetOperationCode(method.getCode() == null ? null : method.getCode().toString())
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
                AnalysisAssetRelation relation = AnalysisAssetRelation.builder().build();
                relation.setRelationType(AnalysisAssetRelationType.CLASS_TO_CLASS);
                relation.setSourceAsset(clazz.getSourceFileName());
                relation.setTargetAsset(referencedClass);
                System.out.println(String.format(classReferenceFormat, referencedClass));
                relations.add(relation);
            }
        }
        store.addAnalysisAssetRelation(relations);
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
