package net.smart.web.domain.quality;

import java.math.BigDecimal;
import java.util.List;

import net.smart.common.domain.Common;

public class QualityHistorySummary extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7977522889561331092L;
	
	private String team;
	private String module;
	private String function;
	private BigDecimal pgTotal1;
	private BigDecimal pgTotal2;
	private BigDecimal pgComplete1;
	private BigDecimal pgDelay1;
	private BigDecimal pgDelay2;
	private BigDecimal delayRatio1;
	private BigDecimal delayRatio2;
	private BigDecimal comRatio1;
	private BigDecimal comRatio2;
	private BigDecimal unusedSource1;
	private BigDecimal unusedSource2;
	private BigDecimal underStatement1;
	private BigDecimal underStatement2;
	private BigDecimal utTarget1;
	private BigDecimal utTarget2;
	private BigDecimal sitTarget1;
	private BigDecimal sitTarget2; 
	private BigDecimal sitComplete2;
	private BigDecimal sitTesting2;
	private BigDecimal utNoTest1;
	private BigDecimal utNoTest2;
	private BigDecimal utNoTestRatio1;
	private BigDecimal utNoTestRatio2;
	private BigDecimal runTarget1;
	private BigDecimal runTarget2;
	private BigDecimal notRun1;
	private BigDecimal notRun2;
	private BigDecimal runRatio1;
	private BigDecimal runRatio2;
	private BigDecimal sitNoTestRatio1;
	private BigDecimal sitNoTestRatio2;
	private BigDecimal sitCoverageRatio1;
	private BigDecimal sitCoverageRatio2;
	
	private BigDecimal pgComTarget1;
	private BigDecimal pgComTarget2;
	private BigDecimal coverageRatio1;
	private BigDecimal coverageRatio2;
	private String searchType;
	private List<String> searchModuleList;
	private List<String> searchFunctionList;
	private String statDate;
	private String originStatDate;
	private String mode;
	private String originalTeam;
	private String originalModule;
	private String originalFunction;
	private BigDecimal checkTarget2;
	private BigDecimal fileSize2;
	private BigDecimal fileSize1;
	private BigDecimal changeFile2;
	private BigDecimal changeFile1;
	private BigDecimal svnReg2;
	private BigDecimal sitRunRatio;
	private BigDecimal sitRunTarget;
	private BigDecimal sitRun;
	private BigDecimal sitInclude;
	private BigDecimal sitExclude;
	private BigDecimal sitNoTest2;
	private BigDecimal sitNoTest1;
	private BigDecimal svnNotReg;
	private BigDecimal noRegSvn;
	private BigDecimal utComplete2;
	private BigDecimal utTesting2;
	
	private String sortTeam;
	
	
	public String getSortTeam() {
		return sortTeam;
	}
	public void setSortTeam(String sortTeam) {
		this.sortTeam = sortTeam;
	}
	public BigDecimal getUtTesting2() {
		return utTesting2;
	}
	public void setUtTesting2(BigDecimal utTesting2) {
		this.utTesting2 = utTesting2;
	}
	public BigDecimal getUtComplete2() {
		return utComplete2;
	}
	public void setUtComplete2(BigDecimal utComplete2) {
		this.utComplete2 = utComplete2;
	}
	public BigDecimal getNoRegSvn() {
		return noRegSvn;
	}
	public void setNoRegSvn(BigDecimal noRegSvn) {
		this.noRegSvn = noRegSvn;
	}
	public BigDecimal getSvnNotReg() {
		return svnNotReg;
	}
	public void setSvnNotReg(BigDecimal svnNotReg) {
		this.svnNotReg = svnNotReg;
	}
	public BigDecimal getSitComplete2() {
		return sitComplete2;
	}
	public void setSitComplete2(BigDecimal sitComplete2) {
		this.sitComplete2 = sitComplete2;
	}
	public BigDecimal getSitTesting2() {
		return sitTesting2;
	}
	public void setSitTesting2(BigDecimal sitTesting2) {
		this.sitTesting2 = sitTesting2;
	}
	public String getOriginStatDate() {
		return originStatDate;
	}
	public void setOriginStatDate(String originStatDate) {
		this.originStatDate = originStatDate;
	}
	public BigDecimal getSitNoTest1() {
		return sitNoTest1;
	}
	public void setSitNoTest1(BigDecimal sitNoTest1) {
		this.sitNoTest1 = sitNoTest1;
	}
	public BigDecimal getSitNoTest2() {
		return sitNoTest2;
	}
	public void setSitNoTest2(BigDecimal sitNoTest2) {
		this.sitNoTest2 = sitNoTest2;
	}
	public BigDecimal getSitRunTarget() {
		return sitRunTarget;
	}
	public void setSitRunTarget(BigDecimal sitRunTarget) {
		this.sitRunTarget = sitRunTarget;
	}
	public BigDecimal getSitRun() {
		return sitRun;
	}
	public void setSitRun(BigDecimal sitRun) {
		this.sitRun = sitRun;
	}
	public BigDecimal getSitRunRatio() {
		return sitRunRatio;
	}
	public void setSitRunRatio(BigDecimal sitRunRatio) {
		this.sitRunRatio = sitRunRatio;
	}
	public BigDecimal getSitInclude() {
		return sitInclude;
	}
	public void setSitInclude(BigDecimal sitInclude) {
		this.sitInclude = sitInclude;
	}
	public BigDecimal getSitExclude() {
		return sitExclude;
	}
	public void setSitExclude(BigDecimal sitExclude) {
		this.sitExclude = sitExclude;
	}
	public BigDecimal getSvnReg2() {
		return svnReg2;
	}
	public void setSvnReg2(BigDecimal svnReg2) {
		this.svnReg2 = svnReg2;
	}
	public BigDecimal getChangeFile2() {
		return changeFile2;
	}
	public void setChangeFile2(BigDecimal changeFile2) {
		this.changeFile2 = changeFile2;
	}
	public BigDecimal getChangeFile1() {
		return changeFile1;
	}
	public void setChangeFile1(BigDecimal changeFile1) {
		this.changeFile1 = changeFile1;
	}
	public BigDecimal getFileSize1() {
		return fileSize1;
	}
	public void setFileSize1(BigDecimal fileSize1) {
		this.fileSize1 = fileSize1;
	}
	public BigDecimal getFileSize2() {
		return fileSize2;
	}
	public void setFileSize2(BigDecimal fileSize2) {
		this.fileSize2 = fileSize2;
	}
	public BigDecimal getSitTarget1() {
		return sitTarget1;
	}
	public void setSitTarget1(BigDecimal sitTarget1) {
		this.sitTarget1 = sitTarget1;
	}
	public BigDecimal getSitTarget2() {
		return sitTarget2;
	}
	public void setSitTarget2(BigDecimal sitTarget2) {
		this.sitTarget2 = sitTarget2;
	}
	public BigDecimal getCheckTarget2() {
		return checkTarget2;
	}
	public void setCheckTarget2(BigDecimal checkTarget2) {
		this.checkTarget2 = checkTarget2;
	}
	public BigDecimal getPgComplete1() {
		return pgComplete1;
	}
	public void setPgComplete1(BigDecimal pgComplete1) {
		this.pgComplete1 = pgComplete1;
	}
	public String getOriginalTeam() {
		return originalTeam;
	}
	public void setOriginalTeam(String originalTeam) {
		this.originalTeam = originalTeam;
	}
	public String getOriginalModule() {
		return originalModule;
	}
	public void setOriginalModule(String originalModule) {
		this.originalModule = originalModule;
	}
	public String getOriginalFunction() {
		return originalFunction;
	}
	public void setOriginalFunction(String originalFunction) {
		this.originalFunction = originalFunction;
	}
	public List<String> getSearchFunctionList() {
		return searchFunctionList;
	}
	public void setSearchFunctionList(List<String> searchFunctionList) {
		this.searchFunctionList = searchFunctionList;
	}
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public String getFunction() {
		return function;
	}
	public void setFunction(String function) {
		this.function = function;
	}
	public BigDecimal getSitNoTestRatio1() {
		return sitNoTestRatio1;
	}
	public void setSitNoTestRatio1(BigDecimal sitNoTestRatio1) {
		this.sitNoTestRatio1 = sitNoTestRatio1;
	}
	public BigDecimal getSitNoTestRatio2() {
		return sitNoTestRatio2;
	}
	public void setSitNoTestRatio2(BigDecimal sitNoTestRatio2) {
		this.sitNoTestRatio2 = sitNoTestRatio2;
	}
	public BigDecimal getSitCoverageRatio1() {
		return sitCoverageRatio1;
	}
	public void setSitCoverageRatio1(BigDecimal sitCoverageRatio1) {
		this.sitCoverageRatio1 = sitCoverageRatio1;
	}
	public BigDecimal getSitCoverageRatio2() {
		return sitCoverageRatio2;
	}
	public void setSitCoverageRatio2(BigDecimal sitCoverageRatio2) {
		this.sitCoverageRatio2 = sitCoverageRatio2;
	}
	public String getStatDate() {
		return statDate;
	}
	public void setStatDate(String statDate) {
		this.statDate = statDate;
	}
	public List<String> getSearchModuleList() {
		return searchModuleList;
	}
	public void setSearchModuleList(List<String> searchModuleList) {
		this.searchModuleList = searchModuleList;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public BigDecimal getPgComTarget1() {
		return pgComTarget1;
	}
	public void setPgComTarget1(BigDecimal pgComTarget1) {
		this.pgComTarget1 = pgComTarget1;
	}
	public BigDecimal getPgComTarget2() {
		return pgComTarget2;
	}
	public void setPgComTarget2(BigDecimal pgComTarget2) {
		this.pgComTarget2 = pgComTarget2;
	}
	public BigDecimal getCoverageRatio1() {
		return coverageRatio1;
	}
	public void setCoverageRatio1(BigDecimal coverageRatio1) {
		this.coverageRatio1 = coverageRatio1;
	}
	public BigDecimal getCoverageRatio2() {
		return coverageRatio2;
	}
	public void setCoverageRatio2(BigDecimal coverageRatio2) {
		this.coverageRatio2 = coverageRatio2;
	}
	public BigDecimal getUnderStatement1() {
		return underStatement1;
	}
	public void setUnderStatement1(BigDecimal underStatement1) {
		this.underStatement1 = underStatement1;
	}
	public BigDecimal getUnderStatement2() {
		return underStatement2;
	}
	public void setUnderStatement2(BigDecimal underStatement2) {
		this.underStatement2 = underStatement2;
	}
	public BigDecimal getComRatio1() {
		return comRatio1;
	}
	public void setComRatio1(BigDecimal comRatio1) {
		this.comRatio1 = comRatio1;
	}
	public BigDecimal getComRatio2() {
		return comRatio2;
	}
	public void setComRatio2(BigDecimal comRatio2) {
		this.comRatio2 = comRatio2;
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
	public BigDecimal getPgTotal1() {
		return pgTotal1;
	}
	public void setPgTotal1(BigDecimal pgTotal1) {
		this.pgTotal1 = pgTotal1;
	}
	public BigDecimal getPgTotal2() {
		return pgTotal2;
	}
	public void setPgTotal2(BigDecimal pgTotal2) {
		this.pgTotal2 = pgTotal2;
	}
	public BigDecimal getPgDelay1() {
		return pgDelay1;
	}
	public void setPgDelay1(BigDecimal pgDelay1) {
		this.pgDelay1 = pgDelay1;
	}
	public BigDecimal getPgDelay2() {
		return pgDelay2;
	}
	public void setPgDelay2(BigDecimal pgDelay2) {
		this.pgDelay2 = pgDelay2;
	}
	public BigDecimal getDelayRatio1() {
		return delayRatio1;
	}
	public void setDelayRatio1(BigDecimal delayRatio1) {
		this.delayRatio1 = delayRatio1;
	}
	public BigDecimal getDelayRatio2() {
		return delayRatio2;
	}
	public void setDelayRatio2(BigDecimal delayRatio2) {
		this.delayRatio2 = delayRatio2;
	}
	public BigDecimal getUnusedSource1() {
		return unusedSource1;
	}
	public void setUnusedSource1(BigDecimal unusedSource1) {
		this.unusedSource1 = unusedSource1;
	}
	public BigDecimal getUnusedSource2() {
		return unusedSource2;
	}
	public void setUnusedSource2(BigDecimal unusedSource2) {
		this.unusedSource2 = unusedSource2;
	}
	public BigDecimal getUtTarget1() {
		return utTarget1;
	}
	public void setUtTarget1(BigDecimal utTarget1) {
		this.utTarget1 = utTarget1;
	}
	public BigDecimal getUtTarget2() {
		return utTarget2;
	}
	public void setUtTarget2(BigDecimal utTarget2) {
		this.utTarget2 = utTarget2;
	}
	public BigDecimal getUtNoTest1() {
		return utNoTest1;
	}
	public void setUtNoTest1(BigDecimal utNoTest1) {
		this.utNoTest1 = utNoTest1;
	}
	public BigDecimal getUtNoTest2() {
		return utNoTest2;
	}
	public void setUtNoTest2(BigDecimal utNoTest2) {
		this.utNoTest2 = utNoTest2;
	}
	public BigDecimal getUtNoTestRatio1() {
		return utNoTestRatio1;
	}
	public void setUtNoTestRatio1(BigDecimal utNoTestRatio1) {
		this.utNoTestRatio1 = utNoTestRatio1;
	}
	public BigDecimal getUtNoTestRatio2() {
		return utNoTestRatio2;
	}
	public void setUtNoTestRatio2(BigDecimal utNoTestRatio2) {
		this.utNoTestRatio2 = utNoTestRatio2;
	}
	public BigDecimal getRunTarget1() {
		return runTarget1;
	}
	public void setRunTarget1(BigDecimal runTarget1) {
		this.runTarget1 = runTarget1;
	}
	public BigDecimal getRunTarget2() {
		return runTarget2;
	}
	public void setRunTarget2(BigDecimal runTarget2) {
		this.runTarget2 = runTarget2;
	}
	public BigDecimal getNotRun1() {
		return notRun1;
	}
	public void setNotRun1(BigDecimal notRun1) {
		this.notRun1 = notRun1;
	}
	public BigDecimal getNotRun2() {
		return notRun2;
	}
	public void setNotRun2(BigDecimal notRun2) {
		this.notRun2 = notRun2;
	}
	public BigDecimal getRunRatio1() {
		return runRatio1;
	}
	public void setRunRatio1(BigDecimal runRatio1) {
		this.runRatio1 = runRatio1;
	}
	public BigDecimal getRunRatio2() {
		return runRatio2;
	}
	public void setRunRatio2(BigDecimal runRatio2) {
		this.runRatio2 = runRatio2;
	}
}
