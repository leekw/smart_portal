/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.rest.internal.client;

import java.net.URI;

import javax.ws.rs.core.UriBuilder;

import net.smart.web.plugin.jira.rest.client.ExtendedMetadataRestClient;

import com.atlassian.httpclient.api.HttpClient;
import com.atlassian.jira.rest.client.api.domain.IssueType;
import com.atlassian.jira.rest.client.api.domain.Priority;
import com.atlassian.jira.rest.client.api.domain.Resolution;
import com.atlassian.jira.rest.client.api.domain.Status;
import com.atlassian.jira.rest.client.internal.async.AsynchronousMetadataRestClient;
import com.atlassian.jira.rest.client.internal.json.GenericJsonArrayParser;
import com.atlassian.jira.rest.client.internal.json.IssueTypeJsonParser;
import com.atlassian.jira.rest.client.internal.json.PriorityJsonParser;
import com.atlassian.jira.rest.client.internal.json.ResolutionJsonParser;
import com.atlassian.jira.rest.client.internal.json.StatusJsonParser;
import com.atlassian.util.concurrent.Promise;
import com.atlassian.util.concurrent.Promises;

/**
 * Asynchronous implementation of ExtendedMetadataRestClient.
 */
public class AsynchronousExtendedMetadataRestClient extends AsynchronousMetadataRestClient implements ExtendedMetadataRestClient {

	private final StatusJsonParser statusJsonParser = new StatusJsonParser();
	private final GenericJsonArrayParser<Status> statusesJsonParser = GenericJsonArrayParser.create(statusJsonParser);
	private final IssueTypeJsonParser issueTypeJsonParser = new IssueTypeJsonParser();
	private final GenericJsonArrayParser<IssueType> issueTypesJsonParser = GenericJsonArrayParser.create(issueTypeJsonParser);
	private final PriorityJsonParser priorityJsonParser = new PriorityJsonParser();
	private final GenericJsonArrayParser<Priority> prioritiesJsonParser = GenericJsonArrayParser.create(priorityJsonParser);
	private final ResolutionJsonParser resolutionJsonParser = new ResolutionJsonParser();
	private final GenericJsonArrayParser<Resolution> resolutionsJsonParser = GenericJsonArrayParser.create(resolutionJsonParser);

	private final URI baseUri;

	public AsynchronousExtendedMetadataRestClient(final URI baseUri, HttpClient httpClient) {
		super(baseUri, httpClient);
		this.baseUri = baseUri;
	}

	/**
	 * @see net.smart.web.plugin.jira.rest.client.ExtendedMetadataRestClient#getStatuses()
	 */
	public Promise<Iterable<Status>> getStatuses() {
		final URI uri = UriBuilder.fromUri(baseUri).path("status").build();
		return getAndParse(uri, statusesJsonParser);
	}

	/**
	 * @see net.smart.web.plugin.jira.rest.client.ExtendedMetadataRestClient#getIssueType(String)
	 */
	public Promise<IssueType> getIssueType(final String type) {
		final URI uri = UriBuilder.fromUri(baseUri).path("issuetype").build();
		Iterable<IssueType> issueTypes = (getAndParse(uri, issueTypesJsonParser)).claim();
		if (issueTypes != null) {
			for (IssueType issueType : issueTypes) {
				// Case insensitive match
				if (issueType.getName().equalsIgnoreCase(type)) {
					return Promises.promise(issueType);
				}
			}
		}
		return Promises.promise(null);
	}

	/**
	 * @see net.smart.web.plugin.jira.rest.client.ExtendedMetadataRestClient#getStatus(String)
	 */
	public Promise<Status> getStatus(final String status) {
		final URI uri = UriBuilder.fromUri(baseUri).path("status").build();
		Iterable<Status> issueStatuses = (getAndParse(uri, statusesJsonParser)).claim();
		if (issueStatuses != null) {
			for (Status issueStatus : issueStatuses) {
				// Case insensitive match
				if (issueStatus.getName().equalsIgnoreCase(status)) {
					return Promises.promise(issueStatus);
				}
			}
		}
		return Promises.promise(null);
	}

	/**
	 * @see net.smart.web.plugin.jira.rest.client.ExtendedMetadataRestClient#getPriority(String)
	 */
	public Promise<Priority> getPriority(String priority) {
		final URI uri = UriBuilder.fromUri(baseUri).path("priority").build();
		Iterable<Priority> issuePriorities = (getAndParse(uri, prioritiesJsonParser)).claim();
		if (issuePriorities != null) {
			for (Priority issuePriority : issuePriorities) {
				// Case insensitive match
				if (issuePriority.getName().equalsIgnoreCase(priority)) {
					return Promises.promise(issuePriority);
				}
			}
		}
		return Promises.promise(null);
	}

	/**
	 * @see net.smart.web.plugin.jira.rest.client.ExtendedMetadataRestClient#getResolution(String)
	 */
	public Promise<Resolution> getResolution(String resolution) {
		final URI uri = UriBuilder.fromUri(baseUri).path("resolution").build();
		Iterable<Resolution> issueResolutions = (getAndParse(uri, resolutionsJsonParser)).claim();
		if (issueResolutions != null) {
			for (Resolution issueResolution : issueResolutions) {
				// Case insensitive match
				if (issueResolution.getName().equalsIgnoreCase(resolution)) {
					return Promises.promise(issueResolution);
				}
			}
		}
		return Promises.promise(null);
	}
}
