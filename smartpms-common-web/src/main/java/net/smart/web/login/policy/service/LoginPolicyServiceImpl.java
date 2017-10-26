package net.smart.web.login.policy.service;

import java.util.List;

import net.smart.web.domain.LoginPolicy;
import net.smart.web.domain.LoginPolicyFactor;
import net.smart.web.login.policy.dao.LoginPolicyDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("loginPolicyService")
public class LoginPolicyServiceImpl implements LoginPolicyService {
	
	@Autowired
	private LoginPolicyDao loginPolicyDao;

	@Override
	public List<LoginPolicy> getLoginPolicyList(LoginPolicy param) {
		return loginPolicyDao.getLoginPolicyList(param);
	}

	@Override
	public List<LoginPolicyFactor> getLoginPolicyFactorList(LoginPolicyFactor param) {
		return loginPolicyDao.getLoginPolicyFactorList(param);
	}

}
