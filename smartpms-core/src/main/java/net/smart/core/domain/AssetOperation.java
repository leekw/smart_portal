package net.smart.core.domain;

import net.smart.common.domain.Common;

public class AssetOperation extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 2044721359150621967L;
	private String divDate;
	private String assetDiv;
	private String assetId;
	private String assetOperationId;
	private String assetPhysName;
	private String assetLogicName;
	private String assetType;
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
	public String getAssetId() {
		return assetId;
	}
	public void setAssetId(String assetId) {
		this.assetId = assetId;
	}
	public String getAssetOperationId() {
		return assetOperationId;
	}
	public void setAssetOperationId(String assetOperationId) {
		this.assetOperationId = assetOperationId;
	}
	public String getAssetPhysName() {
		return assetPhysName;
	}
	public void setAssetPhysName(String assetPhysName) {
		this.assetPhysName = assetPhysName;
	}
	public String getAssetLogicName() {
		return assetLogicName;
	}
	public void setAssetLogicName(String assetLogicName) {
		this.assetLogicName = assetLogicName;
	}
	public String getAssetType() {
		return assetType;
	}
	public void setAssetType(String assetType) {
		this.assetType = assetType;
	}
	

}
