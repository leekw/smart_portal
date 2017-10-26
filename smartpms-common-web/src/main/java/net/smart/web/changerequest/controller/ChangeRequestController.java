package net.smart.web.changerequest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.annotation.IntegrationResponse;
import net.smart.web.changerequest.service.ChangeRequestService;
import net.smart.web.domain.changerequest.ChangeRequestComboInfo;
import net.smart.web.domain.changerequest.ChangeRequestItem;
import net.smart.web.domain.changerequest.ChangeRequestJira;
import net.smart.web.domain.changerequest.ChangeRequestLog;
import net.smart.web.domain.changerequest.ChangeRequestTarget;
import net.smart.web.domain.changerequest.ChangeRequestVolume;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ChangeRequestController {
	
	@Autowired
	private ChangeRequestService changeRequestService;
	
	@RequestMapping(value = "/changerequest/target/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="data")
	public Map<String, Object> getChangeRequestTargetList(@IntegrationRequest ChangeRequestItem param) {
		Map<String, Object> result = new HashMap<String, Object>();
		List<ChangeRequestItem> temps = changeRequestService.getChangeRequestTartgetList(param);
		if (temps != null && !temps.isEmpty()) {
			result.put("targets", temps);
			result.put("total", temps.get(0).getTotal());
		}
		return result;
	}
	
	@RequestMapping(value = "/changerequest/repository/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="combos")
	public List<ChangeRequestComboInfo> getRepositoryComboList(@IntegrationRequest ChangeRequestComboInfo param) {
		return changeRequestService.getRepositoryComboList(param);
	}
	
	
	@RequestMapping(value = "/changerequest/jira/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="combos")
	public List<ChangeRequestComboInfo> getJiraComboList(@IntegrationRequest ChangeRequestComboInfo param) {
		return changeRequestService.getJiraComboList(param);
	}
	
	@RequestMapping(value = "/changerequest/file/modify.{metadataType}", method = RequestMethod.POST)
	public void modifyChangeRequestJira(@IntegrationRequest List<ChangeRequestItem> params) {
		changeRequestService.modifyChangeRequestJira(params);
	}
	
	@RequestMapping(value = "/changerequest/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="crs")
	public List<ChangeRequestJira> getChangeRequestJiraList(@IntegrationRequest ChangeRequestJira param) {
		return changeRequestService.getChangeRequestJiraList(param);
	}
	
	@RequestMapping(value = "/changerequest/programlist/jira/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="programs")
	public List<ChangeRequestTarget> getProgramListByJiraId(@IntegrationRequest ChangeRequestTarget param) {
		return changeRequestService.getProgramListByJiraId(param);
	}
	
	@RequestMapping(value = "/changerequest/programlist/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="data")
	public Map<String, Object> getSourceProgramList(@IntegrationRequest ChangeRequestTarget param) {
		Map<String, Object> result = new HashMap<String, Object>();
		List<ChangeRequestTarget> temps = changeRequestService.getSourceProgramList(param);
		if (temps != null && !temps.isEmpty()) {
			result.put("programs", temps);
			result.put("total", temps.get(0).getTotal());
		}
		return result;
	}
	
	@RequestMapping(value = "/changerequest/add.{metadataType}", method = RequestMethod.POST)
	public void addChangeRequest(@IntegrationRequest ChangeRequestJira param) {
		changeRequestService.addChangeRequest(param);
	}
	
	@RequestMapping(value = "/changerequest/file/validate.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="crs")
	public void validateChangeRequestJiraFile(@IntegrationRequest ChangeRequestJira param) {
		changeRequestService.validateChangeRequestJiraFile(param);
	}
	
	@RequestMapping(value = "/changerequest/verify/summary/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="logs")
	public List<ChangeRequestLog> getChangeRequestLogSummary(@IntegrationRequest ChangeRequestLog param) {
		return changeRequestService.getChangeRequestLogSummary(param);
	}
	
	@RequestMapping(value = "/changerequest/summary/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="summarys")
	public List<ChangeRequestLog> getChangeRequestSummary(@IntegrationRequest ChangeRequestLog param) {
		return changeRequestService.getChangeRequestSummary(param);
	}
	
	@RequestMapping(value = "/changerequest/volume/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="volumes")
	public List<ChangeRequestVolume> getChangeRequestVolumeList(@IntegrationRequest ChangeRequestVolume param) {
		return changeRequestService.getChangeRequestVolumeList(param);
	}
}
