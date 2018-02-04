package net.smart.core.analyzer.stat;

import net.smart.common.domain.AnalysisRequestTarget;
import net.smart.core.analyzer.request.AnalysisRequestTargetProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StaticAnalyzer {

	@Autowired
	private AnalysisRequestTargetProvider analysisRequestTargetProvider;

	@Autowired
	private List<Analyzer> analyzerList;

	public void analyze() {
		AnalysisRequestTarget target = analysisRequestTargetProvider.nextAnalysisRequestTarget();
		if (target == null) {
			return;
		}
		for (Analyzer analyzer : analyzerList) {
			if (!analyzer.isSupport(target)) {
				continue;
			}
			analyzer.analyze(target);
		}
	}
}
