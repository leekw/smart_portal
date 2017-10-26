package net.smart.common.web;

import java.net.URI;

import com.atlassian.jira.rest.client.api.IssueRestClient;
import com.atlassian.jira.rest.client.api.JiraRestClient;
import com.atlassian.jira.rest.client.api.domain.BasicIssue;
import com.atlassian.jira.rest.client.api.domain.input.IssueInput;
import com.atlassian.jira.rest.client.api.domain.input.IssueInputBuilder;
import com.atlassian.jira.rest.client.internal.async.AsynchronousJiraRestClientFactory;
import com.atlassian.util.concurrent.Promise;

public class JiraRestClientTest {
	
	public static void main(String[] args) throws Exception {
		final URI uri = URI.create("http://10.217.230.251:8080");
		final AsynchronousJiraRestClientFactory factory = new AsynchronousJiraRestClientFactory();
		final JiraRestClient restClient = factory.createWithBasicHttpAuthentication(uri, "91098304", "kt8564!a");
		final IssueRestClient issueClient = restClient.getIssueClient();
		try {
			IssueInput isssue = new IssueInputBuilder("PA1-2 차세대 BSS 2단계", 114L, "JIRA Test").build();
			Promise<BasicIssue> createIssue = issueClient.createIssue(isssue);
		} catch(Exception ex) {
			ex.printStackTrace();
		}
	}

}
