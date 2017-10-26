package net.smart.web.login.service;

import net.smart.common.domain.IntUser;
import net.smart.web.domain.UserInfo;

public interface LoginService {
	
	public IntUser login(UserInfo param);
	
	public IntUser loginLocal(UserInfo param);

}
