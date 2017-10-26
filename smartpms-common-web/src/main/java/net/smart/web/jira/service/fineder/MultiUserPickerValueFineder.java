package net.smart.web.jira.service.fineder;

import net.smart.common.exception.IntegrationException;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.stereotype.Service;

import com.atlassian.jira.rest.client.api.domain.Issue;

@Service("multiUserPickerValueFineder")
public class MultiUserPickerValueFineder implements JiraValueFineder {

	@Override
	public boolean isSupport(String type) {
		return type.equals("multiuserpicker");
	}

	@Override
	public String getValue(Issue issue, String fieldKey) {
		StringBuffer sb = new StringBuffer();
		try {
			JSONArray arrays = (JSONArray) issue.getField(fieldKey).getValue();
			if (arrays != null) {
				for (int i=0; i < arrays.length(); i++) {
					JSONObject obj = (JSONObject) arrays.get(i);
					String temp = obj.getString("displayName");
					sb.append(temp).append(",");
				}
			}
		} catch (Exception ex) {
			throw new IntegrationException("ERROR.0001", ex);
		}
		return sb.toString().equals("") ? "" : sb.toString().substring(0, sb.toString().length()-1);
	}

}
