package net.smart.common.web;

import static org.junit.Assert.fail;

import java.io.IOException;
import java.util.Random;

import net.smart.web.plugin.jira.rest.client.RestClientManager;

public class RestTest {

	protected static final String JIRA_SERVER_URI = "JIRA_SERVER_URI";
	protected static final String JIRA_USERNAME = "JIRA_USERNAME";
	protected static final String JIRA_PASSWORD = "JIRA_PASSWORD";
	
	protected static final String TRUST_STORE_PATH = "TRUST_STORE_PATH";
	protected static final String TRUST_STORE_PASSWORD = "TRUST_STORE_PASSWORD";
	
	protected static final String serverUri = System.getProperty(JIRA_SERVER_URI, "http://10.217.230.250:8080/");
	protected static final String username = System.getProperty(JIRA_USERNAME, "91098304");
	protected static final String password = System.getProperty(JIRA_PASSWORD, "kt8564!a");
	
//	protected static final String trustStorePath = System.getProperty(TRUST_STORE_PATH, System.getProperty("user.home") + File.separator + ".keystore");
//	protected static final String trustStorePassword = System.getProperty(TRUST_STORE_PASSWORD, "abc123");

	protected RestClientManager clientManager = null;
	protected Random rand = new Random(System.currentTimeMillis());
	
	/**
	 * Initialize the REST client manager
	 */
	protected void init() {
		try {
			this.clientManager = new RestClientManager(serverUri, username, password);
		} catch (Exception e) {
			fail("Unexpected exception: " + e.getLocalizedMessage());
		}
	}

	/**
	 * Dispose the REST client manager
	 */
	protected void dispose() {
		if (this.clientManager != null) {
			// Dispose the client
			try {
				this.clientManager.dispose();
			} catch (IOException e) {
				// Can't do much at this point.
				e.printStackTrace();
			}
		}
	}

	/**
	 * Get a positive random integer
	 * @return
	 */
	protected int getRandomInt() {
        return Math.abs(this.rand.nextInt());
    }
}
