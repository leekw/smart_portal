package net.smart.web.domain;

import net.smart.common.domain.Common;

public class LoginPolicyFactor extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 2352134796438209256L;
	private String loginPolicyFactorId;
	private String loginPolicyFactorName;
	private String loginPolicyFactorTypeCode;
	private String viewTypeCode;
	
	public String getLoginPolicyFactorId() {
		return loginPolicyFactorId;
	}
	public void setLoginPolicyFactorId(String loginPolicyFactorId) {
		this.loginPolicyFactorId = loginPolicyFactorId;
	}
	public String getLoginPolicyFactorName() {
		return loginPolicyFactorName;
	}
	public void setLoginPolicyFactorName(String loginPolicyFactorName) {
		this.loginPolicyFactorName = loginPolicyFactorName;
	}	
	public String getLoginPolicyFactorTypeCode() {
		return loginPolicyFactorTypeCode;
	}
	public void setLoginPolicyFactorTypeCode(String loginPolicyFactorTypeCode) {
		this.loginPolicyFactorTypeCode = loginPolicyFactorTypeCode;
	}
	public String getViewTypeCode() {
		return viewTypeCode;
	}
	public void setViewTypeCode(String viewTypeCode) {
		this.viewTypeCode = viewTypeCode;
	}
	
}
