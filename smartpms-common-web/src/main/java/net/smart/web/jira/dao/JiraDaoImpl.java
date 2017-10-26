package net.smart.web.jira.dao;

import java.util.List;

import net.smart.common.support.dao.SmartSqlSessionDaoSupport;
import net.smart.common.support.util.DateUtil;
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

@Repository("jiraDao")
public class JiraDaoImpl extends SmartSqlSessionDaoSupport  implements JiraDao  {

	@Override
	public List<Cutover> getCutoverList(Cutover param) {
		return getSqlSession().selectList("jira.selectCutoverList", param);
	}

	@Override
	public List<CommonCode> getCutoverThGroup() {
		return getSqlSession().selectList("jira.selectCutoverThGroup");
	}

	@Override
	public JiraInfo getJiraInfo() {
		return getSqlSession().selectOne("jira.selectJiraInfo");
	}

	@Override
	public List<UserInfo> getJiraAdminList() {
		return getSqlSession().selectList("jira.selectJiraAdminList");
	}

	@Override
	public String getMaxSyncDate() {
		return getSqlSession().selectOne("jira.selectMaxSyncDate");
	}

	@Override
	public List<SourceJiraInfo> getSourceJiraList(SourceJiraInfo param) {
		return getSqlSession().selectList("jira.selectSourceCutoverList", param);
	}

	@Override
	public void updateMaxSyncDate() {
		getSqlSession().update("jira.updateMaxSyncDate");
	}

	@Override
	public void updateCutover(List<SourceJiraInfo> params) {
		for (SourceJiraInfo info : params) {
			getSqlSession().update("jira.updateCutover", info);
		}
	}

	@Override
	public void deleteCutover(Cutover cutover) {
		getSqlSession().delete("jira.deleteCutover", cutover);
	}

	@Override
	public void insertCutover(List<SourceJiraInfo> params) {
		for (SourceJiraInfo info : params) {
			getSqlSession().insert("jira.insertCutover", info);
		}
	}

	@Override
	public List<SourceJiraLink> getSourceJiraLink() {
		return null;
	}

	@Override
	public void updateCutoverIssueLink(List<SourceJiraLink> params) {
		for (SourceJiraLink info : params) {
			getSqlSession().update("jira.updateCutoverIssueLink", info);
		}
	}

	@Override
	public List<CommonCode> getTransitionStep() {
		return getSqlSession().selectList("jira.selectTransitionStep");
	}

	@Override
	public JiraDefaultData getCutvoerDefaultValue() {
		return getSqlSession().selectOne("jira.selectCutvoerDefaultValue");
	}

	@Override
	public void removeOpenIssue(SourceJiraInfo param) {
		getSqlSession().delete("jira.deleteOpenIssue", param);
	}

	@Override
	public void addOpenIssue(List<SourceJiraInfo> params) {
		for (SourceJiraInfo info : params) {
			getSqlSession().update("jira.insertOpenIssue", info);
		}
	}

	@Override
	public List<SourceJiraInfo> getOpenJiraIssueList(SourceJiraInfo param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void mergeCrowdUser(List<CrowdUserInfo> params) {
		for (CrowdUserInfo info : params) {
			int first = info.getDisplayName().indexOf("[");
			int last = info.getDisplayName().indexOf("]");
			if (first != -1 && last != -1 
					&& !"nobody@kt.com".equals(info.getEmailAddress())) {
				info.setTeam(info.getDisplayName().substring(first, last+1));
			} else {
				info.setTeam("[Etc]");
			}
			info.setCreatedDateStr(DateUtil.getDateByFormat(info.getCreatedDate(), DateUtil.Format.YYYYMMDDHHMISS.getValue()));
			info.setUpdatedDateStr(DateUtil.getDateByFormat(info.getUpdatedDate(), DateUtil.Format.YYYYMMDDHHMISS.getValue()));
			getSqlSession().update("jira.mergeCrowdUser", info);
		}
	}

	@Override
	public List<JiraOption> getJiraOptionList(JiraOption param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Cutover> getCutoverSearchList(Cutover param) {
		return getSqlSession().selectList("jira.selectCutoverSearchList", param);
	}
	
	@Override
	public String getNextCutoverJobId() {
		return getSqlSession().selectOne("jira.selectCutoverJobId");
	}

	@Override
	public void mergeCutover(List<Cutover> params) {
		for (Cutover param : params) {
			getSqlSession().update("jira.mergeCutover", param);
		}
	}

	@Override
	public void removeCutover(List<Cutover> params) {
		for (Cutover param : params) {
			getSqlSession().delete("jira.deleteCutoverByUserAdd", param);
		}
		
	}

	@Override
	public List<Cutover> getCutoverListByAll(Cutover param) {
		return getSqlSession().selectList("jira.selectCutoverListByAll", param);
	}

	@Override
	public void modifyCutoverSort(List<Cutover> params) {
		for (Cutover param : params) {
			getSqlSession().update("jira.updateCutoverSort", param);
		}
	}

	@Override
	public void modifyCutoverPreJob(Cutover param) {
		getSqlSession().update("jira.updateCutoverPreJob", param);
	}

	@Override
	public void modifyCutoverJiraSync(List<Cutover> params) {
		for (Cutover param : params) {
			getSqlSession().update("jira.updateCutoverJiraSync", param);
		}
	}

	@Override
	public Cutover getCutoverPreJob(Cutover param) {
		return getSqlSession().selectOne("jira.selectCutoverPreJob", param);
	}

	@Override
	public List<CutoverDetail> getCutoverDetailList(CutoverDetail param) {
		return getSqlSession().selectList("jira.selectCutoverDetailList", param);
	}

	@Override
	public void removeCutoverDetail(List<CutoverDetail> params) {
		for (CutoverDetail param : params) {
			getSqlSession().delete("deleteCutoverDetail", param);
		}
	}

	@Override
	public void addCutoverDetail(List<CutoverDetail> params) {
		for (CutoverDetail param : params) {
			getSqlSession().insert("insertCutoverDetail", param);
		}
	}

	@Override
	public CutoverDashboard getCutoverDashboardInfo(CutoverDashboard param) {
		return getSqlSession().selectOne("jira.selectCutoverDashboardChartInfo", param);
	}

	@Override
	public void modifyCutoverStatus(List<Cutover> params) {
		for (Cutover param : params) {
			getSqlSession().update("jira.updateCutoverStatus", param);
		}
	}

	@Override
	public List<SourceJiraInfo> getChangeRequestJiraList(SourceJiraInfo param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addChangeRequest(List<SourceJiraInfo> params) {
		for (SourceJiraInfo info : params) {
			getSqlSession().update("jira.insertChangeRequest", info);
		}
	}

	@Override
	public List<ChangeRequestComboInfo> getChangeRequestJiraComboList(ChangeRequestComboInfo param) {
		return getSqlSession().selectList("jira.selectChangeRequestJiraComboList", param);
	}

	@Override
	public List<ChangeRequestJira> getChangeRequestJiraList(ChangeRequestJira param) {
		return getSqlSession().selectList("jira.selectChangeRequestJiraLocalList", param);
	}

	@Override
	public List<JiraComponent> getComponentList(JiraComponent param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<JiraColumn> getJiraColumnList(JiraColumn param) {
		return getSqlSession().selectList("jira.selectJiraColumnList", param);
	}

}
