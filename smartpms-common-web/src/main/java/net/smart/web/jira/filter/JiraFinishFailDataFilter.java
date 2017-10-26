package net.smart.web.jira.filter;

import org.springframework.stereotype.Service;

@Service("jiraFinishFailDataFilter")
public class JiraFinishFailDataFilter implements JiraDataFilter {

	@Override
	public boolean isVaild(String filterType, String step, String status, String jiraStatus, String resolution, boolean isReady) {
		boolean result = false;
		if (filterType != null 
				&& "2".equals(step)
				&& "fail_cnt".equals(filterType)
				&& "Closed".equals(jiraStatus)
				&& "Failed".equals(resolution)
				&& !isReady) {
			result = true;
		}
		return result;
	}

}
