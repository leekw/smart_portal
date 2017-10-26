package net.smart.web.domain.quality;

import java.math.BigDecimal;

import net.smart.common.domain.Common;

public class QualityCoverage extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -4186545327416528967L;
	private String regDate;
	private String treeName;
	private int runFunc;
	private int totalFunc;
	private BigDecimal statement;
	private int runStatement;
	private int totalStatement;
	private String filename;
	private BigDecimal maxStatement;
	private String path;
	private String team;
	private String phase;
	private String deployEnv;
	private String funcName;
	
	
	public String getFuncName() {
		return funcName;
	}
	public void setFuncName(String funcName) {
		this.funcName = funcName;
	}
	public String getDeployEnv() {
		return deployEnv;
	}
	public void setDeployEnv(String deployEnv) {
		this.deployEnv = deployEnv;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public String getTreeName() {
		return treeName;
	}
	public void setTreeName(String treeName) {
		this.treeName = treeName;
	}
	public int getRunFunc() {
		return runFunc;
	}
	public void setRunFunc(int runFunc) {
		this.runFunc = runFunc;
	}
	public int getTotalFunc() {
		return totalFunc;
	}
	public void setTotalFunc(int totalFunc) {
		this.totalFunc = totalFunc;
	}
	public BigDecimal getStatement() {
		return statement;
	}
	public void setStatement(BigDecimal statement) {
		this.statement = statement;
	}
	public int getRunStatement() {
		return runStatement;
	}
	public void setRunStatement(int runStatement) {
		this.runStatement = runStatement;
	}
	public int getTotalStatement() {
		return totalStatement;
	}
	public void setTotalStatement(int totalStatement) {
		this.totalStatement = totalStatement;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public BigDecimal getMaxStatement() {
		return maxStatement;
	}
	public void setMaxStatement(BigDecimal maxStatement) {
		this.maxStatement = maxStatement;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getTeam() {
		return team;
	}
	public void setTeam(String team) {
		this.team = team;
	}
	public String getPhase() {
		return phase;
	}
	public void setPhase(String phase) {
		this.phase = phase;
	}
	
	
}
