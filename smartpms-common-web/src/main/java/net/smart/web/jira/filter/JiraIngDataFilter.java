package net.smart.web.jira.filter;

import org.springframework.stereotype.Service;

@Service("jiraIngDataFilter")
public class JiraIngDataFilter implements JiraDataFilter{

	@Override
	public boolean isVaild(String filterType, String step, String status, String jiraStatus, String resolution, boolean isReady) {
		boolean result = false;
		if (filterType != null 
				&& "1".equals(step)
				&& "ing_cnt".equals(filterType)
				&& "0".equals(status)
				&& !isReady) {
			result = true;
		}
		return result;
	}

}
