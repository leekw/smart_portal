package net.smart.core.analyzer.stat;

import lombok.extern.slf4j.Slf4j;
import net.lingala.zip4j.core.ZipFile;
import net.lingala.zip4j.exception.ZipException;
import net.smart.common.domain.AnalysisRequestTarget;
import net.smart.common.domain.AnalysisRequestTool;
import net.smart.common.exception.BizException;
import net.smart.core.analyzer.store.AnalysisAssetStore;
import net.smart.core.analyzer.visitor.ClassVisitor;
import org.apache.bcel.classfile.ClassFormatException;
import org.apache.bcel.classfile.ClassParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.Enumeration;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

@Slf4j
@Service
public class CallTreeAnalyzer implements Analyzer {

    @Autowired
    private AnalysisAssetStore store;

    public boolean isSupport(AnalysisRequestTarget target) {
        return target.getAnalysisRequestToolList().contains(AnalysisRequestTool.CALL_TREE);
    }

    private String unzip(String source){
        try {
            ZipFile zipFile = new ZipFile(source);
            zipFile.extractAll(source + "-unzip");
            return source + "-unzip";
        } catch (ZipException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Async
    @Override
    public void analyze(AnalysisRequestTarget target) {
        ClassParser cp;
        String targetPath = target.getAnalysisRequestTargetBinaryPath();
        String sourceDir = unzip(target.getAnalysisRequestTargetSourcePath());
        try {
            File f = new File(targetPath);

            if (!f.exists()) {
                throw new BizException("Jar file " + target.getAnalysisRequestTargetBinaryPath() + " does not exist");
            }

            JarFile jar = new JarFile(f);

            Enumeration<JarEntry> entries = jar.entries();
            while (entries.hasMoreElements()) {
                JarEntry entry = entries.nextElement();
                if (entry.isDirectory() || !entry.getName().endsWith(".class")) {
                    continue;
                }

                try {
                    cp = new ClassParser(targetPath, entry.getName());

                    ClassVisitor visitor = new ClassVisitor(cp.parse(), store, sourceDir, target.getAnalysisFileNo());
                    visitor.start();
                } catch (ClassFormatException ex) {
                    log.warn("is not a Java .class file");
                } catch (Exception ex) {
                    throw new BizException(ex);
                }
            }
        } catch (IOException e) {
            throw new BizException("Error.00001", "Error while processing jar: " + e.getMessage(), e);
        }
    }
}
