package net.smart.web.jira.service.fineder;

import java.util.Iterator;

import net.smart.common.exception.IntegrationException;

import org.codehaus.jettison.json.JSONArray;
import org.springframework.stereotype.Service;

import com.atlassian.jira.rest.client.api.domain.Issue;

@Service("labelsValueFineder")
public class LabelsValueFineder implements JiraValueFineder {

	@Override
	public boolean isSupport(String type) {
		return type.equals("labels");
	}

	@Override
	public String getValue(Issue issue, String fieldKey) {
		StringBuffer sb = new StringBuffer();
		if (fieldKey.equals("labels")) {
			Iterator<String> temps =  issue.getLabels().iterator();
			while (temps.hasNext()) { 
				String label = temps.next();
				sb.append(label).append(",");
			}
		} else {
			try {
				JSONArray arrays = (JSONArray) issue.getField(fieldKey).getValue();
				if (arrays != null) {
		    		for (int i=0; i < arrays.length(); i++) {
		    			String temp = (String) arrays.get(i);
		    			sb.append(temp).append(",");
		    		}
				}
			} catch (Exception ex) {
				throw new IntegrationException("ERROR.00001", ex);
			}
			
		}
		return sb.toString().equals("") ? "" : sb.toString().substring(0, sb.toString().length()-1);
	}

}
