package net.smart.web.jira.service;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;

import javax.annotation.PostConstruct;

import net.smart.common.domain.DataSyncInfo;
import net.smart.common.exception.IntegrationException;
import net.smart.common.service.SmartCommonService;
import net.smart.common.support.constant.ErrorCode;
import net.smart.common.support.util.DateUtil;
import net.smart.common.support.util.FileUtil;
import net.smart.web.code.service.CodeService;
import net.smart.web.domain.CommonCode;
import net.smart.web.domain.UserInfo;
import net.smart.web.domain.changerequest.ChangeRequestComboInfo;
import net.smart.web.domain.changerequest.ChangeRequestJira;
import net.smart.web.domain.jira.CrowdUserInfo;
import net.smart.web.domain.jira.Cutover;
import net.smart.web.domain.jira.CutoverDashboard;
import net.smart.web.domain.jira.CutoverDetail;
import net.smart.web.domain.jira.CutoverMain;
import net.smart.web.domain.jira.GanttInfo;
import net.smart.web.domain.jira.JiraColumn;
import net.smart.web.domain.jira.JiraComponent;
import net.smart.web.domain.jira.JiraDefaultData;
import net.smart.web.domain.jira.JiraInfo;
import net.smart.web.domain.jira.JiraOption;
import net.smart.web.domain.jira.ServiceRequest;
import net.smart.web.domain.jira.SourceJiraInfo;
import net.smart.web.domain.jira.SourceJiraLink;
import net.smart.web.domain.jira.Task;
import net.smart.web.domain.jira.TaskLink;
import net.smart.web.jira.accumulator.Accumulator;
import net.smart.web.jira.dao.CrowdDao;
import net.smart.web.jira.dao.JiraDao;
import net.smart.web.jira.dao.ServiceRequestDao;
import net.smart.web.jira.service.fineder.JiraValueFineder;
import net.smart.web.plugin.jira.rest.client.RestClientManager;
import net.smart.web.plugin.jira.rest.internal.search.JqlSearcher;
import net.smart.web.plugin.jira.rest.search.SearchService;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.transaction.annotation.Transactional;

import com.atlassian.jira.rest.client.api.domain.BasicIssue;
import com.atlassian.jira.rest.client.api.domain.BasicUser;
import com.atlassian.jira.rest.client.api.domain.Comment;
import com.atlassian.jira.rest.client.api.domain.Issue;
import com.atlassian.jira.rest.client.api.domain.Transition;
import com.atlassian.jira.rest.client.api.domain.input.ComplexIssueInputFieldValue;
import com.atlassian.jira.rest.client.api.domain.input.FieldInput;
import com.atlassian.jira.rest.client.api.domain.input.IssueInputBuilder;
import com.atlassian.jira.rest.client.api.domain.input.TransitionInput;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;

//@Service("jiraService")
public class JiraServiceImpl implements JiraService {
	
//	@Autowired
//	@Qualifier("jiraDao")
	private JiraDao jiraDao;
	
//	@Autowired
//	@Qualifier("sourceJiraDao")
	private JiraDao sourceJiraDao;
	
//	@Autowired
//	@Qualifier("crowdDao")
	private CrowdDao crowdDao;
	
//	@Autowired
	private JiraConfig jiraConfig;
	
//	@Autowired
	private SmartCommonService integrationCommonService;
	
//	@Autowired
	private CodeService codeService;
	
//	@Autowired
	private ServiceRequestDao serviceRequestDao;
	
	private RestClientManager updateRestClientManager;
	
	private AtomicInteger sync = new AtomicInteger(0);
	private AtomicInteger syncColumn = new AtomicInteger(0);
	
	private Map<String, List<JiraColumn>> jiraColumns;
	
	private List<JiraValueFineder> jiraValueFinederList;
	
//	@PostConstruct
	public void init() {
		if (this.updateRestClientManager == null) {
			this.updateRestClientManager = this.getRestClientManager();
		}
		this.jiraColumns = new LinkedHashMap<String, List<JiraColumn>>();
		this.setJiraColumn();
	}
	
	private void setJiraColumn() {
		List<JiraColumn> result = jiraDao.getJiraColumnList(new JiraColumn());
		for (JiraColumn column : result) {
			String key = column.getProject() + "/" + column.getIssueTypeId();
			List<JiraColumn> temps = this.jiraColumns.get(key);
			if (temps == null) {
				temps = new ArrayList<JiraColumn>();
				this.jiraColumns.put(key, temps);
			}
			temps.add(column);
		}
	}
	
//	@Scheduled(cron="0 0/5 * * * ? ")
	public void setJiraColumnByRefresh() {
		synchronized(syncColumn) {
			this.jiraColumns = new LinkedHashMap<String, List<JiraColumn>>();
			this.setJiraColumn();
		}
	}
	
	private List<Accumulator> accumulatorList;
	
	@Autowired
	public void setAccumulatorList(List<Accumulator> accumulatorList) {
		this.accumulatorList = accumulatorList;
	}
	
	@Autowired
	public void setJiraValueFinederList(List<JiraValueFineder> jiraValueFinederList) {
		this.jiraValueFinederList = jiraValueFinederList;
	}

	@Override
	public List<Cutover> getCutoverList(Cutover param) {
		return jiraDao.getCutoverList(param);
	}

	@Override
	public List<CommonCode> getCutoverThGroup() {
		return jiraDao.getCutoverThGroup();
	}

	@Override
	public JiraInfo getJiraInfo() {
		return jiraDao.getJiraInfo();
	}
	
	@Override
	public boolean isJiraAdmin(String ip) {
		Map<String, String> jiraAdmin = new HashMap<String, String>();
		List<UserInfo> userInfos = jiraDao.getJiraAdminList();
		for (UserInfo obj : userInfos) {
			jiraAdmin.put(obj.getIp(), obj.getIp());
		}
		return jiraAdmin.containsKey(ip);
	}

	@Override
	public String getMaxSyncDate() {
		return jiraDao.getMaxSyncDate();
	}
	
	@Transactional(readOnly=true)
	private List<SourceJiraInfo> getSourceCutoverList(SourceJiraInfo param) {
		return sourceJiraDao.getSourceJiraList(param);
	}
	
	@Transactional(readOnly=true)
	private List<SourceJiraLink> getSourceJiraLinkList() {
		return sourceJiraDao.getSourceJiraLink();
	}

	@Override
	public void processJiraSyncData(Cutover cutover) {
		if (!integrationCommonService.isValidInterfaceDate("cutover"))
			throw new IntegrationException("ERROR.0001", "현재 일자가 지정된 연동 기간에 포함되지 않습니다.");
		String maxSyncDate = this.getMaxSyncDate();
		
		if(maxSyncDate != null && !maxSyncDate.equals("")){
			maxSyncDate = maxSyncDate.substring(0,16); 
		}
		JiraDefaultData defaultData = jiraDao.getCutvoerDefaultValue();
		SourceJiraInfo param = new SourceJiraInfo();
		param.setUpdated("2016-01-01 00:00:00");
		param.setCutoverTh(cutover.getCutoverTh());
		param.setJobStep(cutover.getJobStep());
		if (defaultData != null && defaultData.getCutoverTransitionDetail() != null) {
			param.setJobStepDetail(defaultData.getCutoverTransitionDetail());
		}
		List<SourceJiraInfo> updateList = this.getSourceCutoverList(param);
		List<SourceJiraLink> links = this.getSourceJiraLinkList();
		this.processCutoverData(cutover, updateList, links);
		
	}
	
	@Transactional
	private void processCutoverDataByAuto(List<SourceJiraInfo> updateList, List<SourceJiraLink> links) {
		jiraDao.updateMaxSyncDate();
		jiraDao.updateCutover(updateList);
		jiraDao.updateCutoverIssueLink(links);
	}
	
	@Transactional
	private void processCutoverData(Cutover cutover, List<SourceJiraInfo> updateList, List<SourceJiraLink> links) {
		jiraDao.updateMaxSyncDate();
		jiraDao.deleteCutover(cutover);
		Map<String, SourceJiraInfo> data = new HashMap<String, SourceJiraInfo>();
		for (SourceJiraInfo obj : updateList) {
			if (!data.containsKey(obj.getJobId())) {
				data.put(obj.getJobId(), obj);
			}
		}
		jiraDao.insertCutover(new ArrayList<SourceJiraInfo>(data.values()));
		jiraDao.updateCutoverIssueLink(links);
	}

	@Override
//	@Scheduled(cron="0,30 * * * * ? ")
	public void processJiraAutoSyncData() {
		final String jiraUnSync = System.getProperty("jiraUnSync");
		if (jiraUnSync == null || jiraUnSync.equals("N")) {
			if(integrationCommonService.isValidInterfaceDate("cutover")) {
				String maxSyncDate = this.getMaxSyncDate();
				
				if(maxSyncDate != null && !maxSyncDate.equals("")){
					maxSyncDate = maxSyncDate.substring(0,16); 
				}
				
				SourceJiraInfo param = new SourceJiraInfo();
				param.setUpdated(maxSyncDate);
				List<SourceJiraInfo> updateList = this.getSourceCutoverList(param);
				List<SourceJiraLink> links = this.getSourceJiraLinkList();
				this.processCutoverDataByAuto(updateList, links);
			}
		}
		
	}

	@Override
	public List<CommonCode> getTransitionStep() {
		return jiraDao.getTransitionStep();
	}
	
	@Transactional(readOnly=true)
	private List<SourceJiraInfo> getOpenIssueList(JiraDefaultData defaultData) {
		SourceJiraInfo param = new SourceJiraInfo();
		param.setProjectId(Integer.parseInt(defaultData.getDefectProjectId()));
		param.setIssueTypeId(Integer.parseInt(defaultData.getDefectIssueTypeId()));
		param.setQueChannelId(Integer.parseInt(defaultData.getDefectQueChannelId()));
		param.setBizTypeId(Integer.parseInt(defaultData.getDefectBizTypeId()));
		Date searchDate = DateUtil.addMinute(DateUtil.getNow(), -20);
		param.setSearchDate(DateUtil.getDateByFormat(searchDate, DateUtil.Format.YYYY_MM_DD_HH_MI_SS.getValue()));
		return sourceJiraDao.getOpenJiraIssueList(param);
	}
	
	@Transactional
	private void processOpenIssueData(List<SourceJiraInfo> params) {
		jiraDao.addOpenIssue(params);
	}

	@Override
//	@Scheduled(cron="0,30 * * * * ? ")
	public void processOpenIssueData() {
		final String jiraUnSync = System.getProperty("jiraUnSync");
		if (jiraUnSync == null || jiraUnSync.equals("N")) {
			if(integrationCommonService.isValidInterfaceDate("defect")) {
				JiraDefaultData defaultData = jiraDao.getCutvoerDefaultValue();
				List<SourceJiraInfo> datas = this.getOpenIssueList(defaultData);
				this.processOpenIssueData(datas);
			}
		}
	}
	
	@Transactional
	private void mergeUserInfo(List<CrowdUserInfo> userList, DataSyncInfo sync) {
		jiraDao.mergeCrowdUser(userList);
		integrationCommonService.afterDataSyncInfo(sync);
	}

	@Override
//	@Scheduled(cron="0 0/30 * * * ? ")
	public void processCrowdUser() {
		final String jiraUnSync = System.getProperty("jiraUnSync");
		if (jiraUnSync == null || jiraUnSync.equals("N")) {
			DataSyncInfo sync = new DataSyncInfo();
			sync.setSyncType("crowd");
			integrationCommonService.beforeDataSyncInfo(sync);
			CrowdUserInfo param = new CrowdUserInfo();
			param.setCreatedDate(sync.getLastSyncDate());
			param.setUpdatedDate(sync.getLastSyncDate());
			List<CrowdUserInfo> crowdUsers = crowdDao.getCrowdUserList(param);
			this.mergeUserInfo(crowdUsers, sync);
		}
	}

	@Override
	@Transactional(readOnly=true)
	public List<JiraOption> getJiraOptionList(JiraOption param) {
		return sourceJiraDao.getJiraOptionList(param);
	}

	@Override
	public List<Cutover> getCutoverSearchList(Cutover param) {
		return jiraDao.getCutoverSearchList(param);
	}
	
	private void setDivisionCutoverList(List<Cutover> source, List<Cutover> merges, List<Cutover> dels) {
		String author = integrationCommonService.getSessionUserId();
		for (Cutover obj : source) {
			if ("I".equals(obj.getMode()) || "M".equals(obj.getMode())) {
				obj.setStartExpectDate(obj.getStartExpectDate() + " " + obj.getStartExpectTime() + ":00");
				obj.setEndExpectDate(obj.getEndExpectDate() + " " + obj.getEndExpectTime() + ":00");
				obj.setJobExecutor(obj.getJobExecutorId());
				obj.setSupervisor(obj.getSupervisorId());
				if (obj.getJobId() == null) {
					obj.setJobId(jiraDao.getNextCutoverJobId());
					obj.setItemStatus("VERIFY");
					obj.setItemAuthor(author);
					obj.setSortNo(9999);
				}
				if (obj.getCaution() == null) {
					obj.setCaution("X");
				}
				if (obj.getPreJob() == null) {
					obj.setPreJob("");
				}
				merges.add(obj);
			} else {
				dels.add(obj);
			}
		}
	}

	@Override
	@Transactional
	public void saveCutover(List<Cutover> params) {
		List<Cutover> merges = new ArrayList<Cutover>();
		List<Cutover> dels = new ArrayList<Cutover>();
		this.setDivisionCutoverList(params, merges, dels);
		
		jiraDao.mergeCutover(merges);
		jiraDao.removeCutover(dels);
	}

	@Override
	public List<Cutover> getCutoverListByAll(Cutover param) {
		return jiraDao.getCutoverListByAll(param);
	}
	
	@Override
	public void syncCutoverJira(List<Cutover> params) {
		RestClientManager restClientManager = this.getRestClientManager();
		String author = integrationCommonService.getSessionUserId();
		author = author == null ? jiraConfig.getCutoverReporter() : author;
		for (Cutover obj : params) {
			if (obj.getJiraId() == null || "".equals(obj.getJiraId())) {
				this.createJiraIssue(restClientManager, obj, author);
			} else {
				this.updateJiraIssue(restClientManager, obj, author);
			}
		}
		this.modifyCutoverJiraSync(params);
		this.dispose(restClientManager);
	}
	
	@Transactional
	private void modifyCutoverJiraSync(List<Cutover> param) {
		jiraDao.modifyCutoverJiraSync(param);
	}
	
	private void setJiraCustomField(Cutover param, IssueInputBuilder issueInputBuilder, String author) throws URISyntaxException {
		issueInputBuilder.setFieldInput(new FieldInput("customfield_15104", ComplexIssueInputFieldValue.with("id", param.getCutoverTh())));
		issueInputBuilder.setFieldInput(new FieldInput("customfield_15105", ComplexIssueInputFieldValue.with("id", param.getJobStep())));
		issueInputBuilder.setFieldInput(new FieldInput("customfield_15106", ComplexIssueInputFieldValue.with("id", param.getJobType())));
		issueInputBuilder.setFieldInput(new FieldInput("customfield_15107", ComplexIssueInputFieldValue.with("id", param.getyCategory())));
		
		issueInputBuilder.setFieldValue("customfield_14508", param.getxCategory());
		issueInputBuilder.setFieldValue("customfield_14510", param.getTask());
		issueInputBuilder.setFieldValue("customfield_14509", param.getJobId());
		
		issueInputBuilder.setPriorityId(param.getCaution() != null && param.getCaution().equals("O") ? 1L : 3L);
		
		String start = param.getStartExpectDate().replaceAll("-", "") + " " + param.getStartExpectTime().replaceAll(":", "") + "00";
		String end = param.getEndExpectDate().replaceAll("-", "") + " " + param.getEndExpectTime().replaceAll(":", "") + "00";
		Date startDate = DateUtil.getDateByString(start, DateUtil.Format.YYYYMMDDHHMISS.getValue());
		Date endDate = DateUtil.getDateByString(end, DateUtil.Format.YYYYMMDDHHMISS.getValue());
		
		String startTime = DateUtil.getDateByFormat(startDate, DateUtil.Format.YYYY_MM_DD_T_hh_mm_ssSTZD.getValue());
		String endTime = DateUtil.getDateByFormat(endDate, DateUtil.Format.YYYY_MM_DD_T_hh_mm_ssSTZD.getValue());
		
		issueInputBuilder.setFieldValue("customfield_14527", startTime);
		issueInputBuilder.setFieldValue("customfield_14528", endTime);
		issueInputBuilder.setFieldValue("customfield_14532", Integer.parseInt(param.getDuration()));
		
		issueInputBuilder.setFieldInput(new FieldInput("customfield_15108", ComplexIssueInputFieldValue.with("id", param.getSystemType())));
		
		issueInputBuilder.setFieldValue("customfield_14531", param.getPreJob());
		
		BasicUser reporter = new BasicUser(new URI(jiraConfig.getJiraUrl() + jiraConfig.getUserUri() +  author), author, author);
		BasicUser excutor = new BasicUser(new URI(jiraConfig.getJiraUrl() + jiraConfig.getUserUri() +  param.getJobExecutorId()), param.getJobExecutorId(), param.getJobExecutorId());
		BasicUser confirmer = new BasicUser(new URI(jiraConfig.getJiraUrl() + jiraConfig.getUserUri() +  param.getSupervisorId()), param.getSupervisorId(), param.getSupervisorId());
		ImmutableList<BasicUser> participants = ImmutableList.of(reporter, excutor, confirmer);
		
		issueInputBuilder.setFieldInput(new FieldInput("customfield_15110", ComplexIssueInputFieldValue.with("id", param.getJobExecutionTeam())));
		
		issueInputBuilder.setFieldValue("customfield_14517", excutor);
		issueInputBuilder.setFieldValue("customfield_14945", confirmer);
		
		issueInputBuilder.setFieldValue("customfield_14521", param.getJobCheckList());
		issueInputBuilder.setFieldValue("customfield_10001", participants);
		
	}
	
	private void updateJiraIssue(RestClientManager restClientManager, Cutover param, String author) {
		Issue issue = null;
		try {
			issue = restClientManager.getExtendedIssueClient().getIssue(param.getJiraId()).claim();
			
			IssueInputBuilder issueInputBuilder = new IssueInputBuilder(issue.getProject(), issue.getIssueType());
			issueInputBuilder.setSummary(param.getTask());
			issueInputBuilder.setDescription(param.getActivity());
			BasicUser reporter = new BasicUser(new URI(jiraConfig.getJiraUrl() + jiraConfig.getUserUri() + author), author, author);
			issueInputBuilder.setReporter(reporter);
			issueInputBuilder.setAssignee(reporter);
			this.setJiraCustomField(param, issueInputBuilder, author);
			restClientManager.getExtendedIssueClient().update(issue, issueInputBuilder.build()).claim();
			param.setJiraSyncMessage("Completed");
			param.setItemStatus("SUCCESS");
		} catch (Exception ex) {
			param.setJiraSyncMessage("Jira Sync Error :" + ex.getMessage());
			param.setItemStatus("FAIL");
		}
	}
	
	private void createJiraIssue(RestClientManager restClientManager, Cutover param, String author) {
		BasicIssue basicIssue = null;
		Issue issue = null;
		try {
			IssueInputBuilder issueInputBuilder = new IssueInputBuilder(jiraConfig.getProject(), Long.parseLong(jiraConfig.getIssueType()), param.getTask());
			issueInputBuilder.setSummary(param.getTask());
			issueInputBuilder.setDescription(param.getActivity());
			BasicUser reporter = new BasicUser(new URI(jiraConfig.getJiraUrl() + jiraConfig.getUserUri() + author), author, author);
			issueInputBuilder.setReporter(reporter);
			issueInputBuilder.setAssignee(reporter);
			this.setJiraCustomField(param, issueInputBuilder, author);
			basicIssue = restClientManager.getExtendedIssueClient().createIssue(issueInputBuilder.build()).claim();
			issue = restClientManager.getExtendedIssueClient().getIssue(basicIssue.getKey()).claim();
			param.setJiraId(issue.getKey());
			param.setJiraStatus(issue.getStatus().getName());
			param.setAssignee(issue.getAssignee().getName());
			param.setJiraSyncMessage("Completed");
			param.setItemStatus("SUCCESS");
		} catch (Exception ex) {
			param.setJiraSyncMessage("Jira Sync Error :" + ex.getMessage());
			param.setItemStatus("FAIL");
		}
	}

	@Override
	@Transactional
	public void modifyCutoverSort(List<Cutover> params) {
		jiraDao.modifyCutoverSort(params);
	}
	
	private void setChangeDate(Task source, Task target) {
		String sourceTemp = source.getStart_date().replaceAll("-", "").replaceAll(" ", "").replaceAll(":", "");
		String targetTemp = target.getStart_date().replaceAll("-", "").replaceAll(" ", "").replaceAll(":", "");
		Date sourceStart = DateUtil.getDateByString(sourceTemp+"00", DateUtil.Format.YYYYMMDDHHMISS.getValue());
		Date targetStart = DateUtil.getDateByString(targetTemp+"00", DateUtil.Format.YYYYMMDDHHMISS.getValue());
		if (DateUtil.compareDate(sourceStart, targetStart) == 1) {
			source.setStart_date(target.getStart_date());
		}
		
		sourceTemp = source.getEnd_date().replaceAll("-", "").replaceAll(" ", "").replaceAll(":", "");
		targetTemp = target.getEnd_date().replaceAll("-", "").replaceAll(" ", "").replaceAll(":", "");
		Date sourceEnd = DateUtil.getDateByString(sourceTemp+"00", DateUtil.Format.YYYYMMDDHHMISS.getValue());
		Date targetEnd = DateUtil.getDateByString(targetTemp+"00", DateUtil.Format.YYYYMMDDHHMISS.getValue());
		if (DateUtil.compareDate(sourceEnd, targetEnd) == -1) {
			source.setEnd_date(target.getEnd_date());
		}
		Date now = DateUtil.getNow();
		int fullDays = DateUtil.getDistanceDayCount(sourceStart, sourceEnd);
		int nowDays = DateUtil.getDistanceDayCount(sourceStart, now);
		source.setDuration(DateUtil.getDistanceMinutesCount(sourceStart, sourceEnd));	
		source.setProgress(nowDays > fullDays || fullDays == 0 ? 1 : nowDays/fullDays);
		
		fullDays = DateUtil.getDistanceDayCount(targetStart, targetEnd);
		nowDays = DateUtil.getDistanceDayCount(targetStart, now);
		target.setDuration(DateUtil.getDistanceMinutesCount(targetStart, targetEnd));
		target.setProgress(nowDays > fullDays || fullDays == 0 ? 1 : nowDays/fullDays);
	}
	
	private void setMinMaxDate(Task task, Task project) {
		String start = task.getStart_date().replaceAll("-", "").replaceAll(" ", "").replaceAll(":", "");
		String end = task.getEnd_date().replaceAll("-", "").replaceAll(" ", "").replaceAll(":", "");
		Date minDate = DateUtil.getDateByString(start+"00", DateUtil.Format.YYYYMMDDHHMISS.getValue());
		Date maxDate = DateUtil.getDateByString(end+"00", DateUtil.Format.YYYYMMDDHHMISS.getValue());
		if (project.getMin() == null) {
			project.setMin(minDate);
			project.setMax(maxDate);
		} else {
			if (DateUtil.compareDate(project.getMin(), minDate) == 1) {
				project.setMin(minDate);
			}
			if (DateUtil.compareDate(project.getMax(), maxDate) == -1) {
				project.setMax(maxDate);
			}
		}
		Date now = DateUtil.getNow();
		int fullDays = DateUtil.getDistanceDayCount(minDate, maxDate);
		int nowDays = DateUtil.getDistanceDayCount(minDate, now);
		task.setDuration(DateUtil.getDistanceMinutesCount(minDate, maxDate));	
		task.setProgress(nowDays > fullDays || fullDays == 0 ? 1 : nowDays/fullDays);
	}

	@Override
	public GanttInfo getGantData(Cutover param) {
		param.setCutoverTh(param.getCutoverTh() == null ? jiraConfig.getTh() : param.getCutoverTh());
		param.setJobStep(param.getJobStep() == null ? jiraConfig.getStep() : param.getJobStep());
		param.setJobType(param.getJobType() == null ? jiraConfig.getDtl() : param.getJobType());
		GanttInfo result = new GanttInfo();
		List<Task> data = new ArrayList<Task>();
		List<TaskLink> links = new ArrayList<TaskLink>();
		Map<String, Task> category = new LinkedHashMap<String, Task>();
		Map<String, Task> subCategory = new LinkedHashMap<String, Task>();
		List<Cutover> temps = this.getCutoverListByAll(param);
		Task project = new Task();
		project.setId("1");
		project.setText("PA2 Cut-Over Task");
		project.setLevel(0);
		int index = 0;
		for (Cutover obj : temps) {
			if (obj.getStartExpectDate() == null || obj.getEndExpectDate() == null) continue;
			Task categoryTask = category.get(obj.getyCategory());
			if (categoryTask == null) {
				categoryTask = new Task();
				categoryTask.setId(obj.getyCategory());
				categoryTask.setText(obj.getJobExecutionTeamName());
				categoryTask.setParent("1");
				categoryTask.setOpen(true);
				categoryTask.setStart_date(obj.getStartExpectDate() + " " + obj.getStartExpectTime());
				categoryTask.setEnd_date(obj.getEndExpectDate() + " " + obj.getEndExpectTime());
				categoryTask.setDuration(0);
				categoryTask.setProgress(0.0);
				categoryTask.setLevel(1);
				category.put(obj.getyCategory(), categoryTask);
			}
			Task subCategoryTask = subCategory.get(obj.getyCategory() + "_" + obj.getxCategory());
			if (subCategoryTask == null) {
				subCategoryTask = new Task();
				subCategoryTask.setId(obj.getyCategory() + "_" + obj.getxCategory());
				subCategoryTask.setText(obj.getxCategory());
				subCategoryTask.setParent(obj.getyCategory());
				subCategoryTask.setOpen(true);
				subCategoryTask.setStart_date(obj.getStartExpectDate() + " " + obj.getStartExpectTime());
				subCategoryTask.setEnd_date(obj.getEndExpectDate() + " " + obj.getEndExpectTime());
				subCategoryTask.setDuration(0);
				subCategoryTask.setProgress(0.0);
				subCategoryTask.setLevel(2);
				subCategory.put(obj.getyCategory() + "_" + obj.getxCategory(), subCategoryTask);
			}
			Task task = new Task();
			task.setId(obj.getJobId());
			task.setText(obj.getTask());
			task.setStart_date(obj.getStartExpectDate() + " " + obj.getStartExpectTime());
			task.setEnd_date(obj.getEndExpectDate() + " " + obj.getEndExpectTime());
			task.setDuration(obj.getDuration() == null || "".equals(obj.getDuration()) ? 0 : Integer.parseInt(obj.getDuration()));
			task.setDurationMin(obj.getDuration() == null || "".equals(obj.getDuration()) ? "0" : obj.getDuration());
			task.setParent(obj.getyCategory() + "_" + obj.getxCategory());
			task.setProgress(0.0);
			task.setTeam(obj.getTeamName());
			task.setExecutor(obj.getJobExecutor());
			task.setOpen(true);
			task.setLeaf(true);
			this.setChangeDate(categoryTask, task);
			this.setChangeDate(subCategoryTask, task);
			this.setMinMaxDate(task, project);
			data.add(task);
			
			if (obj.getPreJob() != null && !"".equals(obj.getPreJob())) {
				String[] pres = obj.getPreJob().split(",");
				for (String preJob : pres) {
					if (preJob == null || "".equals(preJob)) continue;
					TaskLink link = new TaskLink();
					link.setId(String.valueOf(index++));
					link.setSource(preJob);
					link.setTarget(obj.getJobId());
					link.setType("0");
					links.add(link);
				}
			}	
		}
		this.setGanttProjectTask(data, project, category, subCategory);
		result.setData(data);
		result.setLinks(links);
		return result;
	}
	
	private void setGanttProjectTask(List<Task> data, Task project, Map<String, Task> category, Map<String, Task> subCategory) {
		Date now = DateUtil.getNow();
		if (project.getMin() == null) {
			project.setMin(now);
			project.setMax(DateUtil.addDate(now, 1, Calendar.DATE, 0));
		}
		int fullDays = DateUtil.getDistanceDayCount(project.getMin(), project.getMax());
		int nowDays = DateUtil.getDistanceDayCount(project.getMin(), now);
		
		project.setOpen(true);
		project.setStart_date(DateUtil.getDateByFormat(project.getMin(), DateUtil.Format.YYYY_MM_DD_HH_MI.getValue()));
		project.setEnd_date(DateUtil.getDateByFormat(project.getMax(), DateUtil.Format.YYYY_MM_DD_HH_MI.getValue()));
		project.setDuration(DateUtil.getDistanceMinutesCount(project.getMin(), project.getMax()));
		project.setDurationMin(String.valueOf(project.getDuration()));
		project.setProgress(nowDays > fullDays || fullDays == 0 ? 1 : nowDays/fullDays);
		data.add(project);
		List<Task> temp = new ArrayList<Task>(category.values());
		Collections.sort(temp, new TaskComparator());
		List<Task> subTemp = new ArrayList<Task>(subCategory.values());
		Collections.sort(subTemp, new TaskComparator());
		data.addAll(subTemp);
		data.addAll(temp);
		
//		Iterator<Entry<String, Task>> ie = category.entrySet().iterator();
//		while(ie.hasNext()) {
//			Entry<String, Task> e = ie.next();
//			data.add(e.getValue());
//		}
	}

	@Override
	public void modifyCutoverPreJob(Cutover param) {
		Cutover temp = jiraDao.getCutoverPreJob(param);
		if ("A".equals(param.getMode())) {
			param.setPreJob(temp.getPreJob() == null || "".equals(temp.getPreJob()) 
					? param.getPreJob() : temp.getPreJob() + "," + param.getPreJob());
		} else {
			param.setPreJob(temp.getPreJob().replaceAll("," + param.getPreJob(), ""));
		}
		jiraDao.modifyCutoverPreJob(param);
	}

	@Override
	public RestClientManager getRestClientManager() {
		RestClientManager clientManager = null;
		try {
			clientManager = new RestClientManager(jiraConfig.getJiraUrl(), jiraConfig.getCommonUser(), jiraConfig.getCommonPassword());
		} catch (Exception e) {
			throw new IntegrationException(ErrorCode.SYSTEM_ERROR.getValue(), "Jira Rest Client Connection Fail!!");
		}
		return clientManager;
	}

	@Override
	public void dispose(RestClientManager restClientManager) {
		if (restClientManager != null) {
			// Dispose the client
			try {
				restClientManager.dispose();
			} catch (IOException e) {
				throw new IntegrationException(ErrorCode.SYSTEM_ERROR.getValue(), "Jira Rest Client Close Fail!!");
			}
		}
	}

	@Override
//	@Scheduled(cron="0 0/1 * * * ? ")
	public void syncCutoverJiraInfo() {
		final String jiraUnSync = System.getProperty("jiraUnSync");
		if (jiraUnSync == null || jiraUnSync.equals("N")) {
			if (this.updateRestClientManager == null) {
				synchronized(sync){
					this.updateRestClientManager = this.getRestClientManager();
				}
			}
			StringBuffer sb = new StringBuffer();
			Date checkDate = DateUtil.addMinute(DateUtil.getNow(), -10);
			sb.append("project = '").append(jiraConfig.getProject()).append("'")
			  .append(" and issuetype = \"").append(jiraConfig.getIssueTypeName()).append("\"")
			  .append(" and updatedDate >= '").append(DateUtil.getDateByFormat(checkDate, DateUtil.Format.YYYY_MM_DD_HH_MI.getValue())).append("'");
			String jql = sb.toString();
			Set<String> fields = new HashSet<String>(Arrays.asList(new String[] {"-description", "-comment"}));
	    	int maxResults = 50;
			
	    	SearchService searchService = new JqlSearcher(this.updateRestClientManager);
	    	List<Cutover> params = new ArrayList<Cutover>();
	    	for (int startAt=0 ; ; startAt+=maxResults) {
		    	Iterable<Issue> issues = searchService.searchIssues(jql, maxResults, startAt, fields);
				if (issues == null || Iterables.size(issues) == 0) {
					break;
				}
	            for (Issue issue : issues) {
	            	if (issue != null) {
	            		if (issue.getField("customfield_14509") == null) continue;
	            		Cutover param = new Cutover();
	            		param.setJobId((String)issue.getField("customfield_14509").getValue());
	            		param.setJiraStatus(issue.getStatus().getName());
	            		param.setAssignee(issue.getAssignee().getName());
	            		param.setResolution(issue.getResolution() != null ? issue.getResolution().getName() : null);
	            		params.add(param);
	            	}
	             }
	    	}
	    	this.modifyCutoverJiraSync(params);
		}
	}

	@Override
	public String getSaveExcelFile(Cutover param) {
		List<Cutover> temp = jiraDao.getCutoverListByAll(param);
	    HSSFCellStyle titleStyle;
	    HSSFFont titleFont;
	    HSSFCellStyle contentStyle;
	    HSSFFont contentFont;
		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFSheet sheet = workbook.createSheet();
		titleStyle = workbook.createCellStyle();
		titleStyle.setFillForegroundColor(HSSFColor.PALE_BLUE.index);
		titleStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		titleStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		
		titleFont = workbook.createFont();
		titleFont.setFontName(HSSFFont.FONT_ARIAL);
		titleStyle.setFont(titleFont);

		contentStyle = workbook.createCellStyle();
		contentStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		
		contentFont = workbook.createFont();
		contentFont.setFontName(HSSFFont.FONT_ARIAL);
		contentStyle.setFont(contentFont);
		
		int rowIndex = 0;
		int no = 0;
		HSSFRow row = null;
    	HSSFCell cell = null;
    	row = sheet.createRow(rowIndex++);
    	
    	this.setExcelTitle(row, cell, titleStyle);
    	
    	for (Cutover obj : temp) {
    		row = sheet.createRow(rowIndex++);
    		this.setExcelContent(obj, sheet, row, cell, contentStyle, ++no);
    	}
    	
    	String filePath = FileUtil.saveExcel(workbook, EXCEL_CONTEXT_PATH);
		return filePath;
	}
	
	private static final String EXCEL_CONTEXT_PATH = "C:/BSS/temp";
	
	
	private void setExcelContent(Cutover obj, HSSFSheet sheet, HSSFRow row, HSSFCell cell, HSSFCellStyle contentStyle, int rowIndex) {
		int index = 0;
		cell = row.createCell(index++);
    	cell.setCellValue(rowIndex);
    	cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
    	cell.setCellValue(obj.getJobId());
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(codeService.getCodeName("15104", obj.getCutoverTh()));
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(codeService.getCodeName("15105", obj.getJobStep()));
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(codeService.getCodeName("15106", obj.getJobType()));
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(codeService.getCodeName("15107", obj.getyCategory()));
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(obj.getxCategory());
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(obj.getTask());
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(obj.getActivity());
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(codeService.getCodeName("15110", obj.getJobExecutionTeam()));
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(obj.getJobExecutor());
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(obj.getPreJob());
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(obj.getStartExpectDate());
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(obj.getStartExpectTime());
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(obj.getEndExpectDate());
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(obj.getEndExpectTime());
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(obj.getDuration());
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(obj.getCaution());
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(obj.getSupervisor());
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(codeService.getCodeName("15108", obj.getSystemType()));
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(obj.getJobCheckList());
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(obj.getJiraId());
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(obj.getItemAuthorName());
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(obj.getItemCreateDate());
    	cell.setCellStyle(contentStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue(obj.getItemUpdateDate());
    	cell.setCellStyle(contentStyle);
    	this.setAutoSize(sheet, index);
	}
	private void setAutoSize(HSSFSheet sheet, int index) {
		for (int i=0;i < index;i++){
			sheet.autoSizeColumn(i);
		}
	}
	
	private void setExcelTitle(HSSFRow row, HSSFCell cell, HSSFCellStyle titleStyle) {
		int index = 0;
    	cell = row.createCell(index++);
    	cell.setCellValue("No");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("Job Id");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("시나리오 구분");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("전환단계");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("전환단계상세");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("작업단계");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("중분류");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("Task");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("주요 Activity");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("작업실행팀");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("작업실행자");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("선행작업 Task");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("예정시작일");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("예정시작시각");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("예정종료일");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("예정종료시각");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("소요시간(분)");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("Critical Task");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("작업확인자");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("시스템/모듈");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("고려사항");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("JIRA ID");
    	cell.setCellStyle(titleStyle);

    	cell = row.createCell(index++);
    	cell.setCellValue("최종변경자");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("최초등록일시");
    	cell.setCellStyle(titleStyle);
    	cell = row.createCell(index++);
    	cell.setCellValue("최종변경일시");
    	cell.setCellStyle(titleStyle);
	}

	@Override
	public List<CutoverDetail> getCutorvetDetailList(CutoverDetail param) {
		return jiraDao.getCutoverDetailList(param);
	}

	@Override
	@Transactional
	public void saveCutoverDetail(List<CutoverDetail> params) {
		jiraDao.removeCutoverDetail(params);
		jiraDao.addCutoverDetail(params);
	}

	@Override
	public CutoverDashboard getCutoverDashboardInfo(CutoverDashboard param) {
		CutoverDashboard result = new CutoverDashboard();
		Cutover paramTemp = new Cutover();
		paramTemp.setCutoverTh(param.getCutoverTh() == null ? jiraConfig.getTh() : param.getCutoverTh());
		paramTemp.setJobStep(param.getJobStep() == null ? jiraConfig.getStep() : param.getJobStep());
		paramTemp.setJobType(paramTemp.getJobType() == null ? jiraConfig.getDtl() : param.getJobType());
		paramTemp.setJobExecutionTeam(param.getJobExecutionTeam());
		paramTemp.setSystemType(param.getSystemType());
		paramTemp.setyCategory(param.getyCategory());
		List<Cutover> temps = jiraDao.getCutoverListByAll(paramTemp);
		for (Cutover obj : temps) {
			for (Accumulator accumulator : this.accumulatorList) {
				if (!accumulator.isVaild(obj)) continue;
				accumulator.accumulate(obj, result);
			}
		}
		result.setWorkingRatio(result.getTotalCount() == 0 ? 0 : (double)result.getWorkCompleteCount()/(double)result.getTotalCount());
		return result;
	}

	@Override
	public List<CutoverDashboard> getCutoverDashboardChartInfo(CutoverDashboard param) {
		List<CutoverDashboard> result = new ArrayList<CutoverDashboard>();
		param.setCutoverTh(param.getCutoverTh() == null ? jiraConfig.getTh() : param.getCutoverTh());
		param.setJobStep(param.getJobStep() == null ? jiraConfig.getStep() : param.getJobStep());
		param.setJobType(param.getJobType() == null ? jiraConfig.getDtl() : param.getJobType());
		CutoverDashboard temp = jiraDao.getCutoverDashboardInfo(param);
		CutoverDashboard other = new CutoverDashboard();
		other.setTotalCount(temp.getTotalCount());
		other.setCnt(temp.getTotalCount() - temp.getCnt());
		other.setName(temp.getName());
		other.setData1(100 - temp.getData1());
		result.add(temp);
		result.add(other);
		return result;
	}

	@Override
	public List<CutoverMain> getCutoverMainList(CutoverDashboard param) {
		List<CutoverMain> results = new ArrayList<CutoverMain>();
		Cutover paramTemp = new Cutover();
		paramTemp.setCutoverTh(param.getCutoverTh() == null ? jiraConfig.getTh() : param.getCutoverTh());
		paramTemp.setJobStep(param.getJobStep() == null ? jiraConfig.getStep() : param.getJobStep());
		paramTemp.setJobType(param.getJobType() == null ? jiraConfig.getDtl() : param.getJobType());
		paramTemp.setJobExecutionTeam(param.getJobExecutionTeam());
		paramTemp.setSystemType(param.getSystemType());
		paramTemp.setyCategory(param.getyCategory());
		List<Cutover> temps = jiraDao.getCutoverListByAll(paramTemp);
		param.setMode(param.getMode() != null && "작업대상".equals(param.getMode()) ? null : param.getMode());
		for (Cutover obj : temps) {
			for (Accumulator accumulator : this.accumulatorList) {
				if (!accumulator.isValidFilter(obj, param)) continue;
				accumulator.setFilterTask(obj, param, results);
			}
		}
		return results;
	}

	@Override
	public void assignCutoverTask(List<Cutover> params) {
		RestClientManager restClientManager = this.getRestClientManager();
		String author = integrationCommonService.getSessionUserId();
		author = author == null ? jiraConfig.getCutoverReporter() : author;
		for (Cutover obj : params) {
			if (obj.getJiraId() != null && !"".equals(obj.getJiraId())) {
				this.transitionJiraIssue(restClientManager, obj, author);
			}
		}
		this.modifyCutoverJiraSync(params);
		this.dispose(restClientManager);
	}
	
	private void transitionJiraIssue(RestClientManager restClientManager, Cutover param, String author) {
		Issue issue = null;
		try {
			issue = restClientManager.getExtendedIssueClient().getIssue(param.getJiraId()).claim();
			Iterable<Transition> transitions = restClientManager.getExtendedIssueClient().getTransitions(issue).claim();
			int transitionId = -1;
			for (Transition t : transitions) {
				if (t != null) {
					if (t.getName().equals("작업요청")) {
						transitionId = t.getId();
						break;
					}
				}
			}
			IssueInputBuilder issueInputBuilder = new IssueInputBuilder(issue.getProject(), issue.getIssueType());
			BasicUser assignee = new BasicUser(new URI(jiraConfig.getJiraUrl() + jiraConfig.getUserUri() + param.getJobExecutor()), param.getJobExecutor(), param.getJobExecutor());
			issueInputBuilder.setAssignee(assignee);
			restClientManager.getExtendedIssueClient().update(issue, issueInputBuilder.build()).claim();
			restClientManager.getExtendedIssueClient().transition(issue, new TransitionInput(transitionId, Collections.<FieldInput>emptyList(), Comment.valueOf("Cut-Over Task 할당"))).claim();
			
			Issue transitionedIssue = restClientManager.getExtendedIssueClient().getIssue(param.getJiraId()).claim();
			param.setJiraStatus(transitionedIssue.getStatus().getName());
			param.setAssignee(param.getJobExecutor());
			param.setJiraSyncMessage("Completed");		
			param.setItemStatus("ASSIGN_COMPLETE");
		} catch (Exception ex) {
			param.setJiraSyncMessage("Jira Sync Error :" + ex.getMessage());
			param.setItemStatus("ASSIGN_FAILED");
		}
	}

	@Override
	public void modifyCutoverStatus(List<Cutover> params) {
		jiraDao.modifyCutoverStatus(params);
	}

//	@Scheduled(cron="0 * * * * ? ")
	@Override
	public void processChangeRequestData() {
		final String jiraUnSync = System.getProperty("jiraUnSync");
		if (jiraUnSync == null || jiraUnSync.equals("N")) {
			JiraDefaultData defaultData = jiraDao.getCutvoerDefaultValue();
			List<SourceJiraInfo> datas = this.getChangeRequestList(defaultData);
			this.processChangeRequestData(datas);
		}
	}
	
	
	@Transactional
	private void processChangeRequestData(List<SourceJiraInfo> params) {
		jiraDao.addChangeRequest(params);
	}
	
	
	@Transactional(readOnly=true)
	private List<SourceJiraInfo> getChangeRequestList(JiraDefaultData defaultData) {
		SourceJiraInfo param = new SourceJiraInfo();
		param.setProjectId(Integer.parseInt(defaultData.getChangeRequestProjectId()));
		param.setIssueTypeId(Integer.parseInt(defaultData.getChangeRequestIssueTypeId()));
		Date searchDate = DateUtil.addMinute(DateUtil.getNow(), -20);
		param.setSearchDate(DateUtil.getDateByFormat(searchDate, DateUtil.Format.YYYY_MM_DD_HH_MI_SS.getValue()));
//		param.setSearchDate("2015-01-01 00:00:00");
		return sourceJiraDao.getChangeRequestJiraList(param);
	}

	@Override
	public List<ChangeRequestComboInfo> getChangeRequestJiraComboList(ChangeRequestComboInfo param) {
		Date searchDate = DateUtil.addDate(DateUtil.getNow(), -30);
		param.setSearchDate(DateUtil.getDateByFormat(searchDate, DateUtil.Format.YYYY_MM_DD_HH_MI_SS.getValue()));
		return jiraDao.getChangeRequestJiraComboList(param);
	}

	@Override
	public List<ChangeRequestJira> getChangeRequestJiraList(ChangeRequestJira param) {
		return jiraDao.getChangeRequestJiraList(param);
	}

	@Override
	@Transactional(readOnly=true)
	public List<JiraComponent> getComponentList(JiraComponent param) {
		return sourceJiraDao.getComponentList(param);
	}

	@Override
	public String processServiceRequestByExcel(ServiceRequest param) {
		Map<String, Map<String, String>> srCounts = new HashMap<String, Map<String, String>>();
		List<ServiceRequest> temps = serviceRequestDao.getServiceRequestList(new ServiceRequest());
		for (ServiceRequest sr : temps) {
			for (String srNo : sr.getSrNo().split(",")) {
				srNo = srNo.trim();
				Map<String, String> programs = srCounts.get(srNo);
				if (programs == null) {
					programs = new HashMap<String, String>();
					srCounts.put(srNo, programs);
				}
				if (!programs.containsKey(sr.getProgramId())) {
					programs.put(sr.getProgramId(), sr.getProgramId());
				}
				
				Map<String, String> programsDone = srCounts.get(srNo + "-100");
				if (programsDone == null) {
					programsDone = new HashMap<String, String>();
					srCounts.put(srNo + "-100", programsDone);
				}
				if (sr.getDoneRatio() == 100 && !programsDone.containsKey(sr.getProgramId())) {
					programsDone.put(sr.getProgramId(), sr.getProgramId());
				}
			}
		}
		
		if (this.updateRestClientManager == null) {
			synchronized(sync){
				this.updateRestClientManager = this.getRestClientManager();
			}
		}
		StringBuffer sb = new StringBuffer();
		sb.append("project = \"").append(param.getProject()).append("\"")
		  .append(" and issuetype = \"").append(param.getIssueTypeName()).append("\"");
		String jql = sb.toString();
		Set<String> fields = new HashSet<String>(Arrays.asList(new String[] {"-description", "-comment"}));
    	int maxResults = 100;
		List<Issue> issueList = new ArrayList<Issue>();
    	SearchService searchService = new JqlSearcher(this.updateRestClientManager);
    	for (int startAt=0 ; ; startAt+=maxResults) {
	    	Iterable<Issue> issues = searchService.searchIssues(jql, maxResults, startAt, fields, 600000);
			if (issues == null || Iterables.size(issues) == 0) {
				break;
			}
			issueList.addAll(Lists.newArrayList(issues));
    	}
    	String key = param.getProject() + "/" + param.getIssueTypeId();
    	List<JiraColumn> columns = this.jiraColumns.get(key);
    	String filePath = this.makeServiceRequestExcel(issueList, columns, srCounts);
    	return filePath;
	}
	
	private String makeServiceRequestExcel(List<Issue> issueList, List<JiraColumn> columns, Map<String, Map<String, String>> srCounts) {
	    HSSFCellStyle titleStyle;
	    HSSFFont titleFont;
	    HSSFCellStyle contentStyle;
	    HSSFFont contentFont;
		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFSheet sheet = workbook.createSheet();
		titleStyle = workbook.createCellStyle();
		titleStyle.setFillForegroundColor(HSSFColor.PALE_BLUE.index);
		titleStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		titleStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		
		titleFont = workbook.createFont();
		titleFont.setFontName(HSSFFont.FONT_ARIAL);
		titleStyle.setFont(titleFont);

		contentStyle = workbook.createCellStyle();
		contentStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		
		contentFont = workbook.createFont();
		contentFont.setFontName(HSSFFont.FONT_ARIAL);
		contentStyle.setFont(contentFont);
		
		int rowIndex = 0;
		int no = 0;
		HSSFRow row = null;
    	HSSFCell cell = null;
    	sheet.setDefaultColumnWidth(30);
    	row = sheet.createRow(rowIndex++);
    	
    	this.setExcelTitle(row, cell, titleStyle, columns, sheet);
    	
    	for (Issue issue : issueList) {
    		row = sheet.createRow(rowIndex++);
    		this.setExcelContent(issue, columns, sheet, row, cell, contentStyle, rowIndex, srCounts);
    	}    	
    	String filePath = FileUtil.saveExcel(workbook, EXCEL_CONTEXT_PATH);
    	return filePath;
	}
	
	private void setExcelContent(Issue issue, List<JiraColumn> columns, HSSFSheet sheet, HSSFRow row, HSSFCell cell, HSSFCellStyle contentStyle, int rowIndex, Map<String, Map<String, String>> srCounts) {
		int index = 0;
		cell = row.createCell(index++);
    	cell.setCellValue(rowIndex);
    	cell.setCellStyle(contentStyle);
    	String srNo = null;
		for (JiraColumn column : columns) {
			for (JiraValueFineder fineder : jiraValueFinederList) {
				if (!fineder.isSupport(column.getColumnType())) continue;
				String value = fineder.getValue(issue, column.getColumnKey());
				cell = row.createCell(index++);
		    	cell.setCellValue(value);
		    	cell.setCellStyle(contentStyle);
		    	if (column.getColumnKey().equals("customfield_15507")) {
		    		srNo = value;
		    	}
			}
		}
		cell = row.createCell(index++);
    	cell.setCellValue(srNo == null ? 0 : srCounts.get(srNo) == null ? 0 : srCounts.get(srNo).size());
    	cell.setCellStyle(contentStyle);
    	
    	cell = row.createCell(index++);
    	cell.setCellValue(srNo == null ? 0 : srCounts.get(srNo + "-100") == null ? 0 : srCounts.get(srNo + "-100").size());
    	cell.setCellStyle(contentStyle);
//    	this.setAutoSize(sheet, index);
	}
	
	private void setExcelTitle(HSSFRow row, HSSFCell cell, HSSFCellStyle titleStyle, List<JiraColumn> columns, HSSFSheet sheet) {
		int index = 0;
    	cell = row.createCell(index++);
    	cell.setCellValue("No");
    	cell.setCellStyle(titleStyle);
//    	sheet.setColumnWidth(index, 5);
		for (JiraColumn column : columns) {
			cell = row.createCell(index++);
	    	cell.setCellValue(column.getColumnName());
	    	cell.setCellStyle(titleStyle);
//	    	sheet.setColumnWidth(index, 30);
		}
		cell = row.createCell(index++);
    	cell.setCellValue("프로그램 전체건수");
    	cell.setCellStyle(titleStyle);
    	
    	cell = row.createCell(index++);
    	cell.setCellValue("프로그램 완료건수");
    	cell.setCellStyle(titleStyle);
//    	sheet.setColumnWidth(index, 30);
	}

}
