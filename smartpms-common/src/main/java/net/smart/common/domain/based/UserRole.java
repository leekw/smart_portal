package net.smart.common.domain.based;

import net.smart.common.domain.Common;

public class UserRole extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5190033699514064448L;
	private String userId;
	private String roleId;
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
}
