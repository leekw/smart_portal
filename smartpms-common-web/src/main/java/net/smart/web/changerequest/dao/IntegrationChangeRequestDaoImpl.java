package net.smart.web.changerequest.dao;

import java.util.List;

import net.smart.common.support.dao.SmartSqlSessionDaoSupport;
import net.smart.common.support.util.DateUtil;
import net.smart.web.domain.changerequest.ChangeRequestJira;
import net.smart.web.domain.changerequest.ChangeRequestLimit;
import net.smart.web.domain.changerequest.ChangeRequestLog;
import net.smart.web.domain.changerequest.ChangeRequestTarget;
import net.smart.web.domain.changerequest.ChangeRequestVolume;

import org.springframework.stereotype.Repository;

@Repository
public class IntegrationChangeRequestDaoImpl extends SmartSqlSessionDaoSupport implements IntegrationChangeRequestDao {

	@Override
	public List<ChangeRequestTarget> getProgramListByJiraId(ChangeRequestTarget param) {
		return getSqlSession().selectList("changerequest.selectProgramListByJiraId", param);
	}

	

	@Override
	public void mergeChangeRequestJira(ChangeRequestJira param) {
		getSqlSession().update("changerequest.mergeChangeRequestJira", param);
	}

	@Override
	public void removeChangeProgram(ChangeRequestJira param) {
		getSqlSession().delete("changerequest.deleteChangeProgram", param);
	}

	@Override
	public void addChangeProgram(ChangeRequestJira param) {
		for (ChangeRequestTarget obj : param.getTargets()) {
			obj.setJiraId(param.getJiraId());
			obj.setCrRequestDate(DateUtil.getDateByString(param.getJiraCreateDate(), DateUtil.Format.YYYY_MM_DD_HH_MI_SS.getValue()));
			obj.setCrRequester(param.getJiraReporter());
			getSqlSession().insert("changerequest.insertChangeProgram", obj);
		}
	}

	@Override
	public Integer getProgramNextIssueId() {
		return getSqlSession().selectOne("changerequest.selectProgramNextIssueId");
	}
	
	@Override
	public List<ChangeRequestLog> getChangeRequestLogSummary(ChangeRequestLog param) {
		return getSqlSession().selectList("changerequest.selectChangeRequestLogSummary", param);
	}

	@Override
	public void removeChangeRequestLog(ChangeRequestJira param) {
		getSqlSession().delete("changerequest.deleteChangeRequestLog", param);
	}

	@Override
	public void addChangeRequestLog(List<ChangeRequestLog> params) {
		for (ChangeRequestLog param : params) {
			getSqlSession().insert("changerequest.insertChangeRequestLog", param);
		}
	}

	@Override
	public List<ChangeRequestLimit> getChangeRequestLimit(ChangeRequestLimit param) {
		return getSqlSession().selectList("changerequest.selectChangeRequestLimit", param);
	}

	@Override
	public List<ChangeRequestLog> getChangeRequestSummary(ChangeRequestLog param) {
		return getSqlSession().selectList("changerequest.selectChangeRequestSummary", param);
	}


	@Override
	public List<ChangeRequestVolume> getTargetProgramByDeveloper(ChangeRequestVolume param) {
		return getSqlSession().selectList("changerequest.selectTargetProgramByDeveloper", param);
	}

	@Override
	public List<ChangeRequestVolume> getTargerProgramByTeamInfo(ChangeRequestVolume param) {
		return getSqlSession().selectList("changerequest.selectTargerProgramByTeamInfo", param);
	}



	@Override
	public List<ChangeRequestVolume> getSourceProgramByDeveloperSubscribe(ChangeRequestVolume param) {
		return getSqlSession().selectList("changerequest.selectSourceProgramByDeveloperSubscribe", param);
	}
}
