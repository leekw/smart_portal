package net.smart.web.jira.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.annotation.IntegrationResponse;
import net.smart.common.exception.BizException;
import net.smart.common.support.constant.BizCode;
import net.smart.common.support.util.DateUtil;
import net.smart.web.domain.CommonCode;
import net.smart.web.domain.jira.Cutover;
import net.smart.web.domain.jira.JiraInfo;
import net.smart.web.domain.jira.ServiceRequest;
import net.smart.web.jira.filter.JiraDataFilter;
import net.smart.web.jira.service.JiraService;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;


@Controller
@RequestMapping("/jira/**")
public class JiraController {
	
//	@Autowired
	private JiraService jiraService;
	
	@Autowired
	private List<JiraDataFilter> filters;
	
	
	@RequestMapping(value = "/cutover/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="cutovers")
	public List<Cutover> getCutoverList(@IntegrationRequest Cutover cutover) {
		List<Cutover> results = new ArrayList<Cutover>();
		List<Cutover> sources = jiraService.getCutoverList(cutover);
		getJsonObjByTaskList(sources, cutover.getFilterType(), results);
		return results;
	}
	
	
	@RequestMapping(value = "/jira/cutover/th/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="codes")
	public List<CommonCode> getCutoverThGroup() {
		return jiraService.getCutoverThGroup();
	}
	
	@RequestMapping(value = "/jira/transition/step/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="codes")
	public List<CommonCode> getTransitionStep() {
		return jiraService.getTransitionStep();
	}
	
	@RequestMapping(value = "/info/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="jiraInfo")
	public JiraInfo getJiraInfo() {
		return jiraService.getJiraInfo();
	}
	
	@RequestMapping(value = "/sync/process.{metadataType}", method = RequestMethod.POST)
	public void processSyncJiraData(@IntegrationRequest Cutover cutover) {
		jiraService.processJiraSyncData(cutover);
	}
	
	
	@RequestMapping(value = "/sr/excel/download.{metadataType}", method = RequestMethod.GET)
	public ModelAndView downloadServiceRequestByExcel(@PathVariable("metadataType") String metadataType,
			HttpServletRequest request, HttpServletResponse response, ModelAndView modelAndView) {
		modelAndView.setViewName("fileDownload");
		ServiceRequest param = new ServiceRequest();
		param.setProject(request.getParameter("project"));
		param.setIssueTypeId(Long.parseLong(request.getParameter("issueTypeId")));
		param.setIssueTypeName(request.getParameter("issueTypeName"));
		String filePath = jiraService.processServiceRequestByExcel(param);
		String fileName = param.getProject() + "_" + param.getIssueTypeName() + "_" + DateUtil.getNowByFormat(DateUtil.Format.YYYYMMDDHHMISS.getValue()) + ".xls";
		if (filePath == null) {
			throw new BizException("ERROR.0001", "엑셀 파일 생성중 오류가 발생되었습니다.");
		}
		File file = new File(filePath);
		if (!file.exists()) throw new BizException("ERROR.0001", "엑셀 파일 생성중 오류가 발생되었습니다.");

		Map<String, Object> data = new HashMap<String, Object>();
		data.put("downloadFile", file);
		data.put("fileName", fileName);
		data.put("metadataType", metadataType);
		modelAndView.addObject(BizCode.RequestKey.PARAM_KEY.getValue(), data);
		return modelAndView;
		
	}
	
	@RequestMapping(value = "/cutover/data/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="jiraData")
	public Map<String, Object> getCutoverData(@IntegrationRequest Cutover cutover, HttpServletRequest request) {
		HashMap<String, Object> rtnResult = new HashMap<String, Object>();
		
		List<Cutover> list = jiraService.getCutoverList(cutover);
		HashMap<String, Object> objects = getJsonObjByTaskList(list, cutover.getFilterType(), null);
		JSONObject jsonObj = (JSONObject) objects.get("jsonData");
		HashMap<String, String> statInfo = (HashMap<String, String>) objects.get("statInfo");
		String teamKind = (String) ((HashMap<String,Object>) objects).get("teamKind");
		String sysKind = (String) ((HashMap<String,Object>) objects).get("sysKind");
		
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


		rtnResult.put("jsonData", jsonObj.toJSONString());
		rtnResult.put("statInfo", statInfo);
		rtnResult.put("teamKind", teamKind);
		rtnResult.put("sysKind", sysKind);
		rtnResult.put("sesUserId", request.getAttribute("sesUserId"));
		rtnResult.put("isAdmin", isAdmin);
		
		return rtnResult;
	}
	
	private HashMap<String, Object> getJsonObjByTaskList(List<Cutover> list, String filterType, List<Cutover> target) {
		HashMap<String, Object> rtnResult = new HashMap<String, Object>();
		
		HashMap<String, String> statInfo = new HashMap<String, String>();
		
		int dataId = 1;
		
		int totalCnt = list.size();
		int readyCnt = 0;
		int ingCnt = 0;
		int ingProgressCnt = 0;
		int ingStartedCnt = 0;
		int ingFinishedCnt = 0;
		int ingTaskConfirmedCnt = 0;
		int ingKtConfirmedCnt = 0;
		int delayCnt = 0;
		int delayOpenCnt = 0;
		int delayProgressCnt = 0;
		int delayStartedCnt = 0;
		int delayFinishedCnt = 0;
		int delayTaskConfirmedCnt = 0;
		int delayKtConfirmedCnt = 0;
		int failCnt = 0;
		int successCnt = 0;
		int finishCnt = 0;
		int progressCount = 0;
		
		boolean isReady = false;
		
		String maxSyncDate = jiraService.getMaxSyncDate();
		HashMap<String, String> teamMap = new HashMap<String, String>();
		HashMap<String, String> sysMap = new HashMap<String, String>();
		
		JSONArray datas = new JSONArray();
		JSONArray links = new JSONArray();
		
		int xId = 1;
		int yId = 1;
		int zId = 1;
		
		String bf_x = "";
		String bf_y = "";
		String bf_z = "";
		
		for(Cutover info : list){
			
			isReady = false;
			
			int idx = info.getStartExpectDate().indexOf(" ");
			String startDatePart = info.getStartExpectDate().substring(0, idx);
			String startTimePart = info.getStartExpectDate().substring(idx + 1);
			String[] startTimeInfo = startTimePart.split(":");
			
			idx = info.getEndExpectDate().indexOf(" ");
			String endDatePart = info.getEndExpectDate().substring(0, idx);
			String endTimePart = info.getEndExpectDate().substring(idx + 1);
			String[] endTimeInfo = endTimePart.split(":");
			
			String startDate = startDatePart + " " + String.format("%02d",Integer.parseInt(startTimeInfo[0])) + ":" + String.format("%02d",Integer.parseInt(startTimeInfo[1]));
			String endDate = endDatePart + " " + String.format("%02d",Integer.parseInt(endTimeInfo[0])) + ":" + String.format("%02d",Integer.parseInt(endTimeInfo[1]));
			
			String status = "0";
			String step = "1";
			
			Date end = DateUtil.getDateByString(startDate, DateUtil.Format.YYYY_MM_DD_HH_MI.getValue());
			Date start = DateUtil.addMinute(end, -10);
			
			info.setJiraStatusDesc(info.getJiraStatus());
			
			
			// 대기
			if(info.getJiraStatus().equals("Open")){
				step = "0";
				if (DateUtil.isBetweenDate(start, end, DateUtil.getNow())) {
					isReady = true;
					readyCnt++;
					info.setJiraStatusDesc("할당대기");
				}
			}
			//==================================
			
			//완료
			if(info.getJiraStatus().equals("Closed")){
				step = "2";
				ingFinishedCnt++;
				finishCnt++;
				if(info.getResolution().equals("Failed")){
					info.setJiraStatusDesc("비정상완료");
					failCnt++;
				}
				if(!info.getResolution().equals("Failed")){
					successCnt++;
					info.setJiraStatusDesc("정상완료");
				}
			}
			
			
			if(!step.equals("2")){
				Calendar now = Calendar.getInstance();
				String nowStr = now.get(Calendar.YEAR) + String.format("%02d",now.get(Calendar.MONTH)+1) + String.format("%02d",now.get(Calendar.DAY_OF_MONTH)) + String.format("%02d",now.get(Calendar.HOUR_OF_DAY)) + String.format("%02d",now.get(Calendar.MINUTE));
				
				long nowLong = Long.parseLong(nowStr);
				
				long startDateLong = Long.parseLong(startDate.replaceAll("-", "").replaceAll(" ", "").replaceAll(":", ""));
				if(step.equals("0") && startDateLong < nowLong){
					status = "1";
					step = "1";
				}
				
				long endDateLong = Long.parseLong(endDate.replaceAll("-", "").replaceAll(" ", "").replaceAll(":", ""));
				if(step.equals("1") && endDateLong < nowLong){
					status = "1";
					step = "1";
				}
			}
			
			if("1".equals(step)) {
				progressCount++;
			}
			
			// 진행중
			if ("0".equals(status) && "1".equals(step)) {
				ingCnt++;
				if(info.getJiraStatus().equals("작업요청")){
					ingProgressCnt++;
					info.setJiraStatusDesc("작업요청");
				}
				
				if(info.getJiraStatus().equals("작업시작")){
					ingStartedCnt++;
					info.setJiraStatusDesc("작업진행중");
				}
			}
			
			if(status.equals("1")){
				delayCnt++;
				if(!info.getJiraStatus().equals("작업시작")){
					delayOpenCnt++;
					info.setJiraStatusDesc("시작지연");
				}
				if(info.getJiraStatus().equals("작업시작")){
					delayProgressCnt++;
					info.setJiraStatusDesc("종료지연");
				}
			}
			
			
			//data filter
			boolean filterValue = false;
			for (JiraDataFilter filter : filters) {
				if (filter.isVaild(filterType, step, status, info.getJiraStatus(), info.getResolution(), isReady)) {
					filterValue = true;
					break;
				}
			}
			
			if (!filterValue) continue;
			
			if (target != null) {
				target.add(info);
			} else {
			
				if(!info.getJobStep().equals(bf_x)){
					JSONObject dataObj = new JSONObject();
					dataObj.put("id", "x" + (xId++));
					dataObj.put("text", info.getJobStep());
					dataObj.put("parent", "");
					dataObj.put("open", true);
					dataObj.put("type", "folder");
					dataObj.put("assignee", info.getJobExecutor());
					
					datas.add(dataObj);
					
					bf_y = "";
					bf_z = "";
				}
				
				if(!info.getyCategory().equals(bf_y)){
					JSONObject dataObj = new JSONObject();
					dataObj.put("id", "y" + (yId++));
					dataObj.put("text", info.getyCategory());
					dataObj.put("parent", "x" + (xId -1));
					dataObj.put("open", "true");
					dataObj.put("type", "folder");
					dataObj.put("assignee", info.getJobExecutor());
					
					datas.add(dataObj);
					
					bf_z = "";
				}
				
				if(info.getJobExecutionTeam() != null && !info.getJobExecutionTeam().equals(bf_z)){
					JSONObject dataObj = new JSONObject();
					dataObj.put("id", "z" + (zId++));
					dataObj.put("text", info.getJobExecutionTeam());
					dataObj.put("parent", "y" + (yId -1));
					dataObj.put("open", "true");
					dataObj.put("type", "folder");
					dataObj.put("assignee", info.getJobExecutor());
				}
				
				JSONObject dataObj = new JSONObject();
				
				dataObj.put("id", info.getJobId());
				dataObj.put("text", info.getTask());
				dataObj.put("start_date", startDate);
				dataObj.put("end_date", endDate);
				dataObj.put("duration_dp", info.getDuration());
				dataObj.put("parent", "y" + (yId - 1));
				dataObj.put("open", "true");
				dataObj.put("status", status);
				dataObj.put("step", step);
				dataObj.put("taskteam", info.getJobExecutionTeam());
				dataObj.put("tasksys", info.getSystemType());
				dataObj.put("taskp1", info.getJobExecutor());
				dataObj.put("taskp2", info.getSupervisor());
				dataObj.put("taskp3", info.getKtSupervisor());
				dataObj.put("taskid", info.getJobSortId());
				dataObj.put("jiraid", info.getJiraId());
				dataObj.put("jirastatus", info.getJiraStatus());
				dataObj.put("assignee", info.getAssignee());
				dataObj.put("type", "task");
				
				datas.add(dataObj);
				
				if(info.getPreJob() != null && !info.getPreJob().equals("")){
					String[] sources = info.getPreJob().split(",");
					for(String sourceId : sources){
						JSONObject linkObj = new JSONObject();
						linkObj.put("id", dataId++);
						linkObj.put("source", sourceId);
						linkObj.put("target", info.getJobId());
						linkObj.put("type", "0");
						
						links.add(linkObj);
					}
				}
				
				bf_x = info.getJobStep();
				bf_y = info.getyCategory();
				bf_z = info.getJobExecutionTeam();
				
				teamMap.put(info.getJobExecutionTeam(), "1");
				sysMap.put(info.getSystemType(), "1");
			}
		}
		if (target == null) {
			JSONObject rtnObj = new JSONObject();
			rtnObj.put("data", datas);
			rtnObj.put("links", links);
			
			rtnResult.put("jsonData", rtnObj);
			
			statInfo.put("totalCnt", String.valueOf(list.size()));
			statInfo.put("readyCnt", String.valueOf(readyCnt));
			statInfo.put("ingCnt", String.valueOf(ingCnt));
			statInfo.put("ingProgressCnt", String.valueOf(ingProgressCnt));
			statInfo.put("ingStartedCnt", String.valueOf(ingStartedCnt));
			statInfo.put("ingFinishedCnt", String.valueOf(ingFinishedCnt));
			statInfo.put("ingTaskConfirmedCnt", String.valueOf(ingTaskConfirmedCnt));
			statInfo.put("ingKtConfirmedCnt", String.valueOf(ingKtConfirmedCnt));
			statInfo.put("progressCount", String.valueOf(progressCount));
			statInfo.put("delayCnt", String.valueOf(delayCnt));
			statInfo.put("delayOpenCnt", String.valueOf(delayOpenCnt));
			statInfo.put("delayProgressCnt", String.valueOf(delayProgressCnt));
			statInfo.put("delayStartedCnt", String.valueOf(delayStartedCnt));
			statInfo.put("delayFinishedCnt", String.valueOf(delayFinishedCnt));
			statInfo.put("delayTaskConfirmedCnt", String.valueOf(delayTaskConfirmedCnt));
			statInfo.put("delayKtConfirmedCnt", String.valueOf(delayKtConfirmedCnt));
			statInfo.put("failCnt", String.valueOf(failCnt));
			statInfo.put("successCnt", String.valueOf(successCnt));
			statInfo.put("finishCnt", String.valueOf(finishCnt));
			
			statInfo.put("lastSyncDate", maxSyncDate);
			
			rtnResult.put("statInfo", statInfo);

			rtnResult.put("teamKind", this.getKindDatas(teamMap));
			rtnResult.put("sysKind", this.getKindDatas(sysMap));
		}
		
		return rtnResult;
	}
	
	private String getKindDatas(HashMap<String, String> data) {
		String teamStr = "";
		String delimeter = "";
		Set key = data.keySet();
		for(Iterator iterator = key.iterator(); iterator.hasNext();){
			String keyStr = (String) iterator.next();
			teamStr += delimeter + keyStr;
			delimeter = "__";
		}
		
		String[] teamArr = teamStr.split("__");
		Arrays.sort(teamArr);
		
		teamStr = "";
		delimeter = "";
		for(String str : teamArr){
			teamStr += delimeter + str;
			delimeter = "__";
		}
		return teamStr;
	}
	
}
