package net.smart.web.management.controller;

import java.util.List;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.annotation.IntegrationResponse;
import net.smart.web.domain.management.DeliverablesLog;
import net.smart.web.domain.management.MetaInfo;
import net.smart.web.management.service.ManagementService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ManagementController {
	
	@Autowired
	@Qualifier("projectManagementService")
	private ManagementService managementService;
	
	@RequestMapping(value = "/dlog/detail/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="details")
	public List<DeliverablesLog> getDeliverablesLogList(@IntegrationRequest DeliverablesLog param) {
		return managementService.getDeliverablesLogList(param);
	}
	
	@RequestMapping(value = "/meta/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="metas")
	public List<MetaInfo> getMetaList(@IntegrationRequest MetaInfo param) {
		return managementService.getMetaList(param);
	}

}
