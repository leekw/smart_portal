package net.smart.web.support.authentication.voter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import net.smart.common.service.RoleService;
import net.smart.common.service.SmartCommonService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.FilterInvocation;

public class ServiceRoleVoter implements AccessDecisionVoter<Object> {
	
	private static Logger logger = LoggerFactory.getLogger(ServiceRoleVoter.class);
	
	@Autowired
	private RoleService roleService;
	
	@Autowired
	private SmartCommonService integrationCommonService;

	@Override
	public boolean supports(ConfigAttribute arg0) {
		return true;
	}

	@Override
	public boolean supports(Class<?> arg0) {
		return true;
	}

	@Override
	public int vote(Authentication authentication, Object object, Collection<ConfigAttribute> attributes) {
		int result = ACCESS_ABSTAIN;
//        FilterInvocation filterInvocation = null;
//        List<GrantedAuthority> authList = (List<GrantedAuthority>) authentication.getAuthorities();
//        boolean isAuth = false;
//        for (GrantedAuthority obj : authList) {
//        	if (obj.getAuthority().equals("ROLE_USER")) {
//        		isAuth = true;
//        		break;
//        	}
//        }
//        return isAuth ? ACCESS_GRANTED : ACCESS_DENIED;
		if (!integrationCommonService.isSuperAmin() && !integrationCommonService.isAccessPossible()) return ACCESS_DENIED;
		List<GrantedAuthority> authList = (List<GrantedAuthority>) authentication.getAuthorities();
		List<String> roles = new ArrayList<String>();
		for (GrantedAuthority auth : authList) {
			if ("ROLE_SUPER".equals(auth.getAuthority())) {
				result = ACCESS_GRANTED;
			}
			roles.add(auth.getAuthority());
		}
		if (result != ACCESS_GRANTED) {
			FilterInvocation filterInvocation = null;
			if (object instanceof FilterInvocation) {
		        filterInvocation = (FilterInvocation) object;
		        String url = filterInvocation.getHttpRequest().getRequestURI();
		        if (url.lastIndexOf(".json") != -1) {
			        url = url.replaceAll("/int/", "/");
			        url = url.replaceAll("//", "/");
			        if (roleService.isPermitResource(roles, url)) 
			        	result = ACCESS_GRANTED;
			        else {
			        	logger.error(" ################  ACCESS_DENIED URL :" + url);
			        }
		        }
			}
		}
		return result;
	}
	
}
