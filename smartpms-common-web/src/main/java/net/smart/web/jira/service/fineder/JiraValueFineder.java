package net.smart.web.jira.service.fineder;

import com.atlassian.jira.rest.client.api.domain.Issue;

public interface JiraValueFineder {
	
	public boolean isSupport(String type);
	
	public String getValue(Issue issue, String fieldKey);

}
