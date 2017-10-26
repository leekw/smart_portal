package net.smart.web.jira.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.annotation.IntegrationResponse;
import net.smart.common.exception.IntegrationException;
import net.smart.common.support.constant.BizCode;
import net.smart.common.support.util.DateUtil;
import net.smart.web.domain.jira.Cutover;
import net.smart.web.domain.jira.CutoverDashboard;
import net.smart.web.domain.jira.CutoverDetail;
import net.smart.web.domain.jira.CutoverMain;
import net.smart.web.domain.jira.GanttInfo;
import net.smart.web.jira.service.JiraConfig;
import net.smart.web.jira.service.JiraService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class CutoverController {
	
//	@Autowired
	private JiraService jiraService;
	
//	@Autowired
	private JiraConfig jiraConfig;

	@RequestMapping(value = "/cutover/search/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="tasks")
	public List<Cutover> getCutoverSearchList(@IntegrationRequest Cutover param) {
		return jiraService.getCutoverSearchList(param);
	}
	
	@RequestMapping(value = "/cutover/detail/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="tasks")
	public List<CutoverDetail> getCutoverDetailList(@IntegrationRequest CutoverDetail param) {
		return jiraService.getCutorvetDetailList(param);
	}
	
	@RequestMapping(value = "/cutover/detail/save.{metadataType}", method = RequestMethod.POST)
	public void saveCutoverDetail(@IntegrationRequest List<CutoverDetail> params) {
		jiraService.saveCutoverDetail(params);
	}
	
	@RequestMapping(value = "/cutover/save.{metadataType}", method = RequestMethod.POST)
	public void saveCutover(@IntegrationRequest List<Cutover> params) {
		jiraService.saveCutover(params);
	}
	
	@RequestMapping(value = "/cutover/sort/modify.{metadataType}", method = RequestMethod.POST)
	public void modifyCutoverSort(@IntegrationRequest List<Cutover> params) {
		jiraService.modifyCutoverSort(params);
	}
	
	@RequestMapping(value = "/cutover/status/modify.{metadataType}", method = RequestMethod.POST)
	public void modifyCutoverStatus(@IntegrationRequest List<Cutover> params) {
		jiraService.modifyCutoverStatus(params);
	}
	
	@RequestMapping(value = "/cutover/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="tasks")
	public List<Cutover> getCutoverList(@IntegrationRequest Cutover param) {
		return jiraService.getCutoverListByAll(param);
	}
	
	@RequestMapping(value = "/cutover/jira/sync.{metadataType}", method = RequestMethod.POST)
	public void syncCutoverJira(@IntegrationRequest List<Cutover> params) {
		jiraService.syncCutoverJira(params);
	}
	
	@RequestMapping(value = "/cutover/prejob/modify.{metadataType}", method = RequestMethod.POST)
	public void modifyTaskPreJob(@IntegrationRequest Cutover param) {
		jiraService.modifyCutoverPreJob(param);
	}
	
	@RequestMapping(value = "/cutover/gantt/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="gantt")
	public GanttInfo getCutoverGanttData(@IntegrationRequest Cutover param) {
		return jiraService.getGantData(param);
	}
	
	@RequestMapping(value = "/cutover/dashboard/info/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="info")
	public CutoverDashboard getCutoverDashboardInfo(@IntegrationRequest CutoverDashboard param) {
		return jiraService.getCutoverDashboardInfo(param);
	}
	
	@RequestMapping(value = "/cutover/dashboard/chart/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="info")
	public List<CutoverDashboard> getCutoverDashboardChartInfo(@IntegrationRequest CutoverDashboard param) {
		return jiraService.getCutoverDashboardChartInfo(param);
	}
	
	@RequestMapping(value = "/cutover/dashboard/status/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="info")
	public CutoverDashboard getCutoverDashboardStatus(@IntegrationRequest CutoverDashboard param) {
		param.setyCategory(param.getyCategory() == null ? jiraConfig.getCategory() : param.getyCategory());
		return jiraService.getCutoverDashboardInfo(param);
	}
	
	@RequestMapping(value = "/cutover/main/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="info")
	public List<CutoverMain> getCutoverMainList(@IntegrationRequest CutoverDashboard param) {
		return jiraService.getCutoverMainList(param);
	}
	
	@RequestMapping(value = "/cutover/main/assignready/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="info")
	public List<CutoverMain> getCutoverMainAssignReadyList(@IntegrationRequest CutoverDashboard param) {
		param.setMode("할당10");
		return jiraService.getCutoverMainList(param);
	}
	
	@RequestMapping(value = "/cutover/task/assign.{metadataType}", method = RequestMethod.POST)
	public void assignCutoverTask(@IntegrationRequest List<Cutover> params) {
		jiraService.assignCutoverTask(params);
	}
	
	
	private String getParamValue(HttpServletRequest request, String key) {
		String param = request.getParameter(key);
		return param == null || "".equals(param) || "null".equals(param) ? null : request.getParameter(key);
	}
	private List<String> getParamValues(HttpServletRequest request, String key) {
		List<String> result = new ArrayList<String>();
		String param = request.getParameter(key);
		if (param == null || "".equals(param) || "null".equals(param)) {
			result = null;
		} else {
			for (String temp : param.split(",")) {
				result.add(temp);
			}
		}
		return result;
	}
	@RequestMapping(value = "/cutover/excel/download.{metadataType}", method = RequestMethod.GET)
	public ModelAndView fileDownload(@PathVariable("metadataType") String metadataType,
			HttpServletRequest request, HttpServletResponse response, ModelAndView modelAndView) {
		modelAndView.setViewName("fileDownload");
		Cutover param = new Cutover();
		param.setCutoverTh(this.getParamValue(request, "cutoverTh"));
		param.setJobStep(this.getParamValue(request,"jobStep"));
		param.setJobType(this.getParamValue(request,"jobType"));
		param.setTeams(this.getParamValues(request,"jobExecutionTeam"));
		param.setSystems(this.getParamValues(request,"systemType"));
		param.setyCategory(this.getParamValue(request,"yCategory"));
		String filePath = jiraService.getSaveExcelFile(param);
		String fileName = "cutover_task_" + DateUtil.getNowByFormat(DateUtil.Format.YYYYMMDDHHMISS.getValue()) + ".xls";
		if (filePath == null) {
			throw new IntegrationException("ERROR.0001", "엑셀 파일 생성중 오류가 발생되었습니다.");
		}
		File file = new File(filePath);
		if (!file.exists()) throw new IntegrationException("ERROR.0001", "엑셀 파일 생성중 오류가 발생되었습니다.");

		Map<String, Object> data = new HashMap<String, Object>();
		data.put("downloadFile", file);
		data.put("fileName", fileName);
		data.put("metadataType", metadataType);
		modelAndView.addObject(BizCode.RequestKey.PARAM_KEY.getValue(), data);
		return modelAndView;
	}
}
