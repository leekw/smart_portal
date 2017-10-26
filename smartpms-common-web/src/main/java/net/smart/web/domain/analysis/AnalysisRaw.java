package net.smart.web.domain.analysis;

import java.util.Date;

public class AnalysisRaw {
	private long analysisResultId;
	private String serviceName;
	private String repoName;
	private Date analysisDate;
	private String analysisDateByString;
	private String vulnerability;
	private String cwe;
	private String securityRule;
	private String severity;
	private String fullLocation;
	private String file;
	private String source;
	private String resultMessage;
	private String area;
	private String tool;
	private int orderNo;
	private String team;
	private String manager;
	private String filePath;
	
	
	public long getAnalysisResultId() {
		return analysisResultId;
	}
	public void setAnalysisResultId(long analysisResultId) {
		this.analysisResultId = analysisResultId;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
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
	public String getAnalysisDateByString() {
		return analysisDateByString;
	}
	public void setAnalysisDateByString(String analysisDateByString) {
		this.analysisDateByString = analysisDateByString;
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
	public String getVulnerability() {
		return vulnerability;
	}
	public void setVulnerability(String vulnerability) {
		this.vulnerability = vulnerability;
	}
	public String getCwe() {
		return cwe;
	}
	public void setCwe(String cwe) {
		this.cwe = cwe;
	}
	public String getSecurityRule() {
		return securityRule;
	}
	public void setSecurityRule(String securityRule) {
		this.securityRule = securityRule;
	}
	public String getSeverity() {
		return severity;
	}
	public void setSeverity(String severity) {
		this.severity = severity;
	}
	public String getFullLocation() {
		return fullLocation;
	}
	public void setFullLocation(String fullLocation) {
		this.fullLocation = fullLocation;
	}
	public String getFile() {
		return file;
	}
	public void setFile(String file) {
		this.file = file;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getResultMessage() {
		return resultMessage;
	}
	public void setResultMessage(String resultMessage) {
		this.resultMessage = resultMessage;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getTool() {
		return tool;
	}
	public void setTool(String tool) {
		this.tool = tool;
	}
}
