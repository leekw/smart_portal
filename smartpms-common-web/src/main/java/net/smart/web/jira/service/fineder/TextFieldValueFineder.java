package net.smart.web.jira.service.fineder;

import org.springframework.stereotype.Service;

import com.atlassian.jira.rest.client.api.domain.Issue;

@Service("txtFieldValueFineder")
public class TextFieldValueFineder implements JiraValueFineder {

	@Override
	public boolean isSupport(String type) {
		return type.equals("textfield");
	}

	@Override
	public String getValue(Issue issue, String fieldKey) {
		String result = null;
		result= (String)issue.getField(fieldKey).getValue();
		return result == null ? "" : result;
	}

}
