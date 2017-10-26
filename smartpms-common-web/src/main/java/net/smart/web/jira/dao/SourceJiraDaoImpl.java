package net.smart.web.jira.dao;

import java.util.List;

import net.smart.common.support.dao.JiraSqlSessionDaoSupport;
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

import org.springframework.stereotype.Repository;

@Repository("sourceJiraDao")
public class SourceJiraDaoImpl extends JiraSqlSessionDaoSupport implements JiraDao {

	@Override
	public List<Cutover> getCutoverList(Cutover param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CommonCode> getCutoverThGroup() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public JiraInfo getJiraInfo() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<UserInfo> getJiraAdminList() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getMaxSyncDate() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<SourceJiraInfo> getSourceJiraList(SourceJiraInfo param) {
		return getSqlSession().selectList("jira.selectSourceCutoverList", param);
	}

	@Override
	public void updateMaxSyncDate() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateCutover(List<SourceJiraInfo> params) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteCutover(Cutover cutover) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void insertCutover(List<SourceJiraInfo> params) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<SourceJiraLink> getSourceJiraLink() {
		return getSqlSession().selectList("selectJiraIssueLinkList");
	}

	@Override
	public void updateCutoverIssueLink(List<SourceJiraLink> params) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<CommonCode> getTransitionStep() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public JiraDefaultData getCutvoerDefaultValue() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void removeOpenIssue(SourceJiraInfo param) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addOpenIssue(List<SourceJiraInfo> params) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<SourceJiraInfo> getOpenJiraIssueList(SourceJiraInfo param) {
		return getSqlSession().selectList("jira.selectOpenIssueList", param);
	}

	@Override
	public void mergeCrowdUser(List<CrowdUserInfo> params) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<JiraOption> getJiraOptionList(JiraOption param) {
		return getSqlSession().selectList("jira.selectCutoverOptionList", param);
	}

	@Override
	public List<Cutover> getCutoverSearchList(Cutover param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void mergeCutover(List<Cutover> params) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeCutover(List<Cutover> params) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Cutover> getCutoverListByAll(Cutover param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getNextCutoverJobId() {
		return null;
		// TODO Auto-generated method stub
		
	}

	@Override
	public void modifyCutoverSort(List<Cutover> params) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void modifyCutoverPreJob(Cutover param) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void modifyCutoverJiraSync(List<Cutover> param) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Cutover getCutoverPreJob(Cutover param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CutoverDetail> getCutoverDetailList(CutoverDetail param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void removeCutoverDetail(List<CutoverDetail> params) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addCutoverDetail(List<CutoverDetail> params) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public CutoverDashboard getCutoverDashboardInfo(CutoverDashboard param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void modifyCutoverStatus(List<Cutover> params) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<SourceJiraInfo> getChangeRequestJiraList(SourceJiraInfo param) {
		return getSqlSession().selectList("jira.selectChangeRequestJiraList", param);
	}

	@Override
	public void addChangeRequest(List<SourceJiraInfo> params) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<ChangeRequestComboInfo> getChangeRequestJiraComboList(ChangeRequestComboInfo param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ChangeRequestJira> getChangeRequestJiraList(
			ChangeRequestJira param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<JiraComponent> getComponentList(JiraComponent param) {
		return getSqlSession().selectList("jira.selectComponentList", param);
	}

	@Override
	public List<JiraColumn> getJiraColumnList(JiraColumn param) {
		// TODO Auto-generated method stub
		return null;
	}

}
