package net.smart.web.domain;

import java.util.Date;
import java.util.List;

import net.smart.common.domain.Common;

public class LoginPolicy extends Common {
	/**
	 * 
	 */
	private static final long serialVersionUID = -288447427512495313L;
	private String loginPolicyId;
	private String loginPolicyName;
	private String loginPolicyEffectiveDataStr;
	private String loginPolicyExpirationDateStr;
	private Date loginPolicyEffectivdDate;
	private Date loginPolicyExpirationDate;
	private List<LoginPolicyDetail> loginPolicyDetailList;
	
	public List<LoginPolicyDetail> getLoginPolicyDetailList() {
		return loginPolicyDetailList;
	}
	public void setLoginPolicyDetailList(
			List<LoginPolicyDetail> loginPolicyDetailList) {
		this.loginPolicyDetailList = loginPolicyDetailList;
	}
	public String getLoginPolicyId() {
		return loginPolicyId;
	}
	public void setLoginPolicyId(String loginPolicyId) {
		this.loginPolicyId = loginPolicyId;
	}
	public String getLoginPolicyName() {
		return loginPolicyName;
	}
	public void setLoginPolicyName(String loginPolicyName) {
		this.loginPolicyName = loginPolicyName;
	}
	public String getLoginPolicyEffectiveDataStr() {
		return loginPolicyEffectiveDataStr;
	}
	public void setLoginPolicyEffectiveDataStr(String loginPolicyEffectiveDataStr) {
		this.loginPolicyEffectiveDataStr = loginPolicyEffectiveDataStr;
	}
	public String getLoginPolicyExpirationDateStr() {
		return loginPolicyExpirationDateStr;
	}
	public void setLoginPolicyExpirationDateStr(String loginPolicyExpirationDateStr) {
		this.loginPolicyExpirationDateStr = loginPolicyExpirationDateStr;
	}
	public Date getLoginPolicyEffectivdDate() {
		return loginPolicyEffectivdDate;
	}
	public void setLoginPolicyEffectivdDate(Date loginPolicyEffectivdDate) {
		this.loginPolicyEffectivdDate = loginPolicyEffectivdDate;
	}
	public Date getLoginPolicyExpirationDate() {
		return loginPolicyExpirationDate;
	}
	public void setLoginPolicyExpirationDate(Date loginPolicyExpirationDate) {
		this.loginPolicyExpirationDate = loginPolicyExpirationDate;
	}
}
