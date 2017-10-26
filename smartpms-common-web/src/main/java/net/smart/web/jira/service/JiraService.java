package net.smart.web.jira.service;

import java.util.List;

import net.smart.web.domain.CommonCode;
import net.smart.web.domain.changerequest.ChangeRequestComboInfo;
import net.smart.web.domain.changerequest.ChangeRequestJira;
import net.smart.web.domain.jira.Cutover;
import net.smart.web.domain.jira.CutoverDashboard;
import net.smart.web.domain.jira.CutoverDetail;
import net.smart.web.domain.jira.CutoverMain;
import net.smart.web.domain.jira.GanttInfo;
import net.smart.web.domain.jira.JiraComponent;
import net.smart.web.domain.jira.JiraInfo;
import net.smart.web.domain.jira.JiraOption;
import net.smart.web.domain.jira.ServiceRequest;
import net.smart.web.plugin.jira.rest.client.RestClientManager;

public interface JiraService {
	
	public List<Cutover> getCutoverList(Cutover param);
	
	public List<CommonCode> getCutoverThGroup();
	
	public JiraInfo getJiraInfo();
	
	public boolean isJiraAdmin(String ip);
	
	public String getMaxSyncDate();
	
	public void processJiraSyncData(Cutover cutover);
	
	public void processJiraAutoSyncData();
	
	public List<CommonCode> getTransitionStep();
	
	public void processOpenIssueData();
	
	public void processCrowdUser();
	
	public List<JiraOption> getJiraOptionList(JiraOption param);
	
	public List<Cutover> getCutoverSearchList(Cutover param);
	
	public void saveCutover(List<Cutover> params);
	
	public void saveCutoverDetail(List<CutoverDetail> params);
	
	public void syncCutoverJira(List<Cutover> params);
	
	public List<Cutover> getCutoverListByAll(Cutover param);
	
	public void modifyCutoverSort(List<Cutover> params);
	
	public void modifyCutoverPreJob(Cutover param);
	
	public GanttInfo getGantData(Cutover param);
	
	public RestClientManager getRestClientManager();
	
	public void dispose(RestClientManager restClientManager);
	
	public void syncCutoverJiraInfo();
	
	public String getSaveExcelFile(Cutover param);
	
	public List<CutoverDetail> getCutorvetDetailList(CutoverDetail param);
	
	public CutoverDashboard getCutoverDashboardInfo(CutoverDashboard param);
	
	public List<CutoverDashboard> getCutoverDashboardChartInfo(CutoverDashboard param);
	
	public List<CutoverMain> getCutoverMainList(CutoverDashboard param);
	
	public void assignCutoverTask(List<Cutover> params);
	
	public void modifyCutoverStatus(List<Cutover> params);
	
	public void processChangeRequestData();
	
	public List<ChangeRequestComboInfo> getChangeRequestJiraComboList(ChangeRequestComboInfo param);
	
	public List<ChangeRequestJira> getChangeRequestJiraList(ChangeRequestJira param);
	
	public List<JiraComponent> getComponentList(JiraComponent param);
	
	public String processServiceRequestByExcel(ServiceRequest param);

}
