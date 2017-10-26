package net.smart.core.domain;

import net.smart.common.domain.Common;

public class AssetRelation extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 2963649346899166393L;
	private String divDate;
	private String assetDiv;
	private String relationName;
	private String sourceAsset;
	private String targetAsset;
	private String relationType;
	
	public String getDivDate() {
		return divDate;
	}
	public void setDivDate(String divDate) {
		this.divDate = divDate;
	}
	public String getAssetDiv() {
		return assetDiv;
	}
	public void setAssetDiv(String assetDiv) {
		this.assetDiv = assetDiv;
	}
	public String getRelationName() {
		return relationName;
	}
	public void setRelationName(String relationName) {
		this.relationName = relationName;
	}
	public String getSourceAsset() {
		return sourceAsset;
	}
	public void setSourceAsset(String sourceAsset) {
		this.sourceAsset = sourceAsset;
	}
	public String getTargetAsset() {
		return targetAsset;
	}
	public void setTargetAsset(String targetAsset) {
		this.targetAsset = targetAsset;
	}
	public String getRelationType() {
		return relationType;
	}
	public void setRelationType(String relationType) {
		this.relationType = relationType;
	}

}
