package net.smart.web.domain.jira;

import net.smart.common.domain.Common;

public class SourceJiraInfo extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4613638223015049554L;
	
	private String jobId;
	private String startExpectDate;
	private String startExpectTime;
	private String duration;
	private String endExpectDate;
	private String endExpectTime;
	private String systemType;
	private String jobStep;
	private String jobType;
	private String xCategory;
	private String yCategory;
	private String jobSortId;
	private String task;
	private String activity;
	private String preJob;
	private String jobExecutionTeam;
	private String jobExecutor;
	private String backUp;
	private String jobCheckList;
	private String caution;
	private String startExecutionDate;
	private String endExecutionDate;
	private String supervisor;
	private String ktSupervisor;
	private String etc;
	private String jiraId;
	private String jiraStatus;
	private String jiraDueDate;
	private String regDate;
	private String modifyDate;
	private String lastSyncDate;
	private String resolution;
	private String cutoverTh;
	private String assignee;
	private String coverTh;
	private String updated;
	private String issueLink;
	private String jobStepDetail;
	private String jiraCreateDate;
	private String summary;
	private String priority;
	private String queChannel;
	private String bizType;
	private String reporter;
	
	private int projectId;
	private int issueTypeId;
	private int queChannelId;
	private int bizTypeId;
	private String searchDate;
	
	
	public String getReporter() {
		return reporter;
	}
	public void setReporter(String reporter) {
		this.reporter = reporter;
	}
	public String getSearchDate() {
		return searchDate;
	}
	public void setSearchDate(String searchDate) {
		this.searchDate = searchDate;
	}
	public int getProjectId() {
		return projectId;
	}
	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}
	public int getIssueTypeId() {
		return issueTypeId;
	}
	public void setIssueTypeId(int issueTypeId) {
		this.issueTypeId = issueTypeId;
	}
	public int getQueChannelId() {
		return queChannelId;
	}
	public void setQueChannelId(int queChannelId) {
		this.queChannelId = queChannelId;
	}
	public int getBizTypeId() {
		return bizTypeId;
	}
	public void setBizTypeId(int bizTypeId) {
		this.bizTypeId = bizTypeId;
	}
	public String getQueChannel() {
		return queChannel;
	}
	public void setQueChannel(String queChannel) {
		this.queChannel = queChannel;
	}
	public String getBizType() {
		return bizType;
	}
	public void setBizType(String bizType) {
		this.bizType = bizType;
	}
	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public String getJiraCreateDate() {
		return jiraCreateDate;
	}
	public void setJiraCreateDate(String jiraCreateDate) {
		this.jiraCreateDate = jiraCreateDate;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getJobStepDetail() {
		return jobStepDetail;
	}
	public void setJobStepDetail(String jobStepDetail) {
		this.jobStepDetail = jobStepDetail;
	}
	public String getIssueLink() {
		return issueLink;
	}
	public void setIssueLink(String issueLink) {
		this.issueLink = issueLink;
	}
	public String getCoverTh() {
		return coverTh;
	}
	public void setCoverTh(String coverTh) {
		this.coverTh = coverTh;
	}
	public String getUpdated() {
		return updated;
	}
	public void setUpdated(String updated) {
		this.updated = updated;
	}
	public String getJobId() {
		return jobId;
	}
	public void setJobId(String jobId) {
		this.jobId = jobId;
	}
	public String getStartExpectDate() {
		return startExpectDate;
	}
	public void setStartExpectDate(String startExpectDate) {
		this.startExpectDate = startExpectDate;
	}
	public String getStartExpectTime() {
		return startExpectTime;
	}
	public void setStartExpectTime(String startExpectTime) {
		this.startExpectTime = startExpectTime;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	public String getEndExpectDate() {
		return endExpectDate;
	}
	public void setEndExpectDate(String endExpectDate) {
		this.endExpectDate = endExpectDate;
	}
	public String getEndExpectTime() {
		return endExpectTime;
	}
	public void setEndExpectTime(String endExpectTime) {
		this.endExpectTime = endExpectTime;
	}
	public String getSystemType() {
		return systemType;
	}
	public void setSystemType(String systemType) {
		this.systemType = systemType;
	}
	public String getJobStep() {
		return jobStep;
	}
	public void setJobStep(String jobStep) {
		this.jobStep = jobStep;
	}
	public String getJobType() {
		return jobType;
	}
	public void setJobType(String jobType) {
		this.jobType = jobType;
	}
	public String getxCategory() {
		return xCategory;
	}
	public void setxCategory(String xCategory) {
		this.xCategory = xCategory;
	}
	public String getyCategory() {
		return yCategory;
	}
	public void setyCategory(String yCategory) {
		this.yCategory = yCategory;
	}
	public String getJobSortId() {
		return jobSortId;
	}
	public void setJobSortId(String jobSortId) {
		this.jobSortId = jobSortId;
	}
	public String getTask() {
		return task;
	}
	public void setTask(String task) {
		this.task = task;
	}
	public String getActivity() {
		return activity;
	}
	public void setActivity(String activity) {
		this.activity = activity;
	}
	public String getPreJob() {
		return preJob;
	}
	public void setPreJob(String preJob) {
		this.preJob = preJob;
	}
	public String getJobExecutionTeam() {
		return jobExecutionTeam;
	}
	public void setJobExecutionTeam(String jobExecutionTeam) {
		this.jobExecutionTeam = jobExecutionTeam;
	}
	public String getJobExecutor() {
		return jobExecutor;
	}
	public void setJobExecutor(String jobExecutor) {
		this.jobExecutor = jobExecutor;
	}
	public String getBackUp() {
		return backUp;
	}
	public void setBackUp(String backUp) {
		this.backUp = backUp;
	}
	public String getJobCheckList() {
		return jobCheckList;
	}
	public void setJobCheckList(String jobCheckList) {
		this.jobCheckList = jobCheckList;
	}
	public String getCaution() {
		return caution;
	}
	public void setCaution(String caution) {
		this.caution = caution;
	}
	public String getStartExecutionDate() {
		return startExecutionDate;
	}
	public void setStartExecutionDate(String startExecutionDate) {
		this.startExecutionDate = startExecutionDate;
	}
	public String getEndExecutionDate() {
		return endExecutionDate;
	}
	public void setEndExecutionDate(String endExecutionDate) {
		this.endExecutionDate = endExecutionDate;
	}
	public String getSupervisor() {
		return supervisor;
	}
	public void setSupervisor(String supervisor) {
		this.supervisor = supervisor;
	}
	public String getKtSupervisor() {
		return ktSupervisor;
	}
	public void setKtSupervisor(String ktSupervisor) {
		this.ktSupervisor = ktSupervisor;
	}
	public String getEtc() {
		return etc;
	}
	public void setEtc(String etc) {
		this.etc = etc;
	}
	public String getJiraId() {
		return jiraId;
	}
	public void setJiraId(String jiraId) {
		this.jiraId = jiraId;
	}
	public String getJiraStatus() {
		return jiraStatus;
	}
	public void setJiraStatus(String jiraStatus) {
		this.jiraStatus = jiraStatus;
	}
	public String getJiraDueDate() {
		return jiraDueDate;
	}
	public void setJiraDueDate(String jiraDueDate) {
		this.jiraDueDate = jiraDueDate;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public String getModifyDate() {
		return modifyDate;
	}
	public void setModifyDate(String modifyDate) {
		this.modifyDate = modifyDate;
	}
	public String getLastSyncDate() {
		return lastSyncDate;
	}
	public void setLastSyncDate(String lastSyncDate) {
		this.lastSyncDate = lastSyncDate;
	}
	public String getResolution() {
		return resolution;
	}
	public void setResolution(String resolution) {
		this.resolution = resolution;
	}
	public String getCutoverTh() {
		return cutoverTh;
	}
	public void setCutoverTh(String cutoverTh) {
		this.cutoverTh = cutoverTh;
	}
	public String getAssignee() {
		return assignee;
	}
	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}
	
	

}
