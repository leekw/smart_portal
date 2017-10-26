package net.smart.web.jira.dao;

import java.util.List;

import net.smart.web.domain.CommonCode;
import net.smart.web.domain.UserInfo;
import net.smart.web.domain.changerequest.ChangeRequestComboInfo;
import net.smart.web.domain.changerequest.ChangeRequestJira;
import net.smart.web.domain.jira.CrowdUserInfo;
import net.smart.web.domain.jira.Cutover;
import net.smart.web.domain.jira.CutoverDashboard;
import net.smart.web.domain.jira.CutoverDetail;
import net.smart.web.domain.jira.JiraColumn;
import net.smart.web.domain.jira.JiraComponent;
import net.smart.web.domain.jira.JiraDefaultData;
import net.smart.web.domain.jira.JiraInfo;
import net.smart.web.domain.jira.JiraOption;
import net.smart.web.domain.jira.SourceJiraInfo;
import net.smart.web.domain.jira.SourceJiraLink;

public interface JiraDao {
	
	public List<Cutover> getCutoverList(Cutover param);
	
	public List<CommonCode> getCutoverThGroup();
	
	public JiraInfo getJiraInfo();
	
	public List<UserInfo> getJiraAdminList();
	
	public String getMaxSyncDate();
	
	public List<SourceJiraInfo> getSourceJiraList(SourceJiraInfo param);
	
	public void updateMaxSyncDate();
	
	public void updateCutover(List<SourceJiraInfo> params);
	
	public void deleteCutover(Cutover cutover);
	
	public void insertCutover(List<SourceJiraInfo> params);
	
	public List<SourceJiraLink> getSourceJiraLink();
	
	public void updateCutoverIssueLink(List<SourceJiraLink> params);
	
	public List<CommonCode> getTransitionStep();
	
	public JiraDefaultData getCutvoerDefaultValue();
	
	public void removeOpenIssue(SourceJiraInfo param);
	
	public void addOpenIssue(List<SourceJiraInfo> params);
	
	public void addChangeRequest(List<SourceJiraInfo> params);
	
	public List<SourceJiraInfo> getOpenJiraIssueList(SourceJiraInfo param);
	
	public void mergeCrowdUser(List<CrowdUserInfo> params);
	
	public List<JiraOption> getJiraOptionList(JiraOption param);
	
	public List<Cutover> getCutoverSearchList(Cutover param);
	
	public void mergeCutover(List<Cutover> params);
	
	public void removeCutover(List<Cutover> params);
	
	public void modifyCutoverSort(List<Cutover> params);
	
	public List<Cutover> getCutoverListByAll(Cutover param);
	
	public String getNextCutoverJobId();
	
	public void modifyCutoverPreJob(Cutover param);
	
	public void modifyCutoverJiraSync(List<Cutover> params);
	
	public Cutover getCutoverPreJob(Cutover param);
	
	public List<CutoverDetail> getCutoverDetailList(CutoverDetail param);
	
	public void removeCutoverDetail(List<CutoverDetail> params);
	
	public void addCutoverDetail(List<CutoverDetail> params);
	
	public CutoverDashboard getCutoverDashboardInfo(CutoverDashboard param);
	
	public void modifyCutoverStatus(List<Cutover> params);
	
	public List<SourceJiraInfo> getChangeRequestJiraList(SourceJiraInfo param);
	
	public List<ChangeRequestComboInfo> getChangeRequestJiraComboList(ChangeRequestComboInfo param);
	
	public List<ChangeRequestJira> getChangeRequestJiraList(ChangeRequestJira param);
	
	public List<JiraComponent> getComponentList(JiraComponent param);
	
	public List<JiraColumn> getJiraColumnList(JiraColumn param);
}
