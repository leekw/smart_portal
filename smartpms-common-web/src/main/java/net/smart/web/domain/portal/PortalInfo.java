package net.smart.web.domain.portal;

import net.smart.common.domain.Common;

public class PortalInfo extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -5356849169641568096L;
	private String isAdmin;
	private String mainLight;
	private String connUserLight;
	private String bizLight;
	private String iscLight;
	private String useYn;
	private int limitConnectionCount;
	private int currentConnectionCount;
	private String mainResorceId;
	private String cutoverStartDate;
	private String cutoverEndDate;
	private String defectStartDate;
	private String defectEndDate;
	private String svnCheckYn;
	
	
	public String getSvnCheckYn() {
		return svnCheckYn;
	}
	public void setSvnCheckYn(String svnCheckYn) {
		this.svnCheckYn = svnCheckYn;
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
	public String getMainResorceId() {
		return mainResorceId;
	}
	public void setMainResorceId(String mainResorceId) {
		this.mainResorceId = mainResorceId;
	}
	public int getCurrentConnectionCount() {
		return currentConnectionCount;
	}
	public void setCurrentConnectionCount(int currentConnectionCount) {
		this.currentConnectionCount = currentConnectionCount;
	}
	public int getLimitConnectionCount() {
		return limitConnectionCount;
	}
	public void setLimitConnectionCount(int limitConnectionCount) {
		this.limitConnectionCount = limitConnectionCount;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getIsAdmin() {
		return isAdmin;
	}
	public void setIsAdmin(String isAdmin) {
		this.isAdmin = isAdmin;
	}
	public String getMainLight() {
		return mainLight;
	}
	public void setMainLight(String mainLight) {
		this.mainLight = mainLight;
	}
	public String getConnUserLight() {
		return connUserLight;
	}
	public void setConnUserLight(String connUserLight) {
		this.connUserLight = connUserLight;
	}
	public String getBizLight() {
		return bizLight;
	}
	public void setBizLight(String bizLight) {
		this.bizLight = bizLight;
	}
	public String getIscLight() {
		return iscLight;
	}
	public void setIscLight(String iscLight) {
		this.iscLight = iscLight;
	}
	
	

}
