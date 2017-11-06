package net.smart.core.analyzer.stat;

import net.smart.common.exception.BizException;
import net.smart.core.analyzer.request.AnalysisRequestTargetProvider;
import net.smart.core.analyzer.store.AnalysisAssetStore;
import net.smart.core.analyzer.visitor.ClassVisitor;
import net.smart.core.domain.AnalysisAsset;
import net.smart.core.domain.AnalysisRequestTarget;
import org.apache.bcel.classfile.ClassParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.util.Enumeration;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

@Service
public class StaticAnalyzer implements Analyzer {

	@Autowired
	private AnalysisRequestTargetProvider analysisRequestTargetProvider;

	@Autowired
	private AnalysisAssetStore store;

	@Override
	@Transactional
//	@Scheduled(cron="0 0/10 * * * ? ")
	public void analyze() {
		AnalysisRequestTarget target = analysisRequestTargetProvider.nextAnalysisRequestTarget();
		if (target != null) {
			ClassParser cp;
			String targetPath = target.getAnalysisRequestTargetBinaryPath();
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

						ClassVisitor visitor = new ClassVisitor(cp.parse(), store);
						visitor.start();
					} catch (Exception ex) {
						throw new BizException(ex);
					}
				}
			} catch (IOException e) {
				throw new BizException("Error.00001", "Error while processing jar: " + e.getMessage(), e);
			}
		}
	}
	
}
