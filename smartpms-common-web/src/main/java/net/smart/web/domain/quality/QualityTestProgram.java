package net.smart.web.domain.quality;

import net.smart.common.domain.Common;

public class QualityTestProgram extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2180947897833416653L;
	
	private int issueId;
	private String programId;
	private String testStartProgramId;
	private String testType;
	private String testJiraId;
	
	public QualityTestProgram(int issueId, String programId, String testStartProgramId, String testType, String testJiraId) {
		this.issueId = issueId;
		this.programId = programId;
		this.testStartProgramId = testStartProgramId;
		this.testType = testType;
		this.testJiraId = testJiraId;
	}
	
	public int getIssueId() {
		return issueId;
	}
	public void setIssueId(int issueId) {
		this.issueId = issueId;
	}
	public String getProgramId() {
		return programId;
	}
	public void setProgramId(String programId) {
		this.programId = programId;
	}
	public String getTestStartProgramId() {
		return testStartProgramId;
	}
	public void setTestStartProgramId(String testStartProgramId) {
		this.testStartProgramId = testStartProgramId;
	}
	public String getTestType() {
		return testType;
	}
	public void setTestType(String testType) {
		this.testType = testType;
	}
	public String getTestJiraId() {
		return testJiraId;
	}
	public void setTestJiraId(String testJiraId) {
		this.testJiraId = testJiraId;
	}
	
	

}
