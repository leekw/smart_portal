package net.smart.web.portal.dao;

import java.util.List;

import net.smart.common.support.dao.SmartSqlSessionDaoSupport;
import net.smart.web.domain.portal.PortalData;
import net.smart.web.domain.portal.PortalInfo;

import org.springframework.stereotype.Repository;

@Repository("portalDao")
public class PortalDaoImpl extends SmartSqlSessionDaoSupport  implements PortalDao {

	@Override
	public List<PortalData> getPortalStatisticList(PortalData param) {
		return getSqlSession().selectList("portal.selectPortalStatisticList", param);
	}

	@Override
	public void addConnectionUser(List<PortalData> params) {
		for (PortalData obj : params) {
			getSqlSession().insert("portal.insertPortalStatistic", obj);
		}
	}

	@Override
	public void modifyConnectionUser(List<PortalData> params) {
		
	}

	@Override
	public void removeConnectionUser(List<PortalData> params) {
		for (PortalData obj : params) {
			getSqlSession().delete("portal.deletePoralStatistic", obj);
		}
	}

	@Override
	public List<PortalData> getPortalStatisticChart(PortalData param) {
		return getSqlSession().selectList("portal.selectPortalStatisticChart", param);
	}

	@Override
	public List<PortalData> getQuestionChartData(PortalData param) {
		return getSqlSession().selectList("portal.selectPortalStatisticChartByQuestion", param);
	}

	@Override
	public PortalInfo getPortalProjectStatus() {
		return getSqlSession().selectOne("portal.selectPortalProjectStatus");
	}

	@Override
	public void modifyPortalProjectStatus(PortalInfo param) {
		getSqlSession().update("portal.updatePortalProjectStatus", param);
	}

	@Override
	public List<PortalData> getPortalOpenIssueLevel(PortalInfo param) {
		return getSqlSession().selectList("portal.selectPortalOpenIssueLevel", param);
	}

	@Override
	public List<PortalData> getPortalOpenIssueChannel(PortalInfo param) {
		return getSqlSession().selectList("portal.selectPortalOpenIssueChannel", param);
	}

	@Override
	public void initPortalStatisticData() {
		getSqlSession().update("portal.insertPortalStatisticInitData");
	}

	@Override
	public void addOpenJiraHistoryData() {
		getSqlSession().update("portal.insertOpenJiraHistoryData");
	}

	@Override
	public void addOpenJiraLevelHitoryData() {
		getSqlSession().update("portal.insertOpenJiraLevelHitoryData");
	}

	@Override
	public void modifyPortalProjectStatusByMainResource(PortalInfo param) {
		getSqlSession().update("portal.updatePortalProjectStatusByMainResource", param);
	}

	@Override
	public List<PortalData> getOpenJiraOriginationChart() {
		return getSqlSession().selectList("portal.selectOpenJiraOriginationChart");
	}

	@Override
	public List<PortalData> getOpenJiraAccumChart() {
		return getSqlSession().selectList("portal.selectOpenJiraAccumChart");
	}

	@Override
	public List<PortalData> getPortalStatisticChartByDaily(PortalData param) {
		return getSqlSession().selectList("portal.selectPortalStatisticChartByDaily", param);
	}

	@Override
	public List<PortalData> getPortalOpenIssueLevelByDaily(PortalInfo param) {
		return getSqlSession().selectList("portal.selectPortalOpenIssueLevelByDaily", param);
	}

	@Override
	public List<PortalData> getJiraChartByDaily(PortalData param) {
		return getSqlSession().selectList("portal.selectJiraChartByDaily", param);
	}

}
