package net.smart.web.jira.filter;

import org.springframework.stereotype.Service;

@Service("jiraProgressDataFilter")
public class JiraProgressDataFilter implements JiraDataFilter {

	@Override
	public boolean isVaild(String filterType, String step, String status, String jiraStatus, String resolution, boolean isReady) {
		boolean result = false;
		if (filterType != null 
				&& "1".equals(step)
				&& "progress_count".equals(filterType)
				&& !isReady) {
			result = true;
		}
		return result;
	}

}
