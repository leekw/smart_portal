package net.smart.web.domain.jira;

import net.smart.common.domain.Common;

public class JiraInfo extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -197754976000977683L;
	
	private String jiraUrl;
	private String jiraId;
	private String jiraPwd;
	private String jiraProject;
	private String jiraDashboard;
	public String getJiraUrl() {
		return jiraUrl;
	}
	public void setJiraUrl(String jiraUrl) {
		this.jiraUrl = jiraUrl;
	}
	public String getJiraId() {
		return jiraId;
	}
	public void setJiraId(String jiraId) {
		this.jiraId = jiraId;
	}
	public String getJiraPwd() {
		return jiraPwd;
	}
	public void setJiraPwd(String jiraPwd) {
		this.jiraPwd = jiraPwd;
	}
	public String getJiraProject() {
		return jiraProject;
	}
	public void setJiraProject(String jiraProject) {
		this.jiraProject = jiraProject;
	}
	public String getJiraDashboard() {
		return jiraDashboard;
	}
	public void setJiraDashboard(String jiraDashboard) {
		this.jiraDashboard = jiraDashboard;
	}
}
