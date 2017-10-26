package net.smart.web.support.authentication.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.smart.common.domain.IntUser;
import net.smart.common.domain.UserDetail;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

public class IntegrationSavedRequestAwareAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
	
	public void onAuthenticationSuccess(HttpServletRequest request,
			HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {
		HttpSession session = request.getSession();
		if (session != null) {
			IntUser user = null;
			UserDetail userDetail = (UserDetail) authentication.getDetails();
			user = userDetail.getIntUser();
			session.setAttribute("SAVED_USER", user);
		}
		super.onAuthenticationSuccess(request, response, authentication);
	}

}
