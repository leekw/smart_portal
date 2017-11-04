package net.smart.core.domain;

import java.util.Date;

import lombok.Data;

@Data
public class AnalysisRequestTarget {
	private Date analysisRequestedAt;
	private String analysisRequester;
	private String analysisRequestTargetPath;
	private String analysisRequestTargetBinaryPath;
	private AnalysisRequestType analysisRequestType;
}
