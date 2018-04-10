package net.smart.core.analyzer.visitor;

import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import net.smart.common.domain.*;
import net.smart.core.analyzer.store.AnalysisAssetStore;
import org.apache.bcel.classfile.*;
import org.apache.bcel.generic.ConstantPoolGen;
import org.apache.bcel.generic.MethodGen;
import org.apache.bcel.generic.Type;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

@Slf4j
public class ClassVisitor extends EmptyVisitor {
    private JavaClass clazz;
    private ConstantPoolGen constants;
    private String classReferenceFormat;
    private AnalysisAssetStore store;
    private AnalysisAsset asset;
    private List<AnalysisAssetRelation> relations;
    private String sourceDir;
    private long analysisRequestTargetNo;

    public ClassVisitor(JavaClass jc, AnalysisAssetStore store, String sourceDir, long analysisRequestTargetNo) {
        clazz = jc;
        this.store = store;
        asset = AnalysisAsset.builder().build();
        relations = Lists.newArrayList();
        constants = new ConstantPoolGen(clazz.getConstantPool());
        classReferenceFormat = "C:" + clazz.getClassName() + " %s";
        this.sourceDir = sourceDir;
        this.analysisRequestTargetNo = analysisRequestTargetNo;
        initAnalysisAsset();
    }

    private String getSourceFileFullPath(String path) {
        StringBuilder sb = new StringBuilder();
        sb.append(sourceDir)
                .append("/src/main/java/")
                .append(path.replaceAll(".", "/"))
                .append(".java");

        return sb.toString();
    }

    private String getFileContent(String targetFile) {
        FileInputStream inputStream = null;
        try {
            inputStream = new FileInputStream(targetFile);
            return IOUtils.toString(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
            return StringUtils.EMPTY;
        } finally {
            try {
                if (inputStream != null) {
                    inputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void initAnalysisAsset() {
        asset.setAnalysisRequestTargetNo(analysisRequestTargetNo);
        asset.setAssetFullPath(clazz.getFileName());
        asset.setAssetName(clazz.getClassName());
        asset.setAssetSize("0");
        asset.setAssetLoc("0");
        asset.setAssetSourceFullPath(getSourceFileFullPath(clazz.getClassName()));
        asset.setAssetSourceCode(getFileContent(asset.getAssetSourceFullPath()));
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
//        Method[] methods = jc.getMethods();
//        for (Method method : methods) {
//            method.accept(this);
//        }
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
                relation.setSourceAsset(clazz.getClassName());
                relation.setTargetAsset(referencedClass);
                relation.setAnalysisRequestTargetNo(analysisRequestTargetNo);
//                System.out.println(String.format(classReferenceFormat, referencedClass));
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
