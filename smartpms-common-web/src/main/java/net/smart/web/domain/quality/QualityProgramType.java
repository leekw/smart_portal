package net.smart.web.domain.quality;

import java.math.BigDecimal;

import net.smart.common.domain.Common;

public class QualityProgramType extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -703829594026174050L;
	private String team;
	private String module;
	private String function;
	private String verifyType;
	private BigDecimal uiCount;
	private BigDecimal esbCount;
	private BigDecimal sjCount;
	private BigDecimal bocCount;
	private BigDecimal boCount;
	private BigDecimal doCount;
	private BigDecimal dtoCount;
	private BigDecimal etcCount;
	private BigDecimal totCount;
	
	
	public BigDecimal getTotCount() {
		return totCount;
	}
	public void setTotCount(BigDecimal totCount) {
		this.totCount = totCount;
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
	public String getVerifyType() {
		return verifyType;
	}
	public void setVerifyType(String verifyType) {
		this.verifyType = verifyType;
	}
	public BigDecimal getUiCount() {
		return uiCount;
	}
	public void setUiCount(BigDecimal uiCount) {
		this.uiCount = uiCount;
	}
	public BigDecimal getEsbCount() {
		return esbCount;
	}
	public void setEsbCount(BigDecimal esbCount) {
		this.esbCount = esbCount;
	}
	public BigDecimal getSjCount() {
		return sjCount;
	}
	public void setSjCount(BigDecimal sjCount) {
		this.sjCount = sjCount;
	}
	public BigDecimal getBocCount() {
		return bocCount;
	}
	public void setBocCount(BigDecimal bocCount) {
		this.bocCount = bocCount;
	}
	public BigDecimal getBoCount() {
		return boCount;
	}
	public void setBoCount(BigDecimal boCount) {
		this.boCount = boCount;
	}
	public BigDecimal getDoCount() {
		return doCount;
	}
	public void setDoCount(BigDecimal doCount) {
		this.doCount = doCount;
	}
	public BigDecimal getDtoCount() {
		return dtoCount;
	}
	public void setDtoCount(BigDecimal dtoCount) {
		this.dtoCount = dtoCount;
	}
	public BigDecimal getEtcCount() {
		return etcCount;
	}
	public void setEtcCount(BigDecimal etcCount) {
		this.etcCount = etcCount;
	}

	
}
