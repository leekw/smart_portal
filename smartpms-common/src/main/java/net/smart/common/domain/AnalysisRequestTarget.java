package net.smart.common.domain;

import java.util.Date;
import java.util.List;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnalysisRequestTarget {
	private Date analysisRequestedAt;
	private String analysisRequester;
	private String analysisRequestTargetPath;
	private String analysisRequestTargetSourcePath;
	private String analysisRequestTargetBinaryPath;
	private String analysisRequestTargetSourceName;
	private String analysisRequestTargetResultPath;
	private String analysisStatus;
	private AnalysisRequestType analysisRequestType;
	private long analysisFileNo;
	private List<AnalysisRequestTool> analysisRequestToolList;
	private String serviceName;
	private String repoName;
	private String toolName;
}
