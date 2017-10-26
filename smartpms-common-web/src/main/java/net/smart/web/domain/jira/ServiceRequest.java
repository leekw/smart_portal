package net.smart.web.domain.jira;

import net.smart.common.domain.Common;

public class ServiceRequest extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4638168990902757822L;
	
	private String project;
	private String issueTypeName;
	private long issueTypeId;
	private String srNo;
	private String programId;
	private int doneRatio;
	
	
	public int getDoneRatio() {
		return doneRatio;
	}
	public void setDoneRatio(int doneRatio) {
		this.doneRatio = doneRatio;
	}
	public String getSrNo() {
		return srNo;
	}
	public void setSrNo(String srNo) {
		this.srNo = srNo;
	}
	public String getProgramId() {
		return programId;
	}
	public void setProgramId(String programId) {
		this.programId = programId;
	}
	public String getProject() {
		return project;
	}
	public void setProject(String project) {
		this.project = project;
	}	
	public String getIssueTypeName() {
		return issueTypeName;
	}
	public void setIssueTypeName(String issueTypeName) {
		this.issueTypeName = issueTypeName;
	}
	public long getIssueTypeId() {
		return issueTypeId;
	}
	public void setIssueTypeId(long issueTypeId) {
		this.issueTypeId = issueTypeId;
	}
	
	
}
