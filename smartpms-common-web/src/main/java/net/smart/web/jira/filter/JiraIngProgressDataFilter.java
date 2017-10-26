package net.smart.web.jira.filter;

import org.springframework.stereotype.Service;

@Service("jiraIngProgressDataFilter")
public class JiraIngProgressDataFilter implements JiraDataFilter {

	@Override
	public boolean isVaild(String filterType, String step, String status, String jiraStatus, String resolution, boolean isReady) {
		boolean result = false;
		if (filterType != null
				&& !"2".equals(step)
				&& "ing_progress_cnt".equals(filterType)
				&& "0".equals(status)
				&& "작업요청".equals(jiraStatus)
				&& !isReady) {
			result = true;
		}
		return result;
	}

}
