package net.smart.web.login.service;

import java.util.ArrayList;
import java.util.List;

import net.smart.common.domain.IntUser;
import net.smart.common.domain.based.UserRole;
import net.smart.common.exception.IntegrationException;
import net.smart.common.support.security.StringEncrypter;
import net.smart.common.support.util.DateUtil;
import net.smart.web.domain.UserInfo;
import net.smart.web.resource.dao.ResourceDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.atlassian.crowd.embedded.api.PasswordCredential;
import com.atlassian.crowd.exception.ApplicationAccessDeniedException;
import com.atlassian.crowd.exception.ApplicationPermissionException;
import com.atlassian.crowd.exception.ExpiredCredentialException;
import com.atlassian.crowd.exception.InactiveAccountException;
import com.atlassian.crowd.exception.InvalidAuthenticationException;
import com.atlassian.crowd.exception.InvalidTokenException;
import com.atlassian.crowd.exception.OperationFailedException;
import com.atlassian.crowd.integration.rest.service.factory.RestCrowdClientFactory;
import com.atlassian.crowd.model.authentication.UserAuthenticationContext;
import com.atlassian.crowd.model.authentication.ValidationFactor;
import com.atlassian.crowd.model.user.User;
import com.atlassian.crowd.service.client.CrowdClient;

@Service("loginService")
public class LoginServiceImpl implements LoginService {
	
	@Autowired
	private ResourceDao resourceDao;

	@Override
	public IntUser login(UserInfo param) {
		RestCrowdClientFactory factory = new RestCrowdClientFactory();
		CrowdClient client = factory.newInstance("http://10.217.230.250:8088/crowd", "kt_bit_jira_system", "admin!23");
		
		UserAuthenticationContext userAuthCtx = new UserAuthenticationContext();
		userAuthCtx.setName(param.getUserId());
		userAuthCtx.setCredential(new PasswordCredential(param.getUserPassword()));
		userAuthCtx.setApplication("kt_bit_jira_system");
		userAuthCtx.setValidationFactors(new ValidationFactor[0]);
		String token = null;
		IntUser result = new IntUser();
		 try {
			 token = client.authenticateSSOUser(userAuthCtx);
			 User user = client.findUserFromSSOToken(token);
			 result.setUserId(param.getUserId());
			 result.setUserName(user.getDisplayName());
			 result.setLoginDate(DateUtil.getNowByFormat(DateUtil.Format.YYYY_MM_DD_HH_MI_SS.getValue()));
			 result.setIp(param.getIp());
			 
			 param.setMaxRowSize(1);
			 List<UserInfo> users = resourceDao.getUserInfoList(param);
			 boolean isAccess = false; 
			 if (users != null && users.get(0) != null) {
				 isAccess = users.get(0).isAccess(); 
			 }
			 result.setAccess(isAccess);
			 
			 UserRole roleParam = new UserRole();
			 roleParam.setUserId(result.getUserId());
			 List<UserRole> userRoles = resourceDao.getUserRoleList(roleParam);
			 
			 List<GrantedAuthority> temps = new ArrayList<GrantedAuthority>();
			 GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_USER");
			 temps.add(authority);
			 for (UserRole role : userRoles) {
				 authority = new SimpleGrantedAuthority(role.getRoleId());
				 temps.add(authority);
			 }
			 result.setAuthorityList(temps);
			 
		} catch (InactiveAccountException e) {
			throw new IntegrationException("ERROR.0005", param.getUserId() + "아이디가 활성화 되지 않았습니다.");
		} catch (ExpiredCredentialException e) {
			throw new IntegrationException("ERROR.0003", param.getUserId() + "아이디의 세션정보가 만료되었습니다.");
		} catch (ApplicationPermissionException e) {
			throw new IntegrationException("ERROR.0004", param.getUserId() + "아이디의 접속 권한이 없습니다.");
		} catch (InvalidAuthenticationException e) {
			throw new IntegrationException("ERROR.0002", param.getUserId() + "아이디의 접속정보가 올바르지 않습니다.(아이디, 패스워드 확인)");
		} catch (OperationFailedException e) {
			throw new IntegrationException("ERROR.0006", "로그인 실패되었습니다.");
		} catch (ApplicationAccessDeniedException e) {
			throw new IntegrationException("ERROR.0006", "로그인 실패되었습니다.");
		} catch (InvalidTokenException e) {
			throw new IntegrationException("ERROR.0001", "Token 정보가 올바르지 않습니다.");
		}
		
		 
		return result;
	}

	@Override
	public IntUser loginLocal(UserInfo param) {
		StringEncrypter se = new StringEncrypter(false);
		String checkParamPassword;
		try {
			checkParamPassword = se.encrypt(param.getUserPassword());
		} catch (Exception e) {
			throw new IntegrationException("ERROR.0006", "사용자 패스워드 Encription 도중 오류가 발생되었습니다.");
		}
		IntUser result = new IntUser();
		result.setUserId(param.getUserId());
		result.setLoginDate(DateUtil.getNowByFormat(DateUtil.Format.YYYY_MM_DD_HH_MI_SS.getValue()));
		result.setIp(param.getIp());
		param.setMaxRowSize(1);
		List<UserInfo> users = resourceDao.getUserInfoList(param);
		boolean isAccess = false;
		String userName = null;
		if (users == null || users.isEmpty()) {
			throw new IntegrationException("ERROR.0007");
		}
		if (!checkParamPassword.equals(users.get(0).getUserPassword())) {
			throw new IntegrationException("ERROR.0008");
		}
		isAccess = users.get(0).isAccess();
		userName = users.get(0).getUserName();
		if (!isAccess) {
			throw new IntegrationException("ERROR.0009");
		}
		
		result.setAccess(isAccess);
		result.setUserName(userName);

		UserRole roleParam = new UserRole();
		roleParam.setUserId(result.getUserId());
		List<UserRole> userRoles = resourceDao.getUserRoleList(roleParam);
		if (userRoles == null || userRoles.isEmpty()) {
			throw new IntegrationException("ERROR.0010");
		}
		
		List<GrantedAuthority> temps = new ArrayList<GrantedAuthority>();
		GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_USER");
		temps.add(authority);
		for (UserRole role : userRoles) {
			authority = new SimpleGrantedAuthority(role.getRoleId());
			temps.add(authority);
		}
		result.setAuthorityList(temps);
		return result;
	}

}
