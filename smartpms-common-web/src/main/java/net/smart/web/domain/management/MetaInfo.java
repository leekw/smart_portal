package net.smart.web.domain.management;

import net.smart.common.domain.Common;

public class MetaInfo extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 699524351523961385L;
	private int metaSeq;
	private String metaDiv;
	private String metaName;
	private String metaFullName;
	private String metaDescription;
	private String sysInfo;
	private String remark;
	private String metaType;
	
	
	public String getMetaType() {
		return metaType;
	}
	public void setMetaType(String metaType) {
		this.metaType = metaType;
	}
	public int getMetaSeq() {
		return metaSeq;
	}
	public void setMetaSeq(int metaSeq) {
		this.metaSeq = metaSeq;
	}
	public String getMetaDiv() {
		return metaDiv;
	}
	public void setMetaDiv(String metaDiv) {
		this.metaDiv = metaDiv;
	}
	public String getMetaName() {
		return metaName;
	}
	public void setMetaName(String metaName) {
		this.metaName = metaName;
	}
	public String getMetaFullName() {
		return metaFullName;
	}
	public void setMetaFullName(String metaFullName) {
		this.metaFullName = metaFullName;
	}
	public String getMetaDescription() {
		return metaDescription;
	}
	public void setMetaDescription(String metaDescription) {
		this.metaDescription = metaDescription;
	}
	public String getSysInfo() {
		return sysInfo;
	}
	public void setSysInfo(String sysInfo) {
		this.sysInfo = sysInfo;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}
