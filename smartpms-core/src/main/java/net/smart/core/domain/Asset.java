package net.smart.core.domain;

import java.math.BigDecimal;

import net.smart.common.domain.Common;

public class Asset extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 2745071487481381662L;
	private String divDate;
	private String assetDiv;
	private String assetId;
	private String assetPhysName;
	private String assetLogicName;
	private String assetPath;
	private String assetType;
	private String assetExtension;
	private BigDecimal assetSize;
	private BigDecimal assetLoc;
	private String assetLanguage;
	private String assetStatus;
	private String assetSourceFullName;
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
	public String getAssetPath() {
		return assetPath;
	}
	public void setAssetPath(String assetPath) {
		this.assetPath = assetPath;
	}
	public String getAssetType() {
		return assetType;
	}
	public void setAssetType(String assetType) {
		this.assetType = assetType;
	}
	public String getAssetExtension() {
		return assetExtension;
	}
	public void setAssetExtension(String assetExtension) {
		this.assetExtension = assetExtension;
	}
	public BigDecimal getAssetSize() {
		return assetSize;
	}
	public void setAssetSize(BigDecimal assetSize) {
		this.assetSize = assetSize;
	}
	public BigDecimal getAssetLoc() {
		return assetLoc;
	}
	public void setAssetLoc(BigDecimal assetLoc) {
		this.assetLoc = assetLoc;
	}
	public String getAssetLanguage() {
		return assetLanguage;
	}
	public void setAssetLanguage(String assetLanguage) {
		this.assetLanguage = assetLanguage;
	}
	public String getAssetStatus() {
		return assetStatus;
	}
	public void setAssetStatus(String assetStatus) {
		this.assetStatus = assetStatus;
	}
	public String getAssetSourceFullName() {
		return assetSourceFullName;
	}
	public void setAssetSourceFullName(String assetSourceFullName) {
		this.assetSourceFullName = assetSourceFullName;
	}
	

}
