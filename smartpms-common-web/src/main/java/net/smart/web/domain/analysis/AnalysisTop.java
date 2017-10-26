package net.smart.web.domain.analysis;

import java.math.BigDecimal;

public class AnalysisTop {
	private String serviceName;
	private String repoName;
	private String targetName;
	private String teamName;
	private String securityRule;
	private String area;
	private long detectionCount;
	private long measureCount;
	private BigDecimal measureRatio;
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public String getRepoName() {
		return repoName;
	}
	public void setRepoName(String repoName) {
		this.repoName = repoName;
	}
	public String getTargetName() {
		return targetName;
	}
	public void setTargetName(String targetName) {
		this.targetName = targetName;
	}
	public String getTeamName() {
		return teamName;
	}
	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}
	public String getSecurityRule() {
		return securityRule;
	}
	public void setSecurityRule(String securityRule) {
		this.securityRule = securityRule;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public long getDetectionCount() {
		return detectionCount;
	}
	public void setDetectionCount(long detectionCount) {
		this.detectionCount = detectionCount;
	}
	public long getMeasureCount() {
		return measureCount;
	}
	public void setMeasureCount(long measureCount) {
		this.measureCount = measureCount;
	}
	public BigDecimal getMeasureRatio() {
		return measureRatio;
	}
	public void setMeasureRatio(BigDecimal measureRatio) {
		this.measureRatio = measureRatio;
	}
	
	
}
