package net.smart.core.analyzer.request;

import java.util.List;

import net.smart.core.domain.AnalysisRequestTarget;

import org.springframework.stereotype.Component;

import com.google.common.collect.Lists;

@Component
public class AnalysisRequestTargetProvider {
	
	public List<AnalysisRequestTarget> getAnalysisRequestTargets() {
		return Lists.newArrayList(AnalysisRequestTarget.builder()
				.analysisRequestTargetBinaryPath("/Users/ags0688/Documents/temp/bbb/classes.zip")
				.build());
	}

	public AnalysisRequestTarget nextAnalysisRequestTarget() {
		return getAnalysisRequestTargets().stream().findFirst().orElseGet(null);
	}
}
