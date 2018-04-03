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
public class AnalysisAsset {
	private long analysisAssetId;
	private String assetName;
	private String assetFullPath;
	private String assetSize;
	private String assetSourceFullPath;
	private String assetSourceCode;
	private String assetLoc;
    private List<AnalysisAssetOperation> analysisAssetOperationList;
    private long analysisRequestTargetNo;
}
