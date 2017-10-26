package net.smart.web.support.authentication.provider;

import net.smart.common.domain.IntUser;
import net.smart.common.domain.UserDetail;
import net.smart.common.domain.based.BasedUser;
import net.smart.common.service.SmartCommonService;
import net.smart.web.support.authentication.token.SSOAuthenticationToken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.SpringSecurityMessageSource;

public class SSOAuthenticationProvider implements AuthenticationProvider {
	
	protected MessageSourceAccessor messages = SpringSecurityMessageSource.getAccessor();
	
	@Autowired
	private SmartCommonService smartCommonService;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		 SSOAuthenticationToken token = (SSOAuthenticationToken)authentication;
		 String username = (authentication.getPrincipal() == null) ? "NONE_PROVIDED" : authentication.getName();
	     String password = (authentication.getCredentials() == null) ? "NONE_PROVIDED" : (String)authentication.getCredentials();
	     String ip = (token.getClientIP() == null) ? "NONE_PROVIDED" : (String)token.getClientIP();
	     BasedUser param = new BasedUser();
	     param.setUserId(username);
	     param.setUserPassword(password);
	     param.setIp(ip);
	     IntUser user =  null;
	     UserDetail detail = null;
	     try {
	    	 user = smartCommonService.login(param);
	     } catch (Exception e) {
	    	 throw new AuthenticationServiceException(e.getMessage(),  e);
	     }
    	 detail = new UserDetail(user.getUserId(), user.getUserId(), user, true, true, true, true, user.getAuthorityList());
	     
	     return createSuccessAuthentication(username, password, (SSOAuthenticationToken)authentication, detail);
	}
	
	protected Authentication createSuccessAuthentication(Object principal, Object credentials, SSOAuthenticationToken authentication, UserDetail user) {
	    SSOAuthenticationToken result = new SSOAuthenticationToken(principal, credentials, authentication.isSsoMode(), authentication.getTrustToken(),
	    		authentication.getSsoToken(), authentication.getClientIP(), authentication.getClientMacAddress(), user.getAuthorities());
	    result.setDetails(user);

        return result;
    }

	@Override
	public boolean supports(Class<?> authentication) {
		return SSOAuthenticationToken.class.isAssignableFrom(authentication);
	}

}
