package net.smart.web.resource.controller;

import java.util.List;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.annotation.IntegrationResponse;
import net.smart.web.domain.Org;
import net.smart.web.resource.service.OrgService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class OrgController {
	
	@Autowired
	private OrgService orgService;
	
	@RequestMapping(value = "/org/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="orgs")
	public List<Org> getOrgList(@IntegrationRequest Org param) {
		return orgService.getOrgList(param);
	}

}
