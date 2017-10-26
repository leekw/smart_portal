package net.smart.web.jira.filter;

import org.springframework.stereotype.Service;

@Service("jiraFinishDataFilter")
public class JiraFinishDataFilter implements JiraDataFilter {

	@Override
	public boolean isVaild(String filterType, String step, String status, String jiraStatus, String resolution, boolean isReady) {
		boolean result = false;
		if (filterType != null 
				&& "2".equals(step)
				&& "finish_cnt".equals(filterType)
				&& "Closed".equals(jiraStatus)
				&& !isReady) {
			result = true;
		}
		return result;
	}

}
