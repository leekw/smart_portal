package net.smart.web.jira.filter;

import org.springframework.stereotype.Service;

@Service("jiraDelayDataFilter")
public class JiraDelayDataFilter implements JiraDataFilter{

	@Override
	public boolean isVaild(String filterType, String step, String status, String jiraStatus, String resolution, boolean isReady) {
		boolean result = false;
		if (filterType != null 
				&& "delay_cnt".equals(filterType)
				&& "1".equals(status)
				&& !isReady) {
			result = true;
		}
		return result;
	}

}
