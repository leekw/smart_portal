package net.smart.common.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnalysisAssetOperation {
	private long analysisAssetOperationId;
	private long analysisAssetId;
	private String assetOperationName;
	private String assetOperationType;
	private String assetOperationCode;
	private List<AnalysisAssetOperationItem> analysisAssetOperationItems;
}
