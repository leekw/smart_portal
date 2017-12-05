package net.smart.common.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnalysisAssetRelation {
	private AnalysisAssetRelationType relationType;
	private String sourceAsset;
	private String targetAsset;
	private long sourceRefId;
	private long targetRefId;
}
