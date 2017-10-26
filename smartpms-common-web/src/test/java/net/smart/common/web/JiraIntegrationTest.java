package net.smart.common.web;

import java.util.List;
import java.util.Vector;

import junit.framework.TestCase;

import org.junit.Test;

import com.atlassian.crowd.embedded.api.PasswordCredential;
import com.atlassian.crowd.integration.rest.service.factory.RestCrowdClientFactory;
import com.atlassian.crowd.model.authentication.UserAuthenticationContext;
import com.atlassian.crowd.model.authentication.ValidationFactor;
import com.atlassian.crowd.model.group.Group;
import com.atlassian.crowd.model.user.User;
import com.atlassian.crowd.service.client.CrowdClient;

public class JiraIntegrationTest extends TestCase  {
	
	@Test
	public void testCrowAuthentication() throws Exception {
		RestCrowdClientFactory factory = new RestCrowdClientFactory();
		CrowdClient client = factory.newInstance("http://10.217.230.251:8088/crowd", "kt_bit_jira_system", "admin!23");
		
		UserAuthenticationContext userAuthCtx = new UserAuthenticationContext();
		userAuthCtx.setName("91098304");
		userAuthCtx.setCredential(new PasswordCredential("kt8564!a"));
		userAuthCtx.setApplication("kt_bit_jira_system");
		userAuthCtx.setValidationFactors(new ValidationFactor[0]);
		final String token = client.authenticateSSOUser(userAuthCtx);
		client.validateSSOAuthentication(token, new Vector<ValidationFactor>());
		
		User user = client.findUserFromSSOToken(token);
		
		List<Group> groups = client.getGroupsForUser(user.getName(), 0, 1000);
		
		client.getCookieConfiguration().getName();
		
	}

}
