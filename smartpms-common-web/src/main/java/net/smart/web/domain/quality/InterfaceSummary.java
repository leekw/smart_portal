package net.smart.web.domain.quality;

import java.math.BigDecimal;

import net.smart.common.domain.Common;

public class InterfaceSummary extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3025303048220820584L;
	
	private String sourceTeam;
	private String sourceModule;
	private String targetTeam;
	private String targetModule;
	private BigDecimal sourceClassTotal;
	private BigDecimal sourceMethodTotal;
	private BigDecimal targetClassTotal;
	private BigDecimal targetMethodTotal;
	private BigDecimal sourceClassRun;
	private BigDecimal sourceMethodRun;
	private BigDecimal targetClassRun;
	private BigDecimal targetMethodRun;
	private String statDate;
	private String linkType;
	private String linkWay;
	private BigDecimal sourceRunRatio;
	private BigDecimal targetRunRatio;
	private BigDecimal sourceRunYn;
	private BigDecimal targetRunYn;
	private String relationType;
	private String ownTeam;
	
	
	public String getOwnTeam() {
		return ownTeam;
	}
	public void setOwnTeam(String ownTeam) {
		this.ownTeam = ownTeam;
	}
	public String getRelationType() {
		return relationType;
	}
	public void setRelationType(String relationType) {
		this.relationType = relationType;
	}
	public BigDecimal getSourceRunYn() {
		return sourceRunYn;
	}
	public void setSourceRunYn(BigDecimal sourceRunYn) {
		this.sourceRunYn = sourceRunYn;
	}
	public BigDecimal getTargetRunYn() {
		return targetRunYn;
	}
	public void setTargetRunYn(BigDecimal targetRunYn) {
		this.targetRunYn = targetRunYn;
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
	public String getLinkWay() {
		return linkWay;
	}
	public void setLinkWay(String linkWay) {
		this.linkWay = linkWay;
	}
	public String getLinkType() {
		return linkType;
	}
	public void setLinkType(String linkType) {
		this.linkType = linkType;
	}
	public String getStatDate() {
		return statDate;
	}
	public void setStatDate(String statDate) {
		this.statDate = statDate;
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
	public BigDecimal getSourceClassTotal() {
		return sourceClassTotal;
	}
	public void setSourceClassTotal(BigDecimal sourceClassTotal) {
		this.sourceClassTotal = sourceClassTotal;
	}
	public BigDecimal getSourceMethodTotal() {
		return sourceMethodTotal;
	}
	public void setSourceMethodTotal(BigDecimal sourceMethodTotal) {
		this.sourceMethodTotal = sourceMethodTotal;
	}
	public BigDecimal getTargetClassTotal() {
		return targetClassTotal;
	}
	public void setTargetClassTotal(BigDecimal targetClassTotal) {
		this.targetClassTotal = targetClassTotal;
	}
	public BigDecimal getTargetMethodTotal() {
		return targetMethodTotal;
	}
	public void setTargetMethodTotal(BigDecimal targetMethodTotal) {
		this.targetMethodTotal = targetMethodTotal;
	}
	public BigDecimal getSourceClassRun() {
		return sourceClassRun;
	}
	public void setSourceClassRun(BigDecimal sourceClassRun) {
		this.sourceClassRun = sourceClassRun;
	}
	public BigDecimal getSourceMethodRun() {
		return sourceMethodRun;
	}
	public void setSourceMethodRun(BigDecimal sourceMethodRun) {
		this.sourceMethodRun = sourceMethodRun;
	}
	public BigDecimal getTargetClassRun() {
		return targetClassRun;
	}
	public void setTargetClassRun(BigDecimal targetClassRun) {
		this.targetClassRun = targetClassRun;
	}
	public BigDecimal getTargetMethodRun() {
		return targetMethodRun;
	}
	public void setTargetMethodRun(BigDecimal targetMethodRun) {
		this.targetMethodRun = targetMethodRun;
	}
}
