/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.rest.internal.search;

import java.net.URISyntaxException;
import java.util.Set;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import net.smart.common.exception.IntegrationException;
import net.smart.web.plugin.jira.rest.client.RestClientManager;
import net.smart.web.plugin.jira.rest.search.SearchService;

import com.atlassian.jira.rest.client.api.domain.Issue;
import com.atlassian.jira.rest.client.api.domain.SearchResult;

public class JqlSearcher implements SearchService {

	private RestClientManager clientManager = null;
	
	/**
	 * Constructor for instantiating a new JqlSearcher.
	 *
	 * @param clientManager the REST client manager
	 * @throws URISyntaxException the URI syntax exception
	 */
	public JqlSearcher(RestClientManager clientManager) {
		this.clientManager = clientManager;
	}
	
	/**
	 * @see net.smart.web.plugin.jira.rest.search.SearchService#searchIssues(java.lang.String)
	 */
	public Iterable<Issue> searchIssues(String jql) {
		return searchIssues(jql, null);
	}

	/**
	 * @see net.smart.web.plugin.jira.rest.search.SearchService#searchIssues(java.lang.String, java.lang.Integer)
	 */
	public Iterable<Issue> searchIssues(String jql, Integer maxResults) {
		return searchIssues(jql, maxResults, null, null);
	}

	/**
	 * @see net.smart.web.plugin.jira.rest.search.SearchService#searchIssues(java.lang.String, java.lang.Integer, java.lang.Integer)
	 */
	public Iterable<Issue> searchIssues(String jql, Integer maxResults, Integer startAt) {
		SearchResult searchResult = clientManager.getSearchClient().searchJql(jql, maxResults, startAt, null).claim();
		return searchResult.getIssues();
	}

	/**
	 * @throws TimeoutException 
	 * @throws ExecutionException 
	 * @throws InterruptedException 
	 * @see net.smart.web.plugin.jira.rest.search.SearchService#searchIssues(java.lang.String, java.lang.Integer, java.lang.Integer, java.util.Set)
	 */
	
	public Iterable<Issue> searchIssues(String jql, Integer maxResults, Integer startAt, Set<String> fields, int timeout)  {
		SearchResult searchResult;
		try {
			searchResult = clientManager.getSearchClient().searchJql(jql, maxResults, startAt, fields).get(timeout, TimeUnit.SECONDS);
		} catch (InterruptedException e) {
			throw new IntegrationException("ERROR.0001", e);
		} catch (ExecutionException e) {
			throw new IntegrationException("ERROR.0001", e);
		} catch (TimeoutException e) {
			throw new IntegrationException("ERROR.0001", e);
		}
		return searchResult.getIssues();
	}
	public Iterable<Issue> searchIssues(String jql, Integer maxResults, Integer startAt, Set<String> fields) {
		SearchResult searchResult = clientManager.getSearchClient().searchJql(jql, maxResults, startAt, fields).claim();
		return searchResult.getIssues();
	}
}
