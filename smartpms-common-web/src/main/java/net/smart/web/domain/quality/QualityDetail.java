package net.smart.web.domain.quality;

import java.math.BigDecimal;

import net.smart.common.domain.Common;

public class QualityDetail extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -7832635671491205060L;
	private String statDate;
	private String team;
	private String module;
	private String function;
	private String developer;
	private String programType;
	private String programSmallType;
	private String programId;
	private int loc;
	private int totalStatement;
	private int runStatement;
	private String unusedYn;
	private String utCaseType;
	private int issueId;
	private String startDate;
	private String dueDate;
	private int doneRatio;
	private String runYn;
	private BigDecimal statement;
	private String utJiraId;
	private String searchType;
	private int totalFunction;
	private int runFunction;
	private String sitCaseType;
	private String sitRunYn;
	private BigDecimal sitStatement;
	private String sitJiraId;
	private String phase;
	private String filename;
	private String svnFilePath;
	private String svnRegYn;
	private String programName;
	private String checkTargetYn;
	private String checkMessage;
	private int fileSize;
	private BigDecimal fileSize2;
	private String lastCommitDate;
	private String devStatus;
	private String searchFilter;
	private String searchOption;
	private String sitIncludeYn;
	private String testProgramId;
	private String interfaceId;
	private String interfacePattern;
	private String sourceSystem;
	private String targetSystem;
	private String interfaceType;
	private String ownTeam;
	
	
	public String getInterfacePattern() {
		return interfacePattern;
	}
	public void setInterfacePattern(String interfacePattern) {
		this.interfacePattern = interfacePattern;
	}
	public String getSourceSystem() {
		return sourceSystem;
	}
	public void setSourceSystem(String sourceSystem) {
		this.sourceSystem = sourceSystem;
	}
	public String getTargetSystem() {
		return targetSystem;
	}
	public void setTargetSystem(String targetSystem) {
		this.targetSystem = targetSystem;
	}
	public String getInterfaceType() {
		return interfaceType;
	}
	public void setInterfaceType(String interfaceType) {
		this.interfaceType = interfaceType;
	}
	public String getOwnTeam() {
		return ownTeam;
	}
	public void setOwnTeam(String ownTeam) {
		this.ownTeam = ownTeam;
	}
	public String getInterfaceId() {
		return interfaceId;
	}
	public void setInterfaceId(String interfaceId) {
		this.interfaceId = interfaceId;
	}
	public String getTestProgramId() {
		return testProgramId;
	}
	public void setTestProgramId(String testProgramId) {
		this.testProgramId = testProgramId;
	}
	public String getSitIncludeYn() {
		return sitIncludeYn;
	}
	public void setSitIncludeYn(String sitIncludeYn) {
		this.sitIncludeYn = sitIncludeYn;
	}
	public String getSearchOption() {
		return searchOption;
	}
	public void setSearchOption(String searchOption) {
		this.searchOption = searchOption;
	}
	public String getSearchFilter() {
		return searchFilter;
	}
	public void setSearchFilter(String searchFilter) {
		this.searchFilter = searchFilter;
	}
	public String getDevStatus() {
		return devStatus;
	}
	public void setDevStatus(String devStatus) {
		this.devStatus = devStatus;
	}
	public String getLastCommitDate() {
		return lastCommitDate;
	}
	public void setLastCommitDate(String lastCommitDate) {
		this.lastCommitDate = lastCommitDate;
	}
	public BigDecimal getFileSize2() {
		return fileSize2;
	}
	public void setFileSize2(BigDecimal fileSize2) {
		this.fileSize2 = fileSize2;
	}
	public int getFileSize() {
		return fileSize;
	}
	public void setFileSize(int fileSize) {
		this.fileSize = fileSize;
	}
	public String getCheckTargetYn() {
		return checkTargetYn;
	}
	public void setCheckTargetYn(String checkTargetYn) {
		this.checkTargetYn = checkTargetYn;
	}
	public String getCheckMessage() {
		return checkMessage;
	}
	public void setCheckMessage(String checkMessage) {
		this.checkMessage = checkMessage;
	}
	public String getProgramName() {
		return programName;
	}
	public void setProgramName(String programName) {
		this.programName = programName;
	}
	public String getSvnRegYn() {
		return svnRegYn;
	}
	public void setSvnRegYn(String svnRegYn) {
		this.svnRegYn = svnRegYn;
	}
	public String getSvnFilePath() {
		return svnFilePath;
	}
	public void setSvnFilePath(String svnFilePath) {
		this.svnFilePath = svnFilePath;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getPhase() {
		return phase;
	}
	public void setPhase(String phase) {
		this.phase = phase;
	}
	public String getSitCaseType() {
		return sitCaseType;
	}
	public void setSitCaseType(String sitCaseType) {
		this.sitCaseType = sitCaseType;
	}
	public String getSitRunYn() {
		return sitRunYn;
	}
	public void setSitRunYn(String sitRunYn) {
		this.sitRunYn = sitRunYn;
	}
	public BigDecimal getSitStatement() {
		return sitStatement;
	}
	public void setSitStatement(BigDecimal sitStatement) {
		this.sitStatement = sitStatement;
	}
	public String getSitJiraId() {
		return sitJiraId;
	}
	public void setSitJiraId(String sitJiraId) {
		this.sitJiraId = sitJiraId;
	}
	public int getTotalFunction() {
		return totalFunction;
	}
	public void setTotalFunction(int totalFunction) {
		this.totalFunction = totalFunction;
	}
	public int getRunFunction() {
		return runFunction;
	}
	public void setRunFunction(int runFunction) {
		this.runFunction = runFunction;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getUtJiraId() {
		return utJiraId;
	}
	public void setUtJiraId(String utJiraId) {
		this.utJiraId = utJiraId;
	}
	public BigDecimal getStatement() {
		return statement;
	}
	public void setStatement(BigDecimal statement) {
		this.statement = statement;
	}
	public String getRunYn() {
		return runYn;
	}
	public void setRunYn(String runYn) {
		this.runYn = runYn;
	}
	public String getProgramSmallType() {
		return programSmallType;
	}
	public void setProgramSmallType(String programSmallType) {
		this.programSmallType = programSmallType;
	}
	public String getStatDate() {
		return statDate;
	}
	public void setStatDate(String statDate) {
		this.statDate = statDate;
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
	public String getFunction() {
		return function;
	}
	public void setFunction(String function) {
		this.function = function;
	}
	public String getDeveloper() {
		return developer;
	}
	public void setDeveloper(String developer) {
		this.developer = developer;
	}
	public String getProgramType() {
		return programType;
	}
	public void setProgramType(String programType) {
		this.programType = programType;
	}
	public String getProgramId() {
		return programId;
	}
	public void setProgramId(String programId) {
		this.programId = programId;
	}
	public int getLoc() {
		return loc;
	}
	public void setLoc(int loc) {
		this.loc = loc;
	}
	public int getTotalStatement() {
		return totalStatement;
	}
	public void setTotalStatement(int totalStatement) {
		this.totalStatement = totalStatement;
	}
	public int getRunStatement() {
		return runStatement;
	}
	public void setRunStatement(int runStatement) {
		this.runStatement = runStatement;
	}
	public String getUnusedYn() {
		return unusedYn;
	}
	public void setUnusedYn(String unusedYn) {
		this.unusedYn = unusedYn;
	}
	public String getUtCaseType() {
		return utCaseType;
	}
	public void setUtCaseType(String utCaseType) {
		this.utCaseType = utCaseType;
	}
	public int getIssueId() {
		return issueId;
	}
	public void setIssueId(int issueId) {
		this.issueId = issueId;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getDueDate() {
		return dueDate;
	}
	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}
	public int getDoneRatio() {
		return doneRatio;
	}
	public void setDoneRatio(int doneRatio) {
		this.doneRatio = doneRatio;
	}
	
	
}
