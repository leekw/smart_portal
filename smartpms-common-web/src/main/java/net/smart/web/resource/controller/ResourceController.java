package net.smart.web.resource.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpSession;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.annotation.IntegrationResponse;
import net.smart.common.domain.IntUser;
import net.smart.common.domain.based.SessionUser;
import net.smart.common.exception.IntegrationException;
import net.smart.common.service.RoleService;
import net.smart.common.service.SmartCommonService;
import net.smart.common.support.comparator.SessionComparator;
import net.smart.common.support.constant.ErrorCode;
import net.smart.common.support.util.DateUtil;
import net.smart.common.support.util.IntegrationHttpSessionCollector;
import net.smart.web.domain.portal.PortalInfo;
import net.smart.web.domain.resource.RegUser;
import net.smart.web.domain.resource.Resource;
import net.smart.web.domain.resource.ResourceRole;
import net.smart.web.portal.service.PortalService;
import net.smart.web.resource.service.ResourceService;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/resource/**")
public class ResourceController {
	
	@Autowired
	private ResourceService resourceService;
	
	@Autowired
	private RoleService roleService;
	
	@Autowired
	private PortalService portalSercice;
	
	@Autowired
	private SmartCommonService integrationCommonService;
	
	@Autowired
	private SessionRegistry sessionRegistry;
	
	@RequestMapping(value = "/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="resources")
	public List<Resource> getResourceList(@IntegrationRequest Resource resource) {
		PortalInfo info = portalSercice.getPortalProjectStatus();
		resource.setRoles(this.getSessionRole());
		List<Resource> temps =  resourceService.getResourceList(resource);
		List<Resource> results = new ArrayList<Resource>();
		for (Resource result : temps) {
			if (resource.getViewType() == null && !integrationCommonService.isSuperAmin()) {
				if (resource.getAdminYn() == null || !"Y".equals(resource.getAdminYn()))
					if (!roleService.isPermitResource(this.getSessionRole(), this.getResourceKey(result))) continue;
			}
			
			if (info.getMainResorceId() != null 
					&& info.getMainResorceId().equals(result.getResourceId())) {
				result.setMainResourceYn("Y");
				result.setMainResource(true);
			} else {
				result.setMainResource(false);
				result.setMainResourceYn("N");
			}
			results.add(result);
		}
		return results;
	}
	
	@RequestMapping(value = "/info/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="info")
	public Resource getResource(@IntegrationRequest Resource resource) {
		Resource result = new Resource();
		List<Resource> temps =  resourceService.getResourceList(resource);
		if (temps != null && !temps.isEmpty()) {
			result = temps.get(0);
		}
		return result;
	}
	
	private String getResourceKey(Resource param) {
		if (param.getResourceTypeCode().equals("MENU")
				|| param.getResourceTypeCode().equals("IMAGE")) {
			return param.getResourceId();
		} else if(param.getResourceTypeCode().equals("PAGE")) {
			return param.getUrl();
		} else if (param.getResourceTypeCode().equals("CONTENT")) {
			return param.getUrl();
		}
		return null;
	}
	
	private List<String> getSessionRole() {
		SecurityContext securityContext = SecurityContextHolder.getContext();
		if (securityContext != null ) {
			Authentication authentication = securityContext.getAuthentication();
			if (authentication != null) {
				List<String> roles=  new ArrayList<String>();
				for (GrantedAuthority role : authentication.getAuthorities()) {
					roles.add(role.getAuthority());
				}
				return roles;
			}
		}
		return null;
	}
	
	@RequestMapping(value = "/add.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="resource")
	public Resource addResource(@IntegrationRequest Resource param) {
		Resource result = new Resource();
		if (param.getParentResourceId() == null)
			param.setParentResourceId("TOP");
		param.setResourceId("RE_" + System.currentTimeMillis());
		if (param.getUrl() != null && param.getUrl().equals("")) 
			param.setUrl(null);
		if (param.getResourceContent() != null && param.getResourceContent().equals(""))
			param.setResourceContent(null);
		resourceService.addResource(param);
		BeanUtils.copyProperties(param, result);
		return result;
	}
	
	
	@RequestMapping(value = "/list/remove.{metadataType}", method = RequestMethod.POST)
	public void removeResourceList(@IntegrationRequest List<Resource> param) {
		resourceService.removeResource(param);
	}
	
	@RequestMapping(value = "/remove.{metadataType}", method = RequestMethod.POST)
	public void removeResource(@IntegrationRequest Resource param) {
		resourceService.removeResource(param);
	}
	
	@RequestMapping(value = "/modify.{metadataType}", method = RequestMethod.POST)
	public void modifyResource(@IntegrationRequest List<Resource> params) {
		resourceService.modifyResource(params);
	}
	
	@RequestMapping(value = "/role/add.{metadataType}", method = RequestMethod.POST)
	public void addResourceRole(@IntegrationRequest ResourceRole param) {
		if (param.getIncludeYn() == null) {
			param.setIncludeYn("Y");
		}
		List<ResourceRole> temps = resourceService.getResourceRoleList(param);
		if (temps.size() > 0) {
			throw new IntegrationException("ERROR.0001", "이미 등록된 리소스 입니다.");
		}
		resourceService.addResourceRole(param);
	}
	
	@RequestMapping(value = "/role/remove.{metadataType}", method = RequestMethod.POST)
	public void removeResourceRole(@IntegrationRequest List<ResourceRole> params) {
		resourceService.removeResourceRole(params);
	}
	
	@RequestMapping(value = "/role/modify.{metadataType}", method = RequestMethod.POST)
	public void modifyResourceRole(@IntegrationRequest ResourceRole param) {
		resourceService.modifyResourceRole(param);
	}
	
	@RequestMapping(value = "/content/modify.{metadataType}", method = RequestMethod.POST)
	public void modifyResourceContent(@IntegrationRequest Resource param) {
		resourceService.modifyResourceByContent(param);
		if (param.getMainResourceYn() != null && "Y".equals(param.getMainResourceYn())) {
			PortalInfo info = new PortalInfo();
			info.setMainResorceId(param.getResourceId());
			portalSercice.modifyPortalProjectStatusByMainResource(info);
		}
	}
	
	@RequestMapping(value = "/check/modify.{metadataType}", method = RequestMethod.POST)
	public void checkModifyResource(@IntegrationRequest Resource param) {
		boolean checked = resourceService.getVaildModifyMenu(param.getResourceId());
		String name = resourceService.getLockMenuByUserName(param.getResourceId());
		if (!checked) {
			throw new IntegrationException(ErrorCode.SYSTEM_ERROR.getValue(), "해당 메뉴는 " + name + "이(가) 수정하고 있습니다.");
		}
	}
	
	@RequestMapping(value = "/complete/modify.{metadataType}", method = RequestMethod.POST)
	public void completeModifyResource(@IntegrationRequest Resource param) {
		resourceService.modifyCompleteMenu(param.getResourceId());
	}
	
	@RequestMapping(value = "/role/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="resources")
	public List<ResourceRole> getResourceRoleList(@IntegrationRequest ResourceRole param) {
		return resourceService.getResourceRoleList(param);
	}
	
	@RequestMapping(value = "/session/user/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="users")
	public List<IntUser> getSessionUserList() {
		List<IntUser> results = new ArrayList<IntUser>();
		Map<String, HttpSession> sessions = IntegrationHttpSessionCollector.getConnectionSession();
		List<HttpSession> expireSessionList = new ArrayList<HttpSession>();
		int index = 0;
		Iterator<Entry<String, HttpSession>> ie = sessions.entrySet().iterator();
		while(ie.hasNext()) {
			Entry<String, HttpSession> e = ie.next();
			HttpSession session = e.getValue();
			IntUser user = (IntUser) session.getAttribute("SAVED_USER");
			if (user == null) {
				expireSessionList.add(session);
				continue;
			}
			user.setRowId(++index);
			user.setSessionId(session.getId());
			user.setLastActionDateByStr(DateUtil.getDateByFormat(user.getLastActionDate(), DateUtil.Format.YYYY_MM_DD_HH_MI_SS.getValue()));
			results.add(user);
		}
		Collections.sort(results, new SessionComparator());
		return results;
	}
	
	@RequestMapping(value = "/session/invalid.{metadataType}", method = RequestMethod.POST)
	public void invalidSessions(@IntegrationRequest List<SessionUser> params) {
		Map<String, HttpSession> sessions = IntegrationHttpSessionCollector.getConnectionSession();
		Map<String, SessionInformation> sessionData = new HashMap<String, SessionInformation>();
		List<Object> principals = sessionRegistry.getAllPrincipals();
		for (Object obj : principals) {
			for (SessionInformation ss : sessionRegistry.getAllSessions(obj, false)) {
				sessionData.put(ss.getSessionId(), ss);
			}
		}
		for (SessionUser param : params) {
			HttpSession session = sessions.get(param.getSessionId());
			if (session != null) {
				session.invalidate();
			}
			SessionInformation si = sessionData.get(param.getSessionId());
			si.expireNow();
		}
	}
	
	@RequestMapping(value = "/service/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="resources")
	public List<Resource> getMenuServiceList(@IntegrationRequest Resource param) {
		return resourceService.getMenuServiceList(param);
	}
	
	@RequestMapping(value = "/user/vaild.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="vaildInfo")
	public RegUser vaildUser(@IntegrationRequest RegUser param) {
		return resourceService.getRegUser(param);
	}
}
