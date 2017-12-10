package net.smart.web.login.service;

import java.util.ArrayList;
import java.util.List;

import net.smart.common.domain.IntUser;
import net.smart.common.domain.based.UserRole;
import net.smart.common.exception.BizException;
import net.smart.common.support.security.StringEncrypter;
import net.smart.common.support.util.DateUtil;
import net.smart.web.domain.UserInfo;
import net.smart.web.resource.dao.ResourceDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

@Service("loginService")
public class LoginServiceImpl implements LoginService {
	
	@Autowired
	private ResourceDao resourceDao;


	@Override
	public IntUser loginLocal(UserInfo param) {
		StringEncrypter se = new StringEncrypter(false);
		String checkParamPassword;
		try {
			checkParamPassword = se.encrypt(param.getUserPassword());
		} catch (Exception e) {
			throw new BizException("ERROR.0006", "사용자 패스워드 Encription 도중 오류가 발생되었습니다.");
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
			throw new BizException("ERROR.0007");
		}
		if (!checkParamPassword.equals(users.get(0).getUserPassword())) {
			throw new BizException("ERROR.0008");
		}
		isAccess = users.get(0).isAccess();
		userName = users.get(0).getUserName();
		if (!isAccess) {
			throw new BizException("ERROR.0009");
		}
		
		result.setAccess(isAccess);
		result.setUserName(userName);

		UserRole roleParam = new UserRole();
		roleParam.setUserId(result.getUserId());
		List<UserRole> userRoles = resourceDao.getUserRoleList(roleParam);
		if (userRoles == null || userRoles.isEmpty()) {
			throw new BizException("ERROR.0010");
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
