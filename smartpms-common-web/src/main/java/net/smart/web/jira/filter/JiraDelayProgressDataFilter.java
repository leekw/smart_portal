package net.smart.web.jira.filter;

import org.springframework.stereotype.Service;

@Service("jiraDelayProgressDataFilter")
public class JiraDelayProgressDataFilter implements JiraDataFilter {

	@Override
	public boolean isVaild(String filterType, String step, String status, String jiraStatus, String resolution, boolean isReady) {
		boolean result = false;
		if (filterType != null 
				&& "delay_progress_cnt".equals(filterType)
				&& "1".equals(status)
				&& "작업시작".equals(jiraStatus)
				&& !isReady) {
			result = true;
		}
		return result;
	}

}
