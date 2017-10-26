package net.smart.web.support.authentication.voter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import net.smart.common.service.RoleService;
import net.smart.common.service.SmartCommonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.FilterInvocation;

public class ScreenRoleVoter implements AccessDecisionVoter<Object> {
	
	private List<String> grantScreens;
	
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
		        String param = filterInvocation.getHttpRequest().getParameter("boardNo");
		        if (url.lastIndexOf(".json") == -1) {
			        url = url.replaceAll("/int/", "/");
			        url = url.replaceAll("//", "/");
			        if (param != null) {
			        	url = url + "?boardNo=" + param;
			        }
			        if (roleService.isPermitResource(roles, url)) 
			        	result = ACCESS_GRANTED;
		        }
			}
		}
		return result;
	}
	
	private boolean isGrant(String screenId) {
    	boolean retValue = false;
    	if (grantScreens != null && !grantScreens.isEmpty()) {
	    	for (String grantScreenId : grantScreens) {
	    		if (grantScreenId.equalsIgnoreCase(screenId)) {
		    		retValue = true;
		    		break;
	    		}
	    	}
    	}
	    return retValue;
    }
    public void setGrantScreens(List<String> grantScreens) {
		this.grantScreens = grantScreens;
	}

}
