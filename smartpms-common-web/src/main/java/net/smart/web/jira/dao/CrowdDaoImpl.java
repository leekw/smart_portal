package net.smart.web.jira.dao;

import java.util.List;

import net.smart.common.support.dao.CrowdSqlSessionDaoSupport;
import net.smart.web.domain.jira.CrowdUserInfo;

import org.springframework.stereotype.Repository;

@Repository("crowdDao")
public class CrowdDaoImpl extends CrowdSqlSessionDaoSupport implements CrowdDao {

	@Override
	public List<CrowdUserInfo> getCrowdUserList(CrowdUserInfo param) {
		return getSqlSession().selectList("crowd.selectedCrowdUserList", param);
	}

}
