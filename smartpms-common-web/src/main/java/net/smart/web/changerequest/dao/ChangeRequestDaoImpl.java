package net.smart.web.changerequest.dao;

import java.util.List;

import net.smart.common.support.dao.PmssSqlSessionDaoSupport;
import net.smart.web.domain.changerequest.ChangeRequestComboInfo;
import net.smart.web.domain.changerequest.ChangeRequestItem;
import net.smart.web.domain.changerequest.ChangeRequestTarget;

import org.springframework.stereotype.Repository;

@Repository
public class ChangeRequestDaoImpl extends PmssSqlSessionDaoSupport implements ChangeRequestDao {

	@Override
	public List<ChangeRequestItem> getChangeRequestTartgetList(ChangeRequestItem param) {
		return getSqlSession().selectList("changerequest.selectChangeRequestTartgetList", param);
	}

	@Override
	public List<ChangeRequestComboInfo> getRepositoryComboList(ChangeRequestComboInfo param) {
		return getSqlSession().selectList("changerequest.selectChangeRequestRepositoryList", param);
	}

	@Override
	public void modifyChangeRequestJira(List<ChangeRequestItem> params, String sessionUserId) {
		for (ChangeRequestItem param : params) {
			param.setLastUpdateAuthor(sessionUserId);
			getSqlSession().update("changerequest.updateChangeRequestJira", param);
		}
	}

	@Override
	public String getSvnValidationCheckYn() {
		return getSqlSession().selectOne("changerequest.selectSvnValidationCheckYn");
	}

	@Override
	public void updateSvnValidationCheckYn(String svnCheckYn) {
		getSqlSession().update("changerequest.updateSvnValidationCheckYn", svnCheckYn);
	}

	@Override
	public List<ChangeRequestTarget> getProgramListByJiraId(ChangeRequestTarget param) {
		return getSqlSession().selectList("changerequest.selectProgramListByJiraId", param);
	}

}
