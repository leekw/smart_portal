/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.rest.client;

import java.net.URI;
import java.net.URISyntaxException;

import com.atlassian.jira.rest.client.api.JiraRestClient;
import com.atlassian.jira.rest.client.auth.AnonymousAuthenticationHandler;
import com.atlassian.jira.rest.client.auth.BasicHttpAuthenticationHandler;
import com.atlassian.jira.rest.client.internal.async.AsynchronousJiraRestClientFactory;

/**
 * A factory for creating rest client objects.
 */
public class RestClientFactory {

	private final AsynchronousJiraRestClientFactory jiraRestClientFactory = new AsynchronousJiraRestClientFactory();

	/**
	 * Creates an instance of JiraRestClient with default HttpClient settings
	 * and conduct basic authentication for given credentials.
	 *
	 * @param serverUri URI of JIRA server instance.
	 * @param username JIRA password for the given username.
	 * @param password the password
	 * @return the jira rest client
	 * @throws URISyntaxException the URI syntax exception
	 */
	JiraRestClient createJiraClient(final String serverUri,
			final String username, final String password)
			throws URISyntaxException {

		return jiraRestClientFactory.create(new URI(serverUri),
				new BasicHttpAuthenticationHandler(username, password));
	}

	/**
	 * Creates an instance of JiraRestClient with default HttpClient settings,
	 * but no credentials are passed to the server. Only anonymously accessible
	 * operations will be possible.
	 *
	 * @param serverUri URI of JIRA server instance.
	 * @return the jira rest client
	 * @throws URISyntaxException the URI syntax exception
	 */
	JiraRestClient createJiraClient(final String serverUri)
			throws URISyntaxException {

		return jiraRestClientFactory.create(new URI(serverUri),
				new AnonymousAuthenticationHandler());
	}

}