package net.smart.common.domain.based;

import net.smart.common.domain.Common;

public class SessionUser extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2346791946679132398L;
	
	private String sessionId;
	private String userId;
	public String getSessionId() {
		return sessionId;
	}
	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
}
