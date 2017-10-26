package net.smart.common.domain;

import java.util.Date;

public class DataSyncInfo extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8535363381445105417L;
	
	private String syncType;
	private Date lastSyncDate;
	private boolean insert;
	private String cutoverStartDate;
	private String cutoverEndDate;
	private String defectStartDate;
	private String defectEndDate;
	
	public DataSyncInfo() {
		
	}
	
	public DataSyncInfo(String cutoverStartDate, String cutoverEndDate, String defectStartDate, String defectEndDate) {
		this.cutoverStartDate = cutoverStartDate;
		this.cutoverEndDate = cutoverEndDate;
		this.defectStartDate = defectStartDate;
		this.defectEndDate = defectEndDate;
	}
	
	public String getCutoverStartDate() {
		return cutoverStartDate;
	}
	public void setCutoverStartDate(String cutoverStartDate) {
		this.cutoverStartDate = cutoverStartDate;
	}
	public String getCutoverEndDate() {
		return cutoverEndDate;
	}
	public void setCutoverEndDate(String cutoverEndDate) {
		this.cutoverEndDate = cutoverEndDate;
	}
	public String getDefectStartDate() {
		return defectStartDate;
	}
	public void setDefectStartDate(String defectStartDate) {
		this.defectStartDate = defectStartDate;
	}
	public String getDefectEndDate() {
		return defectEndDate;
	}
	public void setDefectEndDate(String defectEndDate) {
		this.defectEndDate = defectEndDate;
	}
	public boolean isInsert() {
		return insert;
	}
	public void setInsert(boolean insert) {
		this.insert = insert;
	}
	public String getSyncType() {
		return syncType;
	}
	public void setSyncType(String syncType) {
		this.syncType = syncType;
	}
	public Date getLastSyncDate() {
		return lastSyncDate;
	}
	public void setLastSyncDate(Date lastSyncDate) {
		this.lastSyncDate = lastSyncDate;
	}
}
