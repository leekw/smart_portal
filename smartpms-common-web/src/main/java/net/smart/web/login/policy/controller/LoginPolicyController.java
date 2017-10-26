package net.smart.web.login.policy.controller;

import java.util.List;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.annotation.IntegrationResponse;
import net.smart.web.domain.LoginPolicy;
import net.smart.web.domain.LoginPolicyFactor;
import net.smart.web.login.policy.service.LoginPolicyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/login/policy/**")
public class LoginPolicyController {
	
	@Autowired
	private LoginPolicyService loginPolicyService;	
	
	@RequestMapping(value = "/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="policys")
	public List<LoginPolicy> getLoginPolicyList(@IntegrationRequest LoginPolicy loginPolicy) {
		return loginPolicyService.getLoginPolicyList(loginPolicy);
	}
	
	@RequestMapping(value = "/factor/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="factors")
	public List<LoginPolicyFactor> getLoginPolicyFactorList(@IntegrationRequest LoginPolicyFactor loginPolicyFactor) {
		return loginPolicyService.getLoginPolicyFactorList(loginPolicyFactor);
	}


}
