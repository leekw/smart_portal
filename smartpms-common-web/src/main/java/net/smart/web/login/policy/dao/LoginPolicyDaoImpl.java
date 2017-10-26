package net.smart.web.login.policy.dao;

import java.util.List;

import net.smart.common.support.dao.SmartSqlSessionDaoSupport;
import net.smart.web.domain.LoginPolicy;
import net.smart.web.domain.LoginPolicyFactor;

import org.springframework.stereotype.Repository;

@Repository
public class LoginPolicyDaoImpl extends SmartSqlSessionDaoSupport implements LoginPolicyDao{

	@Override
	public List<LoginPolicy> getLoginPolicyList(LoginPolicy param) {
		return getSqlSession().selectList("login.policy.selectLoginPolicyList", param);
	}

	@Override
	public List<LoginPolicyFactor> getLoginPolicyFactorList(LoginPolicyFactor param) {
		return getSqlSession().selectList("login.policy.selectLoginPolicyFactorList", param);
	}

}
