package net.smart.web.jira.service.fineder;

import net.smart.common.exception.IntegrationException;

import org.codehaus.jettison.json.JSONObject;
import org.springframework.stereotype.Service;

import com.atlassian.jira.rest.client.api.domain.Issue;

@Service("userPickerValueFineder")
public class UserPickerValueFineder implements JiraValueFineder {

	@Override
	public boolean isSupport(String type) {
		return type.equals("userpicker");
	}

	@Override
	public String getValue(Issue issue, String fieldKey) {
		JSONObject obj = (JSONObject) issue.getField(fieldKey).getValue();
		String result = null;
		try {
			if (obj != null) {
				result = obj.getString("displayName");
			}
		} catch (Exception ex) {
			throw new IntegrationException("ERROR.00001", ex);
		}
		return result == null ? "" : result;
	}

}
