package net.smart.web.login.policy.service;

import java.util.List;

import net.smart.web.domain.LoginPolicy;
import net.smart.web.domain.LoginPolicyFactor;

public interface LoginPolicyService {
	
	public List<LoginPolicy> getLoginPolicyList(LoginPolicy param);
	
	public List<LoginPolicyFactor> getLoginPolicyFactorList(LoginPolicyFactor param);

}
