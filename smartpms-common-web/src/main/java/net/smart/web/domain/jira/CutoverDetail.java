package net.smart.web.domain.jira;

import java.util.Date;

import net.smart.common.domain.Common;

public class CutoverDetail extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6383461637569896150L;
	
	private int detailId;
	private String detailType;
	private String jobId;
	private String detailSummary;
	private String worker;
	private Date regDate;
	private String regDateStr;
	
	
	public String getRegDateStr() {
		return regDateStr;
	}
	public void setRegDateStr(String regDateStr) {
		this.regDateStr = regDateStr;
	}
	public int getDetailId() {
		return detailId;
	}
	public void setDetailId(int detailId) {
		this.detailId = detailId;
	}
	public String getDetailType() {
		return detailType;
	}
	public void setDetailType(String detailType) {
		this.detailType = detailType;
	}
	public String getJobId() {
		return jobId;
	}
	public void setJobId(String jobId) {
		this.jobId = jobId;
	}
	public String getDetailSummary() {
		return detailSummary;
	}
	public void setDetailSummary(String detailSummary) {
		this.detailSummary = detailSummary;
	}
	public String getWorker() {
		return worker;
	}
	public void setWorker(String worker) {
		this.worker = worker;
	}
	public Date getRegDate() {
		return regDate;
	}
	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

}
