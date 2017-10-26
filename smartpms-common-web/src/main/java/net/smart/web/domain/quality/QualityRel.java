package net.smart.web.domain.quality;

import java.math.BigDecimal;

import net.smart.common.domain.Common;

public class QualityRel extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = 981391939137394996L;
	
	private String statDate;
	private String team;
	private String module;
	private String function;
	private String programType;
	private String developer;
	private String programId;
	private int issueId;
	private String sourceFilePath;
	private String targetFilePath;
	private String sourceOperation;
	private String targetOperation;
	private String targetTeam;
	private String targetModule;
	private int targetIssueId;
	private String sourceRunYn;
	private String targetRunYn;
	private BigDecimal sourceFileStatement;
	private BigDecimal targetFileStatement;
	private BigDecimal sourceOperationStatement;
	private BigDecimal targetOperationStatement;
	private int sourceOperationTotal;
	private int targetOperationTotal;
	private int sourceOperationRun;
	private int targetOperationRun;
	private String relationName;
	private boolean serviceRel;
	private String relationType;
	private String sourceOperationRunYn;
	private String targetOperationRunYn;
	
	
	public String getSourceOperationRunYn() {
		return sourceOperationRunYn;
	}

	public void setSourceOperationRunYn(String sourceOperationRunYn) {
		this.sourceOperationRunYn = sourceOperationRunYn;
	}

	public String getTargetOperationRunYn() {
		return targetOperationRunYn;
	}

	public void setTargetOperationRunYn(String targetOperationRunYn) {
		this.targetOperationRunYn = targetOperationRunYn;
	}

	public String getRelationType() {
		return relationType;
	}

	public void setRelationType(String relationType) {
		this.relationType = relationType;
	}

	public boolean isServiceRel() {
		return serviceRel;
	}

	public void setServiceRel(boolean serviceRel) {
		this.serviceRel = serviceRel;
	}

	public String getRelationName() {
		return relationName;
	}

	public void setRelationName(String relationName) {
		this.relationName = relationName;
	}

	public BigDecimal getSourceFileStatement() {
		return sourceFileStatement;
	}

	public void setSourceFileStatement(BigDecimal sourceFileStatement) {
		this.sourceFileStatement = sourceFileStatement;
	}

	public BigDecimal getTargetFileStatement() {
		return targetFileStatement;
	}

	public void setTargetFileStatement(BigDecimal targetFileStatement) {
		this.targetFileStatement = targetFileStatement;
	}

	public String getSourceRunYn() {
		return sourceRunYn;
	}

	public void setSourceRunYn(String sourceRunYn) {
		this.sourceRunYn = sourceRunYn;
	}

	public String getTargetRunYn() {
		return targetRunYn;
	}

	public void setTargetRunYn(String targetRunYn) {
		this.targetRunYn = targetRunYn;
	}

	public BigDecimal getSourceOperationStatement() {
		return sourceOperationStatement;
	}

	public void setSourceOperationStatement(BigDecimal sourceOperationStatement) {
		this.sourceOperationStatement = sourceOperationStatement;
	}

	public BigDecimal getTargetOperationStatement() {
		return targetOperationStatement;
	}

	public void setTargetOperationStatement(BigDecimal targetOperationStatement) {
		this.targetOperationStatement = targetOperationStatement;
	}

	public int getSourceOperationTotal() {
		return sourceOperationTotal;
	}

	public void setSourceOperationTotal(int sourceOperationTotal) {
		this.sourceOperationTotal = sourceOperationTotal;
	}

	public int getTargetOperationTotal() {
		return targetOperationTotal;
	}

	public void setTargetOperationTotal(int targetOperationTotal) {
		this.targetOperationTotal = targetOperationTotal;
	}

	public int getSourceOperationRun() {
		return sourceOperationRun;
	}

	public void setSourceOperationRun(int sourceOperationRun) {
		this.sourceOperationRun = sourceOperationRun;
	}

	public int getTargetOperationRun() {
		return targetOperationRun;
	}

	public void setTargetOperationRun(int targetOperationRun) {
		this.targetOperationRun = targetOperationRun;
	}

	public String getTargetModule() {
		return targetModule;
	}

	public void setTargetModule(String targetModule) {
		this.targetModule = targetModule;
	}

	public String getTargetTeam() {
		return targetTeam;
	}

	public void setTargetTeam(String targetTeam) {
		this.targetTeam = targetTeam;
	}

	public int getTargetIssueId() {
		return targetIssueId;
	}

	public void setTargetIssueId(int targetIssueId) {
		this.targetIssueId = targetIssueId;
	}

	public String getKey() {
		StringBuffer sb = new StringBuffer();
		sb.append(statDate).append("/").append(team).append("/")
		  .append(module).append("/")
		  .append(sourceFilePath).append("/").append(targetFilePath).append("/")
		  .append(sourceOperation).append("/").append(targetOperation);
		return sb.toString();
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
	public String getProgramType() {
		return programType;
	}
	public void setProgramType(String programType) {
		this.programType = programType;
	}
	
	public String getDeveloper() {
		return developer;
	}
	public void setDeveloper(String developer) {
		this.developer = developer;
	}
	public String getProgramId() {
		return programId;
	}
	public void setProgramId(String programId) {
		this.programId = programId;
	}
	public int getIssueId() {
		return issueId;
	}
	public void setIssueId(int issueId) {
		this.issueId = issueId;
	}
	public String getSourceFilePath() {
		return sourceFilePath;
	}
	public void setSourceFilePath(String sourceFilePath) {
		this.sourceFilePath = sourceFilePath;
	}
	public String getTargetFilePath() {
		return targetFilePath;
	}
	public void setTargetFilePath(String targetFilePath) {
		this.targetFilePath = targetFilePath;
	}
	public String getSourceOperation() {
		return sourceOperation;
	}
	public void setSourceOperation(String sourceOperation) {
		this.sourceOperation = sourceOperation;
	}
	public String getTargetOperation() {
		return targetOperation;
	}
	public void setTargetOperation(String targetOperation) {
		this.targetOperation = targetOperation;
	}
}
