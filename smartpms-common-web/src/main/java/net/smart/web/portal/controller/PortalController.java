package net.smart.web.portal.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.annotation.IntegrationResponse;
import net.smart.common.service.SmartCommonService;
import net.smart.common.support.util.DateUtil;
import net.smart.common.support.util.IntegrationHttpSessionCollector;
import net.smart.web.domain.portal.PortalData;
import net.smart.web.domain.portal.PortalInfo;
import net.smart.web.jira.service.JiraService;
import net.smart.web.portal.service.PortalService;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class PortalController {
	
	@Autowired
	private PortalService portalService;
	
//	@Autowired
	private JiraService jiraService;
	
	@Autowired
	private SimpMessagingTemplate template;
	
	@Autowired
	private SmartCommonService integrationCommonService;
	
	@RequestMapping(value = "/project/status/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="status")
	public PortalInfo getPortalInfo(@IntegrationRequest PortalInfo param, HttpServletRequest request) {
		PortalInfo result = portalService.getPortalProjectStatus();
		String isAdmin = "";
		String ip = request.getHeader("X-FORWARDED-FOR");
		if (ip == null || ip.length() == 0) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0) {
			ip = request.getRemoteAddr();
		}
		isAdmin = jiraService.isJiraAdmin(ip) ? "Y" : "N";
		result.setIsAdmin(isAdmin);

		return result;
	}
	
	@RequestMapping(value = "/project/status/modify.{metadataType}", method = RequestMethod.POST)
	public void modifyPortalProjectStatus(@IntegrationRequest PortalInfo param) {
		portalService.modifyPortalProjectStatus(param);
		template.convertAndSend("/topic/portal/status", param);
	}

	@RequestMapping(value = "/connuser/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="datas")
	public List<PortalData> getConnectionUserList(@IntegrationRequest PortalData param) {
		return portalService.getConnectionUserList(param);
	}
	
	@RequestMapping(value = "/bizprocess/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="datas")
	public List<PortalData> getBizProcessList(@IntegrationRequest PortalData param) {
		return portalService.getBizProcessList(param);
	}
	
	@RequestMapping(value = "/question/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="datas")
	public List<PortalData> getQuestionList(@IntegrationRequest PortalData param) {
		return portalService.getQuestionList(param);
	}
	
	@RequestMapping(value = "/wfm/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="datas")
	public List<PortalData> getWfmList(@IntegrationRequest PortalData param) {
		return portalService.getWfmList(param);
	}
	
	@RequestMapping(value = "/itsm/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="datas")
	public List<PortalData> getItsmList(@IntegrationRequest PortalData param) {
		return portalService.getItsmList(param);
	}
	
	@RequestMapping(value = "/helf/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="datas")
	public List<PortalData> getHelfList(@IntegrationRequest PortalData param) {
		return portalService.getHelfList(param);
	}
	
	
	@RequestMapping(value = "/connuser/chart/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="datas")
	public List<PortalData> getConnectionUserChartData(@IntegrationRequest PortalData param) {
		//return portalService.getConnectionUserChartData(param);
		param.setType("conn");
		if (param.getDay() == null) {
			param.setDay(DateUtil.getNowByFormat(DateUtil.Format.YYYYMMDD.getValue()));
		}
		return portalService.getPortalStatisticChartDataByDaily(param);
	}
	
	@RequestMapping(value = "/compare/chart/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="datas")
	public List<PortalData> getCompareChartData(@IntegrationRequest PortalData param) {
		List<PortalData> result = new ArrayList<PortalData>();
		if (param.getDay() == null) {
			param.setDay(DateUtil.getNowByFormat(DateUtil.Format.YYYYMMDD.getValue()));
		}
		param.setHours(DateUtil.getDateByFormat(DateUtil.getNow(), DateUtil.Format.HH.getValue()) + "시");
		List<PortalData> temps = portalService.getPortalStatisticChartDataByDaily(param);
		PortalData today = new PortalData();
		PortalData yesterday = new PortalData();
		for (PortalData obj : temps) {
			if (today.getDay() == null) {
				BeanUtils.copyProperties(obj, today);
				BeanUtils.copyProperties(obj, yesterday);
				yesterday.setData1(obj.getData2());
			} else {
				today.setData1(today.getData1() + obj.getData1());
				yesterday.setData1(yesterday.getData1() + obj.getData2());
			}
		}
		today.setLabel("오늘");
		yesterday.setLabel("어제");
		today.setDataRatio(yesterday.getData1() == 0 && today.getData1()==0 ? 0 : (double)today.getData1()/(double)(yesterday.getData1()+today.getData1()) * 100);
		yesterday.setDataRatio(yesterday.getData1() == 0 && today.getData1()==0 ? 0 : (double)yesterday.getData1()/(double)(yesterday.getData1()+today.getData1())  * 100);
		result.add(today);
		result.add(yesterday);
		return result;
	}
	
	@RequestMapping(value = "/connuser/save.{metadataType}", method = RequestMethod.POST)
	public void saveConnectionUser(@IntegrationRequest List<PortalData> params) {
		portalService.saveConnectionUser(params);
		PortalData data = new PortalData();
		data.setAction("conn");
		data.setChart("conn-user-chart");
		template.convertAndSend("/topic/portal/reload", data);
	}
	
	@RequestMapping(value = "/bizprocess/save.{metadataType}", method = RequestMethod.POST)
	public void saveBizProcess(@IntegrationRequest List<PortalData> params) {
		portalService.saveBizProcess(params);
		PortalData data = new PortalData();
		data.setAction("biz");
		data.setChart("biz-proc-chart");
		template.convertAndSend("/topic/portal/reload", data);
	}
	
	@RequestMapping(value = "/question/save.{metadataType}", method = RequestMethod.POST)
	public void saveQuestion(@IntegrationRequest List<PortalData> params) {
		portalService.saveQuestion(params);
		PortalData data = new PortalData();
		data.setAction("que");
		data.setChart("question-chart");
		template.convertAndSend("/topic/portal/reload", data);
	}
	
	@RequestMapping(value = "/wfm/save.{metadataType}", method = RequestMethod.POST)
	public void saveWfm(@IntegrationRequest List<PortalData> params) {
		portalService.saveWfm(params);
		PortalData data = new PortalData();
		data.setAction("wfm");
		data.setChart("question-chart");
		template.convertAndSend("/topic/portal/reload", data);
	}
	
	@RequestMapping(value = "/itsm/save.{metadataType}", method = RequestMethod.POST)
	public void saveItsm(@IntegrationRequest List<PortalData> params) {
		portalService.saveItsm(params);
		PortalData data = new PortalData();
		data.setAction("itsm");
		data.setChart("question-chart");
		template.convertAndSend("/topic/portal/reload", data);
	}
	
	@RequestMapping(value = "/helf/save.{metadataType}", method = RequestMethod.POST)
	public void saveHelf(@IntegrationRequest List<PortalData> params) {
		portalService.saveHelf(params);
		PortalData data = new PortalData();
		data.setAction("helf");
		data.setChart("question-chart");
		template.convertAndSend("/topic/portal/reload", data);
	}
	
	@RequestMapping(value = "/bizprocess/chart/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="datas")
	public List<PortalData> getBizProcessChartData(@IntegrationRequest PortalData param) {
		//return portalService.getBizProcessChartData(param);
		param.setType("biz");
		if (param.getDay() == null) {
			param.setDay(DateUtil.getNowByFormat(DateUtil.Format.YYYYMMDD.getValue()));
		}
		return portalService.getPortalStatisticChartDataByDaily(param);
	}
	
	@RequestMapping(value = "/jira/chart/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="datas")
	public List<PortalData> getJiraChartData(@IntegrationRequest PortalData param) {
		if (param.getDay() == null) {
			param.setDay(DateUtil.getNowByFormat(DateUtil.Format.YYYYMMDD.getValue()));
		}
		return portalService.getJiraChartByDaily(param);
	}
	
	@RequestMapping(value = "/issue/chart/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="datas")
	public List<PortalData> getOpenIssueChartData(@IntegrationRequest PortalData param) {
		return portalService.getOpenIssueChartData(param);
	}
	
	@RequestMapping(value = "/question/chart/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="datas")
	public List<PortalData> getQuestionChartData(@IntegrationRequest PortalData param) {
		return portalService.getQuestionChartData(param);
	}
	
	@RequestMapping(value = "/open/issue/level/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="datas")
	public List<PortalData> getOpenIssueLevel(@IntegrationRequest PortalData param) {
		return portalService.getPortalOpenIssueLevel(new PortalInfo());
	}
	
	@RequestMapping(value = "/open/issue/channel/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="datas")
	public List<PortalData> getOpenIssueChannel(@IntegrationRequest PortalData param) {
		return portalService.getPortalOpenIssueChannel(new PortalInfo());
	}
	
	@RequestMapping(value = "/connection/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="info")
	public PortalInfo getConnectionInfo() {
		Map<String, HttpSession> sessions = IntegrationHttpSessionCollector.getConnectionSession();
		int limit = integrationCommonService.getLimitCount();
		PortalInfo info = new PortalInfo();
		info.setLimitConnectionCount(limit);
		info.setCurrentConnectionCount(sessions != null ? sessions.size() : 0);
		return info;
	}
	
	@RequestMapping(value = "/open/issue/chart/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="datas")
	public List<PortalData> getOpenIssueChart(@IntegrationRequest PortalData param) {
		return portalService.getOpenJiraOriginationChart();
	}
}
