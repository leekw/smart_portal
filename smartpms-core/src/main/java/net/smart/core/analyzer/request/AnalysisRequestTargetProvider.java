package net.smart.core.analyzer.request;

import java.util.List;

import net.smart.core.domain.AnalysisRequestTarget;

import org.springframework.stereotype.Component;

import com.google.common.collect.Lists;

@Component
public class AnalysisRequestTargetProvider {
	
	public List<AnalysisRequestTarget> getAnalysisRequestTargets() {
		return Lists.newArrayList();
	}
}
