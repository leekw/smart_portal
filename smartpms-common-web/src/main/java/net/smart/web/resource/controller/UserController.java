package net.smart.web.resource.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.annotation.IntegrationResponse;
import net.smart.web.domain.UserInfo;
import net.smart.web.resource.service.ResourceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class UserController {
	
	@Autowired
	private ResourceService resourceService;
	
	@RequestMapping(value = "/user/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="data")
	public Map<String, Object> getUserInfoList(@IntegrationRequest UserInfo param) {
		Map<String, Object> result = new HashMap<String, Object>();
		List<UserInfo> users = resourceService.getUserInfoList(param);
		if (users != null && !users.isEmpty()) {
			result.put("users", users);
			result.put("total", users.get(0).getTotal());
		}
		return result;
	}
	
	@RequestMapping(value = "/user/role/modify.{metadataType}", method = RequestMethod.POST)
	public void modifyUserRoles(@IntegrationRequest UserInfo param) {
		resourceService.modifyUserRoles(param);
	}
	
	@RequestMapping(value = "/user/access/modify.{metadataType}", method = RequestMethod.POST)
	public void modifyAccessUserInfo(@IntegrationRequest UserInfo param) {
		resourceService.modifyAccessUserInfo(param);
	}
}
