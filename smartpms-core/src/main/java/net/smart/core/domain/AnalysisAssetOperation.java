package net.smart.core.domain;

import lombok.Data;

@Data
public class AnalysisAssetOperation {
	private long analysisAssetOperationId;
	private long analysisAssetId;
	private String assetOperationName;
	private String assetOperationType;
}
