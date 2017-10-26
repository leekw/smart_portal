package net.smart.web.domain.quality;

import java.util.Date;

import net.smart.common.domain.Common;

public class NotUsedStat extends Common {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -2068278750000326873L;
	private int nuseStatId;
	private String assetEnv;
	private String div;
	private String[] assetIdList;
	private int assetColectHstId;
	private Date regDt;
	private String regrId;
	private Date chgDt;
	private String chrgId;
	private String filePath;
	
	
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public int getNuseStatId() {
		return nuseStatId;
	}
	public void setNuseStatId(int nuseStatId) {
		this.nuseStatId = nuseStatId;
	}
	public String getAssetEnv() {
		return assetEnv;
	}
	public void setAssetEnv(String assetEnv) {
		this.assetEnv = assetEnv;
	}
	public String getDiv() {
		return div;
	}
	public void setDiv(String div) {
		this.div = div;
	}
	
	public String[] getAssetIdList() {
		return assetIdList;
	}
	public void setAssetIdList(String[] assetIdList) {
		this.assetIdList = assetIdList;
	}
	public int getAssetColectHstId() {
		return assetColectHstId;
	}
	public void setAssetColectHstId(int assetColectHstId) {
		this.assetColectHstId = assetColectHstId;
	}
	public Date getRegDt() {
		return regDt;
	}
	public void setRegDt(Date regDt) {
		this.regDt = regDt;
	}
	public String getRegrId() {
		return regrId;
	}
	public void setRegrId(String regrId) {
		this.regrId = regrId;
	}
	public Date getChgDt() {
		return chgDt;
	}
	public void setChgDt(Date chgDt) {
		this.chgDt = chgDt;
	}
	public String getChrgId() {
		return chrgId;
	}
	public void setChrgId(String chrgId) {
		this.chrgId = chrgId;
	}
	
	
}
