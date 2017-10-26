package net.smart.web.login.contorller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.domain.IntUser;
import net.smart.web.domain.UserInfo;
import net.smart.web.login.service.LoginService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	//@RequestMapping(value = "/login/process.{metadataType}", method = RequestMethod.POST)
	public void login(@IntegrationRequest UserInfo param, HttpServletRequest request) {
		
		HttpSession session = request.getSession(true);
		
		IntUser result = loginService.login(param);
	
		session.setAttribute("IS_LOGIN", true);
		session.setAttribute("LOGIN_INFO", result);
	}
	
	@RequestMapping(value = "/logout/process.{metadataType}", method = RequestMethod.POST)
	public void logout(@IntegrationRequest UserInfo param, HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		if (session != null)
			session.invalidate();
		SecurityContext securityContext = SecurityContextHolder.getContext();
		if (securityContext != null) {
			if (securityContext.getAuthentication() != null){
				new SecurityContextLogoutHandler().logout(request, response, securityContext.getAuthentication());
			}
		}
	}

}
