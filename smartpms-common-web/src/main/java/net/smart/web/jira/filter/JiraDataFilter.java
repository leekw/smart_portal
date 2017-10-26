package net.smart.web.jira.filter;

public interface JiraDataFilter {
	
	public boolean isVaild(String filterType, String step, String status, String jiraStatus, String resolution, boolean isReady);

}
