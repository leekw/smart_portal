package net.smart.web.jira.filter;

import org.springframework.stereotype.Service;

@Service("jiraReadyDataFilter")
public class JiraReadyDataFilter implements JiraDataFilter {

	@Override
	public boolean isVaild(String filterType, String step, String status, String jiraStatus, String resolution, boolean isReady) {
		boolean result = false;
		if (filterType != null
				&& "0".equals(step)
				&& "ready_cnt".equals(filterType)
				&& "0".equals(status)
				&& "Open".equals(jiraStatus)
				&& isReady) {
			result = true;
		}
		return result;
	}

}
