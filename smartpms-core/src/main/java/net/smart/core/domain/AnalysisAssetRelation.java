package net.smart.core.domain;

import lombok.Data;

@Data
public class AnalysisAssetRelation {
	private String relationType;
	private long sourceAsset;
	private long targetAsset;
	private String sourceFullName;
	private String targetFullName;
}
