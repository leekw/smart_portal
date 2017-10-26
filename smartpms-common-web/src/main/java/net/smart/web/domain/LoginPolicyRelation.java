package net.smart.web.domain;

import net.smart.common.domain.Common;

public class LoginPolicyRelation extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6625272043184894033L;
	private String loginPolicyId;
	private String roleId;
	
	public String getLoginPolicyId() {
		return loginPolicyId;
	}
	public void setLoginPolicyId(String loginPolicyId) {
		this.loginPolicyId = loginPolicyId;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
}
