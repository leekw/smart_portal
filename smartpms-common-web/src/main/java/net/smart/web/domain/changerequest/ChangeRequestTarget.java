package net.smart.web.domain.changerequest;

import java.util.Date;

import net.smart.common.domain.Common;

public class ChangeRequestTarget extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 4181281713488805592L;
	private String programId;
	private String programName;
	private String team;
	private String module;
	private String subModule;
	private String developer;
	private String designer;
	private String fileName;
	private String filePath;
	private String programType;
	private String programSmallType;
	private String wbsNumber;
	private Date startDate;
	private Date oldStartDate;
	private String startDateStr;
	private String oldStartDateStr;
	private Date dueDate;
	private Date oldDueDate;
	private String dueDateStr;
	private String oldDueDateStr;
	private int doneRatio;
	private String delayYn;
	private int issueId;
	private String interfaceId;
	private String useFlag;
	private String task;
	private String developDetail;
	private String extension;
	private String phase;
	private String iteration;
	private String srFlag;
	private String taskDetail;
	private String srNo;
	
	private String jiraId;
	private String mode;
	private String crRequester;
	private Date crRequestDate;
	private String crRequestDateStr;
	private Date crUpdateDate;
	private String crUpdateDateStr;
	private String crStatus;
	private String crReason;
	private boolean doneParam;
	
	private int logSeq;
	private String logType;
	private String logMessage;
	private int applyValue;
	
	
	public Date getOldStartDate() {
		return oldStartDate;
	}
	public void setOldStartDate(Date oldStartDate) {
		this.oldStartDate = oldStartDate;
	}
	public Date getOldDueDate() {
		return oldDueDate;
	}
	public void setOldDueDate(Date oldDueDate) {
		this.oldDueDate = oldDueDate;
	}
	public int getApplyValue() {
		return applyValue;
	}
	public void setApplyValue(int applyValue) {
		this.applyValue = applyValue;
	}
	public String getLogMessage() {
		return logMessage;
	}
	public void setLogMessage(String logMessage) {
		this.logMessage = logMessage;
	}
	public String getLogType() {
		return logType;
	}
	public void setLogType(String logType) {
		this.logType = logType;
	}
	public String getDesigner() {
		return designer;
	}
	public void setDesigner(String designer) {
		this.designer = designer;
	}
	public int getLogSeq() {
		return logSeq;
	}
	public void setLogSeq(int logSeq) {
		this.logSeq = logSeq;
	}
	public String getOldStartDateStr() {
		return oldStartDateStr;
	}
	public void setOldStartDateStr(String oldStartDateStr) {
		this.oldStartDateStr = oldStartDateStr;
	}
	public String getOldDueDateStr() {
		return oldDueDateStr;
	}
	public void setOldDueDateStr(String oldDueDateStr) {
		this.oldDueDateStr = oldDueDateStr;
	}
	public boolean isDoneParam() {
		return doneParam;
	}
	public void setDoneParam(boolean doneParam) {
		this.doneParam = doneParam;
	}
	public String getCrReason() {
		return crReason;
	}
	public void setCrReason(String crReason) {
		this.crReason = crReason;
	}
	public String getCrStatus() {
		return crStatus;
	}
	public void setCrStatus(String crStatus) {
		this.crStatus = crStatus;
	}
	public String getTaskDetail() {
		return taskDetail;
	}
	public void setTaskDetail(String taskDetail) {
		this.taskDetail = taskDetail;
	}
	public String getSrNo() {
		return srNo;
	}
	public void setSrNo(String srNo) {
		this.srNo = srNo;
	}
	public String getCrRequester() {
		return crRequester;
	}
	public void setCrRequester(String crRequester) {
		this.crRequester = crRequester;
	}
	public Date getCrRequestDate() {
		return crRequestDate;
	}
	public void setCrRequestDate(Date crRequestDate) {
		this.crRequestDate = crRequestDate;
	}
	public String getCrRequestDateStr() {
		return crRequestDateStr;
	}
	public void setCrRequestDateStr(String crRequestDateStr) {
		this.crRequestDateStr = crRequestDateStr;
	}
	public Date getCrUpdateDate() {
		return crUpdateDate;
	}
	public void setCrUpdateDate(Date crUpdateDate) {
		this.crUpdateDate = crUpdateDate;
	}
	public String getCrUpdateDateStr() {
		return crUpdateDateStr;
	}
	public void setCrUpdateDateStr(String crUpdateDateStr) {
		this.crUpdateDateStr = crUpdateDateStr;
	}
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public String getJiraId() {
		return jiraId;
	}
	public void setJiraId(String jiraId) {
		this.jiraId = jiraId;
	}
	public String getStartDateStr() {
		return startDateStr;
	}
	public void setStartDateStr(String startDateStr) {
		this.startDateStr = startDateStr;
	}
	public String getDueDateStr() {
		return dueDateStr;
	}
	public void setDueDateStr(String dueDateStr) {
		this.dueDateStr = dueDateStr;
	}
	public String getProgramId() {
		return programId;
	}
	public void setProgramId(String programId) {
		this.programId = programId;
	}
	public String getProgramName() {
		return programName;
	}
	public void setProgramName(String programName) {
		this.programName = programName;
	}
	public String getTeam() {
		return team;
	}
	public void setTeam(String team) {
		this.team = team;
	}
	public String getModule() {
		return module;
	}
	public void setModule(String module) {
		this.module = module;
	}
	public String getSubModule() {
		return subModule;
	}
	public void setSubModule(String subModule) {
		this.subModule = subModule;
	}
	public String getDeveloper() {
		return developer;
	}
	public void setDeveloper(String developer) {
		this.developer = developer;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public String getProgramType() {
		return programType;
	}
	public void setProgramType(String programType) {
		this.programType = programType;
	}
	public String getProgramSmallType() {
		return programSmallType;
	}
	public void setProgramSmallType(String programSmallType) {
		this.programSmallType = programSmallType;
	}
	public String getWbsNumber() {
		return wbsNumber;
	}
	public void setWbsNumber(String wbsNumber) {
		this.wbsNumber = wbsNumber;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getDueDate() {
		return dueDate;
	}
	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}
	public int getDoneRatio() {
		return doneRatio;
	}
	public void setDoneRatio(int doneRatio) {
		this.doneRatio = doneRatio;
	}
	public String getDelayYn() {
		return delayYn;
	}
	public void setDelayYn(String delayYn) {
		this.delayYn = delayYn;
	}
	public int getIssueId() {
		return issueId;
	}
	public void setIssueId(int issueId) {
		this.issueId = issueId;
	}
	public String getInterfaceId() {
		return interfaceId;
	}
	public void setInterfaceId(String interfaceId) {
		this.interfaceId = interfaceId;
	}
	public String getUseFlag() {
		return useFlag;
	}
	public void setUseFlag(String useFlag) {
		this.useFlag = useFlag;
	}
	public String getTask() {
		return task;
	}
	public void setTask(String task) {
		this.task = task;
	}
	public String getDevelopDetail() {
		return developDetail;
	}
	public void setDevelopDetail(String developDetail) {
		this.developDetail = developDetail;
	}
	public String getExtension() {
		return extension;
	}
	public void setExtension(String extension) {
		this.extension = extension;
	}
	public String getPhase() {
		return phase;
	}
	public void setPhase(String phase) {
		this.phase = phase;
	}
	public String getIteration() {
		return iteration;
	}
	public void setIteration(String iteration) {
		this.iteration = iteration;
	}
	public String getSrFlag() {
		return srFlag;
	}
	public void setSrFlag(String srFlag) {
		this.srFlag = srFlag;
	}
}
