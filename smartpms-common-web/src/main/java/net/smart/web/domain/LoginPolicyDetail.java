package net.smart.web.domain;


public class LoginPolicyDetail extends LoginPolicyFactor {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -7313063174917081722L;
	private String loginPolicyId;
	private String loginPolicyFactorValue;
	
	public String getLoginPolicyId() {
		return loginPolicyId;
	}
	public void setLoginPolicyId(String loginPolicyId) {
		this.loginPolicyId = loginPolicyId;
	}
	public String getLoginPolicyFactorValue() {
		return loginPolicyFactorValue;
	}
	public void setLoginPolicyFactorValue(String loginPolicyFactorValue) {
		this.loginPolicyFactorValue = loginPolicyFactorValue;
	}
}
