package net.smart.web.domain.quality;

import java.math.BigDecimal;
import java.util.List;

import net.smart.common.domain.Common;

public class QualitySummary extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 4629299500415981778L;
	private String statDate;
	private String team;
	private String module;
	private String function;
	private int pgTotal;
	private int pgComplete;
	private int pgDelay;
	private int initCount;
	private BigDecimal avgCompleteCount;
	private int unUsedSource;
	private int notRun;
	private int utCoverage;
	private String totalStatus;
	private String developer;
	private String programType;
	private int loc;
	private int underStatement;
	private BigDecimal avgCoverage;
	private String minStartDateStr;
	private String mode;
	private int utTarget;
	private int utComplete;
	private int utTesting;
	private int utNotest;
	private int rankCount;
	private int runTarget;
	private List<String> topList;
	private List<String> developerList;
	private BigDecimal verifyScore;
	private BigDecimal totalScore;
	private BigDecimal adjtRatio;
	private BigDecimal avgTotalFunction;
	private BigDecimal avgRunFunction;
	private int totalFunction;
	private int runFunction;
	private String searchMode;
	private int pgComTarget;
	private BigDecimal sumCoverage;
	private int sitTarget;
	private int sitNotest;
	private int sitComplete;
	private int sitTesting;
	private BigDecimal sitSumCoverage;
	private int underSitCoverage;
	private BigDecimal sitAvgCoverage;
	private List<BigDecimal> verifyHistorys;
	private List<BigDecimal> sourceHistorys;
	private int checkTarget;
	private int fileSize;
	private BigDecimal fileSize2;
	private int changeFile;
	private int checkRunTarget;
	private int svnReg;
	private int svnCheckReg;
	private int svnRunCheckReg;
	private int utCheckReg;
	private int sitCheckReg;
	
	
	public int getSvnCheckReg() {
		return svnCheckReg;
	}
	public void setSvnCheckReg(int svnCheckReg) {
		this.svnCheckReg = svnCheckReg;
	}
	public int getSvnRunCheckReg() {
		return svnRunCheckReg;
	}
	public void setSvnRunCheckReg(int svnRunCheckReg) {
		this.svnRunCheckReg = svnRunCheckReg;
	}
	public int getUtCheckReg() {
		return utCheckReg;
	}
	public void setUtCheckReg(int utCheckReg) {
		this.utCheckReg = utCheckReg;
	}
	public int getSitCheckReg() {
		return sitCheckReg;
	}
	public void setSitCheckReg(int sitCheckReg) {
		this.sitCheckReg = sitCheckReg;
	}
	public int getCheckRunTarget() {
		return checkRunTarget;
	}
	public void setCheckRunTarget(int checkRunTarget) {
		this.checkRunTarget = checkRunTarget;
	}
	public int getSvnReg() {
		return svnReg;
	}
	public void setSvnReg(int svnReg) {
		this.svnReg = svnReg;
	}
	
	public int getChangeFile() {
		return changeFile;
	}
	public void setChangeFile(int changeFile) {
		this.changeFile = changeFile;
	}
	public List<BigDecimal> getSourceHistorys() {
		return sourceHistorys;
	}
	public void setSourceHistorys(List<BigDecimal> sourceHistorys) {
		this.sourceHistorys = sourceHistorys;
	}
	public int getFileSize() {
		return fileSize;
	}
	public void setFileSize(int fileSize) {
		this.fileSize = fileSize;
	}
	public BigDecimal getFileSize2() {
		return fileSize2;
	}
	public void setFileSize2(BigDecimal fileSize2) {
		this.fileSize2 = fileSize2;
	}
	public int getCheckTarget() {
		return checkTarget;
	}
	public void setCheckTarget(int checkTarget) {
		this.checkTarget = checkTarget;
	}
	public List<BigDecimal> getVerifyHistorys() {
		return verifyHistorys;
	}
	public void setVerifyHistorys(List<BigDecimal> verifyHistorys) {
		this.verifyHistorys = verifyHistorys;
	}
	public int getSitComplete() {
		return sitComplete;
	}
	public void setSitComplete(int sitComplete) {
		this.sitComplete = sitComplete;
	}
	public int getSitTesting() {
		return sitTesting;
	}
	public void setSitTesting(int sitTesting) {
		this.sitTesting = sitTesting;
	}
	public BigDecimal getSitAvgCoverage() {
		return sitAvgCoverage;
	}
	public void setSitAvgCoverage(BigDecimal sitAvgCoverage) {
		this.sitAvgCoverage = sitAvgCoverage;
	}
	public int getSitTarget() {
		return sitTarget;
	}
	public void setSitTarget(int sitTarget) {
		this.sitTarget = sitTarget;
	}
	public int getSitNotest() {
		return sitNotest;
	}
	public void setSitNotest(int sitNotest) {
		this.sitNotest = sitNotest;
	}
	public BigDecimal getSitSumCoverage() {
		return sitSumCoverage;
	}
	public void setSitSumCoverage(BigDecimal sitSumCoverage) {
		this.sitSumCoverage = sitSumCoverage;
	}
	public int getUnderSitCoverage() {
		return underSitCoverage;
	}
	public void setUnderSitCoverage(int underSitCoverage) {
		this.underSitCoverage = underSitCoverage;
	}
	public int getPgComTarget() {
		return pgComTarget;
	}
	public void setPgComTarget(int pgComTarget) {
		this.pgComTarget = pgComTarget;
	}
	public BigDecimal getSumCoverage() {
		return sumCoverage;
	}
	public void setSumCoverage(BigDecimal sumCoverage) {
		this.sumCoverage = sumCoverage;
	}
	public BigDecimal getTotalScore() {
		return totalScore;
	}
	public void setTotalScore(BigDecimal totalScore) {
		this.totalScore = totalScore;
	}
	public BigDecimal getAdjtRatio() {
		return adjtRatio;
	}
	public void setAdjtRatio(BigDecimal adjtRatio) {
		this.adjtRatio = adjtRatio;
	}
	public String getSearchMode() {
		return searchMode;
	}
	public void setSearchMode(String searchMode) {
		this.searchMode = searchMode;
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
	public BigDecimal getAvgTotalFunction() {
		return avgTotalFunction;
	}
	public void setAvgTotalFunction(BigDecimal avgTotalFunction) {
		this.avgTotalFunction = avgTotalFunction;
	}
	public BigDecimal getAvgRunFunction() {
		return avgRunFunction;
	}
	public void setAvgRunFunction(BigDecimal avgRunFunction) {
		this.avgRunFunction = avgRunFunction;
	}
	public BigDecimal getVerifyScore() {
		return verifyScore;
	}
	public void setVerifyScore(BigDecimal verifyScore) {
		this.verifyScore = verifyScore;
	}
	public int getRunTarget() {
		return runTarget;
	}
	public void setRunTarget(int runTarget) {
		this.runTarget = runTarget;
	}
	public List<String> getDeveloperList() {
		return developerList;
	}
	public void setDeveloperList(List<String> developerList) {
		this.developerList = developerList;
	}
	public List<String> getTopList() {
		return topList;
	}
	public void setTopList(List<String> topList) {
		this.topList = topList;
	}
	public int getRankCount() {
		return rankCount;
	}
	public void setRankCount(int rankCount) {
		this.rankCount = rankCount;
	}
	public int getUtTarget() {
		return utTarget;
	}
	public void setUtTarget(int utTarget) {
		this.utTarget = utTarget;
	}
	public int getUtComplete() {
		return utComplete;
	}
	public void setUtComplete(int utComplete) {
		this.utComplete = utComplete;
	}
	public int getUtTesting() {
		return utTesting;
	}
	public void setUtTesting(int utTesting) {
		this.utTesting = utTesting;
	}
	public int getUtNotest() {
		return utNotest;
	}
	public void setUtNotest(int utNotest) {
		this.utNotest = utNotest;
	}
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
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
	public int getLoc() {
		return loc;
	}
	public void setLoc(int loc) {
		this.loc = loc;
	}
	public int getUnderStatement() {
		return underStatement;
	}
	public void setUnderStatement(int underStatement) {
		this.underStatement = underStatement;
	}
	public BigDecimal getAvgCoverage() {
		return avgCoverage;
	}
	public void setAvgCoverage(BigDecimal avgCoverage) {
		this.avgCoverage = avgCoverage;
	}
	public String getMinStartDateStr() {
		return minStartDateStr;
	}
	public void setMinStartDateStr(String minStartDateStr) {
		this.minStartDateStr = minStartDateStr;
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
	public int getPgTotal() {
		return pgTotal;
	}
	public void setPgTotal(int pgTotal) {
		this.pgTotal = pgTotal;
	}
	public int getPgComplete() {
		return pgComplete;
	}
	public void setPgComplete(int pgComplete) {
		this.pgComplete = pgComplete;
	}
	public int getPgDelay() {
		return pgDelay;
	}
	public void setPgDelay(int pgDelay) {
		this.pgDelay = pgDelay;
	}
	public int getInitCount() {
		return initCount;
	}
	public void setInitCount(int initCount) {
		this.initCount = initCount;
	}
	public BigDecimal getAvgCompleteCount() {
		return avgCompleteCount;
	}
	public void setAvgCompleteCount(BigDecimal avgCompleteCount) {
		this.avgCompleteCount = avgCompleteCount;
	}
	public int getUnUsedSource() {
		return unUsedSource;
	}
	public void setUnUsedSource(int unUsedSource) {
		this.unUsedSource = unUsedSource;
	}
	public int getNotRun() {
		return notRun;
	}
	public void setNotRun(int notRun) {
		this.notRun = notRun;
	}
	public int getUtCoverage() {
		return utCoverage;
	}
	public void setUtCoverage(int utCoverage) {
		this.utCoverage = utCoverage;
	}
	public String getTotalStatus() {
		return totalStatus;
	}
	public void setTotalStatus(String totalStatus) {
		this.totalStatus = totalStatus;
	}
	
	

}
