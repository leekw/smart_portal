package net.smart.web.domain.quality;

import java.math.BigDecimal;

import net.smart.common.domain.Common;

public class QualityTest extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7502796036645802387L;
	
	private String programType;
	private int programCount;
	private String team;
	private String module;
	private String relationText;
	private int relCount;
	private String relationId;
	private boolean leaf;
	private String relationWay;
	private int relRunCount;
	private int programRunCount;
	private String relationType;
	private String relationName;
	private BigDecimal programRatio;
	private BigDecimal programRunRaio;
	private String statDate;
	private String originalStatDate;
	private BigDecimal sourceRunRatio;
	private BigDecimal targetRunRatio;
	private String programTypeGroup;
	private int relCount1;
	private int relCount2;
	
	
	public int getRelCount1() {
		return relCount1;
	}
	public void setRelCount1(int relCount1) {
		this.relCount1 = relCount1;
	}
	public int getRelCount2() {
		return relCount2;
	}
	public void setRelCount2(int relCount2) {
		this.relCount2 = relCount2;
	}
	public String getOriginalStatDate() {
		return originalStatDate;
	}
	public void setOriginalStatDate(String originalStatDate) {
		this.originalStatDate = originalStatDate;
	}
	public String getProgramTypeGroup() {
		return programTypeGroup;
	}
	public void setProgramTypeGroup(String programTypeGroup) {
		this.programTypeGroup = programTypeGroup;
	}
	public String getStatDate() {
		return statDate;
	}
	public void setStatDate(String statDate) {
		this.statDate = statDate;
	}
	public BigDecimal getSourceRunRatio() {
		return sourceRunRatio;
	}
	public void setSourceRunRatio(BigDecimal sourceRunRatio) {
		this.sourceRunRatio = sourceRunRatio;
	}
	public BigDecimal getTargetRunRatio() {
		return targetRunRatio;
	}
	public void setTargetRunRatio(BigDecimal targetRunRatio) {
		this.targetRunRatio = targetRunRatio;
	}
	public BigDecimal getProgramRatio() {
		return programRatio;
	}
	public void setProgramRatio(BigDecimal programRatio) {
		this.programRatio = programRatio;
	}
	public BigDecimal getProgramRunRaio() {
		return programRunRaio;
	}
	public void setProgramRunRaio(BigDecimal programRunRaio) {
		this.programRunRaio = programRunRaio;
	}
	public String getRelationName() {
		return relationName;
	}
	public void setRelationName(String relationName) {
		this.relationName = relationName;
	}
	public String getRelationType() {
		return relationType;
	}
	public void setRelationType(String relationType) {
		this.relationType = relationType;
	}
	public int getProgramRunCount() {
		return programRunCount;
	}
	public void setProgramRunCount(int programRunCount) {
		this.programRunCount = programRunCount;
	}
	public String getRelationWay() {
		return relationWay;
	}
	public void setRelationWay(String relationWay) {
		this.relationWay = relationWay;
	}
	public int getRelRunCount() {
		return relRunCount;
	}
	public void setRelRunCount(int relRunCount) {
		this.relRunCount = relRunCount;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public String getRelationId() {
		return relationId;
	}
	public void setRelationId(String relationId) {
		this.relationId = relationId;
	}
	public String getRelationText() {
		return relationText;
	}
	public void setRelationText(String relationText) {
		this.relationText = relationText;
	}
	public int getRelCount() {
		return relCount;
	}
	public void setRelCount(int relCount) {
		this.relCount = relCount;
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
	public String getProgramType() {
		return programType;
	}
	public void setProgramType(String programType) {
		this.programType = programType;
	}
	public int getProgramCount() {
		return programCount;
	}
	public void setProgramCount(int programCount) {
		this.programCount = programCount;
	}
	
	

}
