package net.smart.web.domain.analysis;

import java.math.BigDecimal;
import java.util.Date;

public class AnalysisSummary {
	private String area;
	private String serviceName;
	private String repoName;
	private Date analysisDate;
	private int orderNo;
	private String team;
	private String manager;
	private BigDecimal criticalCount;
	private BigDecimal highCount;
	private BigDecimal majorCount;
	private BigDecimal lowCount;
	private String measureStatus;
	private String veeringCheck1;
	private String veeringCheck2;
	private String finalStatus;
	private String analysisDateByString;
	
	
	public String getAnalysisDateByString() {
		return analysisDateByString;
	}
	public void setAnalysisDateByString(String analysisDateByString) {
		this.analysisDateByString = analysisDateByString;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
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
	public Date getAnalysisDate() {
		return analysisDate;
	}
	public void setAnalysisDate(Date analysisDate) {
		this.analysisDate = analysisDate;
	}
	public int getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(int orderNo) {
		this.orderNo = orderNo;
	}
	public String getTeam() {
		return team;
	}
	public void setTeam(String team) {
		this.team = team;
	}
	public String getManager() {
		return manager;
	}
	public void setManager(String manager) {
		this.manager = manager;
	}
	public BigDecimal getCriticalCount() {
		return criticalCount;
	}
	public void setCriticalCount(BigDecimal criticalCount) {
		this.criticalCount = criticalCount;
	}
	public BigDecimal getHighCount() {
		return highCount;
	}
	public void setHighCount(BigDecimal highCount) {
		this.highCount = highCount;
	}
	public BigDecimal getMajorCount() {
		return majorCount;
	}
	public void setMajorCount(BigDecimal majorCount) {
		this.majorCount = majorCount;
	}
	public BigDecimal getLowCount() {
		return lowCount;
	}
	public void setLowCount(BigDecimal lowCount) {
		this.lowCount = lowCount;
	}
	public String getMeasureStatus() {
		return measureStatus;
	}
	public void setMeasureStatus(String measureStatus) {
		this.measureStatus = measureStatus;
	}
	public String getVeeringCheck1() {
		return veeringCheck1;
	}
	public void setVeeringCheck1(String veeringCheck1) {
		this.veeringCheck1 = veeringCheck1;
	}
	public String getVeeringCheck2() {
		return veeringCheck2;
	}
	public void setVeeringCheck2(String veeringCheck2) {
		this.veeringCheck2 = veeringCheck2;
	}
	public String getFinalStatus() {
		return finalStatus;
	}
	public void setFinalStatus(String finalStatus) {
		this.finalStatus = finalStatus;
	}
	
}
