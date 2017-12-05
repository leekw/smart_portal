package net.smart.common.domain;

import java.util.Date;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
public class AnalysisRequestTarget {
	private Date analysisRequestedAt;
	private String analysisRequester;
	private String analysisRequestTargetPath;
	private String analysisRequestTargetBinaryPath;
	private AnalysisRequestType analysisRequestType;
}
