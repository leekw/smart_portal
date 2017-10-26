/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.rest.client;

import java.net.URI;

import com.atlassian.jira.rest.client.api.IssueRestClient;
import com.atlassian.jira.rest.client.api.RestClientException;
import com.atlassian.jira.rest.client.api.domain.Issue;
import com.atlassian.jira.rest.client.api.domain.input.IssueInput;
import com.atlassian.util.concurrent.Promise;

/**
 * Extending the IssueRestClient interface to handle updating of issue resources
 * (fields) like summary, description, etc.
 * @see com.atlassian.jira.rest.client.api.MetadataRestClient
 */
public interface ExtendedIssueRestClient extends IssueRestClient {

	/**
	 * Performs selected transition on selected issue.
	 *
	 * @param issueUri  URI of selected issue. Usually obtained by calling <code>Issue.getSelf()</code>
	 * @param issueInput data for this issue (fields modified, the description, etc.)
	 * @throws RestClientException in case of problems (connectivity, malformed messages, invalid argument, etc.)
	 */
	Promise<Void> update(URI issueUri, IssueInput issueInput);

	/**
	 * Performs selected transition on selected issue.
	 *
	 * @param issue           selected issue
	 * @param issueInput data for this issue (fields modified, the description, etc.)
	 * @throws RestClientException in case of problems (connectivity, malformed messages, invalid argument, etc.)
	 */
	Promise<Void> update(Issue issue, IssueInput issueInput);
}
