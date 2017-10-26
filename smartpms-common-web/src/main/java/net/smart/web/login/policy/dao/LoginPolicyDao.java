package net.smart.web.login.policy.dao;

import java.util.List;

import net.smart.web.domain.LoginPolicy;
import net.smart.web.domain.LoginPolicyFactor;

public interface LoginPolicyDao {
	
	public List<LoginPolicy> getLoginPolicyList(LoginPolicy param);
	
	public List<LoginPolicyFactor> getLoginPolicyFactorList(LoginPolicyFactor param);

}
