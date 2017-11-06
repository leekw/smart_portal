package net.smart.core.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AnalysisAssetRelation {
	private AnalysisAssetRelationType relationType;
	private String sourceAsset;
	private String targetAsset;
	private long sourceRefId;
	private long targetRefId;
}
