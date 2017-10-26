package net.smart.web.domain.quality;

import java.math.BigDecimal;

import net.smart.common.domain.Common;

public class InterfaceDetail extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = 369937390805924537L;
	
	private String sourceTeam;
	private String sourceModule;
	private String targetTeam;
	private String targetModule;
	private String sourceFilePath;
	private String targetFilePath;
	private String sourceOperation;
	private String targetOperation;
	private BigDecimal sourceFileStatement;
	private BigDecimal targetFileStatement;
	private String sourceRunYn;
	private String targetRunYn;
	private String sourceOperationStatement;
	private String targetOperationStatement;
	private String sourceOperationRunYn;
	private String targetOperationRunYn;
	private String linkWay;
	private String relationName;
	private String relationType;
	private String programType;
	
	public String getProgramType() {
		return programType;
	}
	public void setProgramType(String programType) {
		this.programType = programType;
	}
	public String getRelationType() {
		return relationType;
	}
	public void setRelationType(String relationType) {
		this.relationType = relationType;
	}
	public String getRelationName() {
		return relationName;
	}
	public void setRelationName(String relationName) {
		this.relationName = relationName;
	}
	public String getLinkWay() {
		return linkWay;
	}
	public void setLinkWay(String linkWay) {
		this.linkWay = linkWay;
	}
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
	public String getSourceTeam() {
		return sourceTeam;
	}
	public void setSourceTeam(String sourceTeam) {
		this.sourceTeam = sourceTeam;
	}
	public String getSourceModule() {
		return sourceModule;
	}
	public void setSourceModule(String sourceModule) {
		this.sourceModule = sourceModule;
	}
	public String getTargetTeam() {
		return targetTeam;
	}
	public void setTargetTeam(String targetTeam) {
		this.targetTeam = targetTeam;
	}
	public String getTargetModule() {
		return targetModule;
	}
	public void setTargetModule(String targetModule) {
		this.targetModule = targetModule;
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
	public String getSourceOperationStatement() {
		return sourceOperationStatement;
	}
	public void setSourceOperationStatement(String sourceOperationStatement) {
		this.sourceOperationStatement = sourceOperationStatement;
	}
	public String getTargetOperationStatement() {
		return targetOperationStatement;
	}
	public void setTargetOperationStatement(String targetOperationStatement) {
		this.targetOperationStatement = targetOperationStatement;
	}
}
