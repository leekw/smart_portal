/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.rest.internal.client;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.net.URI;
import java.nio.charset.Charset;
import java.util.Collections;
import java.util.Map;

import net.smart.web.plugin.jira.rest.client.ExtendedIssueRestClient;

import org.codehaus.jettison.json.JSONException;

import com.atlassian.httpclient.api.EntityBuilder;
import com.atlassian.httpclient.api.HttpClient;
import com.atlassian.httpclient.api.ResponsePromise;
import com.atlassian.jira.rest.client.api.MetadataRestClient;
import com.atlassian.jira.rest.client.api.RestClientException;
import com.atlassian.jira.rest.client.api.SessionRestClient;
import com.atlassian.jira.rest.client.api.domain.Issue;
import com.atlassian.jira.rest.client.api.domain.input.IssueInput;
import com.atlassian.jira.rest.client.internal.async.AsynchronousIssueRestClient;
import com.atlassian.jira.rest.client.internal.json.gen.IssueInputJsonGenerator;
import com.atlassian.jira.rest.client.internal.json.gen.JsonGenerator;
import com.atlassian.util.concurrent.Promise;

/**
 * Asynchronous implementation of ExtendedIssueRestClient.
 */
public class AsynchronousExtendedIssueRestClient extends AsynchronousIssueRestClient implements ExtendedIssueRestClient {

	private static final String JSON_CONTENT_TYPE = "application/json";

	private final HttpClient client;

	public AsynchronousExtendedIssueRestClient(final URI baseUri, final HttpClient client, final SessionRestClient sessionRestClient,
			final MetadataRestClient metadataRestClient) {
		super(baseUri, client, sessionRestClient, metadataRestClient);
		this.client = client;
	}

	/**
	 * @see net.smart.web.plugin.jira.rest.client.ExtendedIssueRestClient#update(URI, IssueInput)
	 */
	public Promise<Void> update(final URI issueUri, final IssueInput issueInput) {
		return put(issueUri, issueInput, new IssueInputJsonGenerator());
	}

	/**
	 * @see net.smart.web.plugin.jira.rest.client.ExtendedIssueRestClient#update(Issue, IssueInput)
	 */
	public Promise<Void> update(final Issue issue, final IssueInput issueInput) {
		return update(issue.getSelf(), issueInput);
	}

	protected final <T> Promise<Void> put(final URI uri, final T entity, final JsonGenerator<T> jsonGenerator) {
		final ResponsePromise responsePromise = client.newRequest(uri)
				.setEntity(toEntity(jsonGenerator, entity))
				.put();
		return call(responsePromise);
	}

	private <T> EntityBuilder toEntity(final JsonGenerator<T> generator, final T bean) {
		return new EntityBuilder() {

			public Entity build() {
				return new Entity() {
					public Map<String, String> getHeaders() {
						return Collections.singletonMap("Content-Type", JSON_CONTENT_TYPE);
					}

					public InputStream getInputStream() {
						try {
							return new ByteArrayInputStream(generator.generate(bean).toString().getBytes(Charset
									.forName("UTF-8")));
						} catch (JSONException e) {
							throw new RestClientException(e);
						}
					}
				};
			}
		};
	}
}
