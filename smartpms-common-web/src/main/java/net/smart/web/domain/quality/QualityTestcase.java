package net.smart.web.domain.quality;

import net.smart.common.domain.Common;

public class QualityTestcase extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -5980521418484398259L;
	private String programId;
	private String status;
	private String resolution;
	private String utJiraId;
	private String testLevel;
	
	
	public String getTestLevel() {
		return testLevel;
	}
	public void setTestLevel(String testLevel) {
		this.testLevel = testLevel;
	}
	public String getUtJiraId() {
		return utJiraId;
	}
	public void setUtJiraId(String utJiraId) {
		this.utJiraId = utJiraId;
	}
	public String getProgramId() {
		return programId;
	}
	public void setProgramId(String programId) {
		this.programId = programId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getResolution() {
		return resolution;
	}
	public void setResolution(String resolution) {
		this.resolution = resolution;
	}

}
