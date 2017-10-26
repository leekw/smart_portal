package net.smart.common.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.annotation.IntegrationResponse;
import net.smart.common.domain.based.BasedFile;
import net.smart.common.domain.based.BasedOrg;
import net.smart.common.domain.based.BasedResource;
import net.smart.common.domain.based.BasedRole;
import net.smart.common.domain.based.BasedUser;
import net.smart.common.service.SmartCommonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/based/res/**")
public class BasedResourceController extends AbstractPageController {
	
	@Autowired
	private SmartCommonService smartCommonService;
	
	
	
	@RequestMapping(value = "/info/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="info")
	public BasedResource getResource(@IntegrationRequest BasedResource param) {
		BasedResource result = new BasedResource();
		List<BasedResource> temps =  smartCommonService.getResourceList(param);
		if (temps != null && !temps.isEmpty()) {
			result = temps.get(0);
		}
		return result;
	}
	
	@RequestMapping(value = "/org/tree/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="orgs")
	public List<BasedOrg> getOrgTrees(@IntegrationRequest BasedOrg param) {
		return smartCommonService.getOrgTrees(param);
	}
	
	@RequestMapping(value = "/user/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="user")
	public BasedUser getUser(@IntegrationRequest BasedUser param) {
		return smartCommonService.getUser(param);
	}
	
	@RequestMapping(value = "/user/reg.{metadataType}", method = RequestMethod.POST)
	public void regUser(@IntegrationRequest BasedUser param) {
		smartCommonService.regUser(param);
	}
	
	@RequestMapping(value = "/user/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="data")
	public Map<String, Object> getUserList(@IntegrationRequest BasedUser param) {
		Map<String, Object> result = new HashMap<String, Object>();
		List<BasedUser> users = smartCommonService.getUserList(param);
		if (users != null && !users.isEmpty()) {
			result.put("users", users);
			result.put("total", users.get(0).getTotal());
		}
		return result;
	}
	
	@RequestMapping(value = "/file/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="files")
	public List<BasedFile> getCommonFileList(@IntegrationRequest BasedFile param) {
		if (param.getResourceId() != null && !"".equals(param.getResourceId())) {
			param.setTargetId(param.getResourceId());
			param.setRelationType("MENU");
		} else {
			param.setTargetId(param.getBoardNo() + ":" + param.getBoardId());
			param.setRelationType("BOARD");
		}
		return smartCommonService.getCommonFileList(param);
	}
	
	@IntegrationResponse(key="data")
	@RequestMapping(value="/org/user/list/get.{metadataType}", method = RequestMethod.POST)
	public Map<String, Object> getOrgUserList(@IntegrationRequest BasedUser param) {
		Map<String, Object> result = new HashMap<String, Object>();
		List<BasedUser> users = smartCommonService.getOrgUserList(param);
		if (users != null && !users.isEmpty()) {
			result.put("users", users);
			result.put("total", users.get(0).getTotal());
		}
		return result;
	}
	
	@IntegrationResponse(key="roles")
	@RequestMapping(value="/org/role/list/get.{metadataType}", method = RequestMethod.POST)
	public List<BasedRole> getOrgRoleList(@IntegrationRequest BasedRole param) {
		return smartCommonService.getOrgRoleList(param);
	}

}
