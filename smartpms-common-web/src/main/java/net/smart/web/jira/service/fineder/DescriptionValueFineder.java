package net.smart.web.jira.service.fineder;

import org.springframework.stereotype.Service;

import com.atlassian.jira.rest.client.api.domain.Issue;

@Service("descriptionValueFineder")
public class DescriptionValueFineder implements JiraValueFineder {

	@Override
	public boolean isSupport(String type) {
		return type.equals("description");
	}

	@Override
	public String getValue(Issue issue, String fieldKey) {
		return issue.getDescription();
	}

}
