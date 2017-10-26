package net.smart.common.web;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.fail;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import com.atlassian.jira.rest.client.api.domain.BasicIssue;
import com.atlassian.jira.rest.client.api.domain.BasicUser;
import com.atlassian.jira.rest.client.api.domain.Issue;
import com.atlassian.jira.rest.client.api.domain.Transition;
import com.atlassian.jira.rest.client.api.domain.input.ComplexIssueInputFieldValue;
import com.atlassian.jira.rest.client.api.domain.input.FieldInput;
import com.atlassian.jira.rest.client.api.domain.input.IssueInputBuilder;
import com.atlassian.jira.rest.client.api.domain.input.TransitionInput;
import com.google.common.collect.ImmutableList;

public class ExtendedIssueRestClientTest extends RestTest {
	
	/**
	 * @BeforeClass annotation to a method to be run before all the tests in a class.
	 */
	@BeforeClass
	public static void oneTimeSetUp() {
		// one-time initialization code (before all the tests).
	}

	/**
	 * @AfterClass annotation to a method to be run after all the tests in a class.
	 */
	@AfterClass
	public static void oneTimeTearDown() {
		// one-time cleanup code (after all the tests).
	}

	/**
	 * @Before annotation to a method to be run before each test in a class.
	 */
	@Before
	public void setUp() {
		init();
	}

	/**
	 * @After annotation to a method to be run after each test in a class.
	 */
	@After
	public void tearDown() {
		dispose();
	}
	
	/**
	 * Test create issue using the ExtendedIssueRestClientTest.
	 */
	@Test
	public void testCreateAndDeleteIssue() {
		String jiraProjectName = "JIRATS";
		BasicIssue basicIssue = null;
		Issue issue = null;
		
		try {
			//for (int i=0;i < 100;i++) {
				String summary = "SEQ : " + (1) + "NewIssue#" + getRandomInt();
				String description = "This is a test " + summary;
				IssueInputBuilder issueInputBuilder = new IssueInputBuilder(jiraProjectName, 6L, summary);
				issueInputBuilder.setSummary(summary);
				issueInputBuilder.setDescription(description);
				//issueInputBuilder.setFieldValue("customfield_10001", pars);
//				issueInputBuilder.setFieldInput(new FieldInput("customfield_10001", pars));
				List<ComplexIssueInputFieldValue> fieldList = new ArrayList<ComplexIssueInputFieldValue>();
				//Map<String, Object> valueData = new HashMap<String, Object>();
				//valueData.put("value", "91098304");
				//ComplexIssueInputFieldValue fieldValue = new ComplexIssueInputFieldValue(valueData);
				fieldList.add(ComplexIssueInputFieldValue.with("value", "DEV1"));
				BasicUser user = new BasicUser(new URI("http://10.217.230.251:8080/rest/api/2/user?username=91095552"), "91095552", "91095552");
				ImmutableList<BasicUser> customData = ImmutableList.of(user);
				issueInputBuilder.setFieldValue("customfield_10001", customData);
				issueInputBuilder.setFieldInput(new FieldInput("customfield_10002", ComplexIssueInputFieldValue.with("id", "10000")));
				issueInputBuilder.setFieldValue("customfield_11101", "한글 테스트");
				
				
				issueInputBuilder.build().toString();
				basicIssue = clientManager.getExtendedIssueClient().createIssue(issueInputBuilder.build()).claim();
				assertNotNull(basicIssue);
				// Get the newly created issue.
				issue = clientManager.getExtendedIssueClient().getIssue(basicIssue.getKey()).claim();
				assertNotNull(issue);
			//}
		} catch (Exception e) {
			e.printStackTrace();
			fail("Unexpected exception: " + e.getLocalizedMessage());
		} finally {
			// Delete the newly created issue.
//			if (issue != null && basicIssue != null) {
//				clientManager.getExtendedIssueClient().deleteIssue(basicIssue.getKey(), true).claim();
//				try {
//					issue = clientManager.getExtendedIssueClient().getIssue(basicIssue.getKey()).claim();
//				} catch (RestClientException rce) {
//					// Should have message about issue does not exist
//					assertTrue(rce.getMessage().contains("Issue Does Not Exist"));
//				}
//			}
		}
	}
	
	/**
	 * Test update issue using the ExtendedIssueRestClientTest.
	 */
	@Test
	public void testUpdateIssue() {
		
		Issue issue = null;
		String originalDescription = null;
		
		try {
	    	issue = clientManager.getExtendedIssueClient().getIssue("PA-308").claim();
			assertNotNull(issue);
			Iterable<Transition> transitions = clientManager.getExtendedIssueClient().getTransitions(issue).claim();
			assertNotNull(transitions);
			int transitionId = -1;
			for (Transition t : transitions) {
				if (t != null) {
					if (t.getName().equals("Start Progress")) {
						transitionId = t.getId();
						break;
					}
				}
			}
			clientManager.getExtendedIssueClient().transition(issue, new TransitionInput(61)).claim();
			System.out.println("transitionId :" + transitionId);
//			originalDescription = issue.getDescription();
//			
//			// Change the description
//			String newDescription = originalDescription + " (Modified on: " + Calendar.getInstance().toString() + ")";
//
//			IssueInputBuilder issueInputBuilder = new IssueInputBuilder(issue.getProject(), issue.getIssueType());
//			issueInputBuilder.setDescription(newDescription);
//			clientManager.getExtendedIssueClient().update(issue, issueInputBuilder.build()).claim();
//
//			issue = clientManager.getExtendedIssueClient().getIssue("WDS-2").claim();
//			assertNotNull(issue);
//			assertEquals(newDescription, issue.getDescription());
		} catch (Exception e) {
			e.printStackTrace();
			fail("Unexpected exception: " + e.getLocalizedMessage());
		} finally {
			// Revert back the description to the original.
//			if (issue != null && originalDescription != null) {
//				IssueInputBuilder issueInputBuilder = new IssueInputBuilder(issue.getProject(), issue.getIssueType());
//				issueInputBuilder.setDescription(originalDescription);
//				clientManager.getExtendedIssueClient().update(issue, issueInputBuilder.build()).claim();
//
//				issue = clientManager.getExtendedIssueClient().getIssue("WDS-2").claim();
//				assertNotNull(issue);
//				assertEquals(originalDescription, issue.getDescription());
//			}
		}
	}

}
