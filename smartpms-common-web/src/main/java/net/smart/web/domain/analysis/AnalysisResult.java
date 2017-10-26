package net.smart.web.domain.analysis;

public class AnalysisResult extends AnalysisRaw {
	private String targetYn;
	private String remark;
	private String attachFileUrl;
	private String attachFileName;
	private String status;
	private String refKey;
	private String statusName;
	
	
	public String getStatusName() {
		return statusName;
	}
	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}
	public String getAttachFileName() {
		return attachFileName;
	}
	public void setAttachFileName(String attachFileName) {
		this.attachFileName = attachFileName;
	}
	public String getTargetYn() {
		return targetYn;
	}
	public void setTargetYn(String targetYn) {
		this.targetYn = targetYn;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getAttachFileUrl() {
		return attachFileUrl;
	}
	public void setAttachFileUrl(String attachFileUrl) {
		this.attachFileUrl = attachFileUrl;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getRefKey() {
		return refKey;
	}
	public void setRefKey(String refKey) {
		this.refKey = refKey;
	}
	
	
	
}
