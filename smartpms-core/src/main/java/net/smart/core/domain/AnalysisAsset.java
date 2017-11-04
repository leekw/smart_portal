package net.smart.core.domain;

import lombok.Data;

@Data
public class AnalysisAsset {
	private long analysisAssetId;
	private String assetName;
	private String assetFullPath;
	private String assetSize;
	private String assetSourceFullPath;
	private String assetSourceCode;
	private String aseetLoc;
}
