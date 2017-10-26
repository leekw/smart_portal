package net.smart.web.domain.changerequest;

import java.util.Date;

import net.smart.common.domain.Common;

public class ChangeRequestLog extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -5130222698786248009L;
	private String jiraId;
	private int issueId;
	private String team;
	private int logSeq;
	private String logMessage;
	private Date logDate;
	private int count;
	private int verifyCount;
	private int dateCount;
	private int formatCount;
	private int reqCount;
	private int newCount;
	private int etcCount;
	private String logType;
	private String crMode;
	
	
	public String getCrMode() {
		return crMode;
	}
	public void setCrMode(String crMode) {
		this.crMode = crMode;
	}
	public String getLogType() {
		return logType;
	}
	public void setLogType(String logType) {
		this.logType = logType;
	}
	public int getVerifyCount() {
		return verifyCount;
	}
	public void setVerifyCount(int verifyCount) {
		this.verifyCount = verifyCount;
	}
	public int getDateCount() {
		return dateCount;
	}
	public void setDateCount(int dateCount) {
		this.dateCount = dateCount;
	}
	public int getFormatCount() {
		return formatCount;
	}
	public void setFormatCount(int formatCount) {
		this.formatCount = formatCount;
	}
	public int getReqCount() {
		return reqCount;
	}
	public void setReqCount(int reqCount) {
		this.reqCount = reqCount;
	}
	public int getNewCount() {
		return newCount;
	}
	public void setNewCount(int newCount) {
		this.newCount = newCount;
	}
	public int getEtcCount() {
		return etcCount;
	}
	public void setEtcCount(int etcCount) {
		this.etcCount = etcCount;
	}
	public String getJiraId() {
		return jiraId;
	}
	public void setJiraId(String jiraId) {
		this.jiraId = jiraId;
	}
	public int getIssueId() {
		return issueId;
	}
	public void setIssueId(int issueId) {
		this.issueId = issueId;
	}
	public String getTeam() {
		return team;
	}
	public void setTeam(String team) {
		this.team = team;
	}
	public int getLogSeq() {
		return logSeq;
	}
	public void setLogSeq(int logSeq) {
		this.logSeq = logSeq;
	}
	public String getLogMessage() {
		return logMessage;
	}
	public void setLogMessage(String logMessage) {
		this.logMessage = logMessage;
	}
	public Date getLogDate() {
		return logDate;
	}
	public void setLogDate(Date logDate) {
		this.logDate = logDate;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
		
    
}
