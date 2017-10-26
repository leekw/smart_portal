package net.smart.web.jira.filter;

import org.springframework.stereotype.Service;

@Service("jiraStartedDataFilter")
public class JiraStartedDataFilter implements JiraDataFilter {

	@Override
	public boolean isVaild(String filterType, String step, String status, String jiraStatus, String resolution, boolean isReady) {
		boolean result = false;
		if (filterType != null 
				&& !"2".equals(step)
				&& "ing_started_cnt".equals(filterType)
				&& "0".equals(status)
				&& "작업시작".equals(jiraStatus)
				&& !isReady) {
			result = true;
		}
		return result;
	}

}
