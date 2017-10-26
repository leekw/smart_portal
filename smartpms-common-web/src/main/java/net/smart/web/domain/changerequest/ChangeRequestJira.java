package net.smart.web.domain.changerequest;

import java.util.List;

import net.smart.common.domain.Common;

public class ChangeRequestJira  extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 4639815090156068196L;
	private String jiraId;
	private String jiraStatus;
	private String jiraCreateDate;
	private String jiraDue;
	private String jiraSummary;
	private String jiraAssignee;
	private String jiraReporter;
	private String jiraDescription;
	private String jiraResolution;
	private String team;
	private String module;
	private String jiraComponent;
	private List<String> componets;
	private List<ChangeRequestTarget> targets;
	private String targetFilePath;
	
	
	public String getTargetFilePath() {
		return targetFilePath;
	}
	public void setTargetFilePath(String targetFilePath) {
		this.targetFilePath = targetFilePath;
	}
	public List<String> getComponets() {
		return componets;
	}
	public void setComponets(List<String> componets) {
		this.componets = componets;
	}
	public String getJiraComponent() {
		return jiraComponent;
	}
	public void setJiraComponent(String jiraComponent) {
		this.jiraComponent = jiraComponent;
	}
	public List<ChangeRequestTarget> getTargets() {
		return targets;
	}
	public void setTargets(List<ChangeRequestTarget> targets) {
		this.targets = targets;
	}
	public String getJiraResolution() {
		return jiraResolution;
	}
	public void setJiraResolution(String jiraResolution) {
		this.jiraResolution = jiraResolution;
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
	public String getJiraId() {
		return jiraId;
	}
	public void setJiraId(String jiraId) {
		this.jiraId = jiraId;
	}
	public String getJiraStatus() {
		return jiraStatus;
	}
	public void setJiraStatus(String jiraStatus) {
		this.jiraStatus = jiraStatus;
	}
	public String getJiraCreateDate() {
		return jiraCreateDate;
	}
	public void setJiraCreateDate(String jiraCreateDate) {
		this.jiraCreateDate = jiraCreateDate;
	}
	public String getJiraDue() {
		return jiraDue;
	}
	public void setJiraDue(String jiraDue) {
		this.jiraDue = jiraDue;
	}
	public String getJiraSummary() {
		return jiraSummary;
	}
	public void setJiraSummary(String jiraSummary) {
		this.jiraSummary = jiraSummary;
	}
	public String getJiraAssignee() {
		return jiraAssignee;
	}
	public void setJiraAssignee(String jiraAssignee) {
		this.jiraAssignee = jiraAssignee;
	}
	public String getJiraReporter() {
		return jiraReporter;
	}
	public void setJiraReporter(String jiraReporter) {
		this.jiraReporter = jiraReporter;
	}
	public String getJiraDescription() {
		return jiraDescription;
	}
	public void setJiraDescription(String jiraDescription) {
		this.jiraDescription = jiraDescription;
	}
	
}
