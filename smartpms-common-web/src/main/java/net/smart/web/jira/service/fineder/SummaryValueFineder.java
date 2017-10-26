package net.smart.web.jira.service.fineder;

import org.springframework.stereotype.Service;

import com.atlassian.jira.rest.client.api.domain.Issue;

@Service("summaryValueFineder")
public class SummaryValueFineder implements JiraValueFineder{

	@Override
	public boolean isSupport(String type) {
		return type.equals("summary");
	}

	@Override
	public String getValue(Issue issue, String fieldKey) {
		return issue.getSummary();
	}

}
