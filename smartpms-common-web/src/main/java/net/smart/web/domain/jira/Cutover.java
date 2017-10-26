package net.smart.web.domain.jira;

import java.util.Date;
import java.util.List;

import net.smart.common.domain.Common;


public class Cutover extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -2000795778196403657L;
	private String jobId;
	private String startExpectDate;
	private String startExpectTime;
	private String endExpectDate;
	private String endExpectTime;
	private String duration;
	private String systemType;
	private String jobStep;
	private String jobType;
	private String xCategory;
	private String yCategory;
	private String jobSortId;
	private String task;
	private String activity;
	private String jobExecutionTeam;
	private String jobExecutor;
	private String backup;
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
	private String resolution;
	private String cutoverTh;
	private String assignee;
	private String preJob;
	private String filterType;
	private String issueLink;
	private String jiraStatusDesc;
	private String mode;
	private String itemStatus;
	private String itemAuthor;
	private int sortNo;
	private String itemStatusName;
	private String jobExecutionTeamName;
	private String jiraSyncMessage;
	private String jobExecutorId;
	private String supervisorId;
	private String teamName;
	private List<String> teams;
	private List<String> systems;
	private long durationData;
	private int firstDetailId;
	private Date startDate;
	private Date endDate;
	private String itemAuthorName;
	private String itemCreateDate;
	private String itemUpdateDate;
	
	
	public String getItemCreateDate() {
		return itemCreateDate;
	}
	public void setItemCreateDate(String itemCreateDate) {
		this.itemCreateDate = itemCreateDate;
	}
	public String getItemUpdateDate() {
		return itemUpdateDate;
	}
	public void setItemUpdateDate(String itemUpdateDate) {
		this.itemUpdateDate = itemUpdateDate;
	}
	public String getItemAuthorName() {
		return itemAuthorName;
	}
	public void setItemAuthorName(String itemAuthorName) {
		this.itemAuthorName = itemAuthorName;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public int getFirstDetailId() {
		return firstDetailId;
	}
	public void setFirstDetailId(int firstDetailId) {
		this.firstDetailId = firstDetailId;
	}
	public long getDurationData() {
		return durationData;
	}
	public void setDurationData(long durationData) {
		this.durationData = durationData;
	}
	public List<String> getTeams() {
		return teams;
	}
	public void setTeams(List<String> teams) {
		this.teams = teams;
	}
	public List<String> getSystems() {
		return systems;
	}
	public void setSystems(List<String> systems) {
		this.systems = systems;
	}
	public String getTeamName() {
		return teamName;
	}
	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}
	public String getJobExecutorId() {
		return jobExecutorId;
	}
	public void setJobExecutorId(String jobExecutorId) {
		this.jobExecutorId = jobExecutorId;
	}
	public String getSupervisorId() {
		return supervisorId;
	}
	public void setSupervisorId(String supervisorId) {
		this.supervisorId = supervisorId;
	}
	public String getJiraSyncMessage() {
		return jiraSyncMessage;
	}
	public void setJiraSyncMessage(String jiraSyncMessage) {
		this.jiraSyncMessage = jiraSyncMessage;
	}
	public String getJobExecutionTeamName() {
		return jobExecutionTeamName;
	}
	public void setJobExecutionTeamName(String jobExecutionTeamName) {
		this.jobExecutionTeamName = jobExecutionTeamName;
	}
	public String getItemStatusName() {
		return itemStatusName;
	}
	public void setItemStatusName(String itemStatusName) {
		this.itemStatusName = itemStatusName;
	}
	public String getStartExpectTime() {
		return startExpectTime;
	}
	public void setStartExpectTime(String startExpectTime) {
		this.startExpectTime = startExpectTime;
	}
	public String getEndExpectTime() {
		return endExpectTime;
	}
	public void setEndExpectTime(String endExpectTime) {
		this.endExpectTime = endExpectTime;
	}
	public int getSortNo() {
		return sortNo;
	}
	public void setSortNo(int sortNo) {
		this.sortNo = sortNo;
	}
	public String getItemStatus() {
		return itemStatus;
	}
	public void setItemStatus(String itemStatus) {
		this.itemStatus = itemStatus;
	}
	public String getItemAuthor() {
		return itemAuthor;
	}
	public void setItemAuthor(String itemAuthor) {
		this.itemAuthor = itemAuthor;
	}
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public String getJiraStatusDesc() {
		return jiraStatusDesc;
	}
	public void setJiraStatusDesc(String jiraStatusDesc) {
		this.jiraStatusDesc = jiraStatusDesc;
	}
	public String getIssueLink() {
		return issueLink;
	}
	public void setIssueLink(String issueLink) {
		this.issueLink = issueLink;
	}
	public String getFilterType() {
		return filterType;
	}
	public void setFilterType(String filterType) {
		this.filterType = filterType;
	}
	public String getPreJob() {
		return preJob;
	}
	public void setPreJob(String preJob) {
		this.preJob = preJob;
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
	public String getEndExpectDate() {
		return endExpectDate;
	}
	public void setEndExpectDate(String endExpectDate) {
		this.endExpectDate = endExpectDate;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
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
	public String getBackup() {
		return backup;
	}
	public void setBackup(String backup) {
		this.backup = backup;
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
