package net.smart.web.jira.filter;

import org.springframework.stereotype.Service;

@Service("jiraDataDummyFilter")
public class JiraDataDummyFilter implements JiraDataFilter {

	@Override
	public boolean isVaild(String filterType, String step, String status, String jiraStatus, String resolution, boolean isReady) {
		return filterType == null || "total_cnt".equals(filterType) ? true : false;
	}
	
}
