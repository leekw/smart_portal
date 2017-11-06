package net.smart.core.domain;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AnalysisAsset {
	private long analysisAssetId;
	private String assetName;
	private String assetFullPath;
	private String assetSize;
	private String assetSourceFullPath;
	private String assetSourceCode;
	private String assetLoc;
    private List<AnalysisAssetOperation> analysisAssetOperationList;
}
