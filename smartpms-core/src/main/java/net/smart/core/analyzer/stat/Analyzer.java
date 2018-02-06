package net.smart.core.analyzer.stat;

import net.smart.common.domain.AnalysisRequestTarget;

public interface Analyzer {
	public boolean isSupport(AnalysisRequestTarget target);
	public void analyze(AnalysisRequestTarget target);
}
