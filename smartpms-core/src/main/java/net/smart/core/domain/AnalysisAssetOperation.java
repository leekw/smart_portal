package net.smart.core.domain;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AnalysisAssetOperation {
	private long analysisAssetOperationId;
	private long analysisAssetId;
	private String assetOperationName;
	private String assetOperationType;
	private String assetOperationCode;
	private List<AnalysisAssetOperationItem> analysisAssetOperationItems;
}
