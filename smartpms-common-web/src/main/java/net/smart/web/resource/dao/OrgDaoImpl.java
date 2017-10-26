package net.smart.web.resource.dao;

import java.util.List;

import net.smart.common.support.dao.SmartSqlSessionDaoSupport;
import net.smart.web.domain.Org;

import org.springframework.stereotype.Repository;

@Repository
public class OrgDaoImpl extends SmartSqlSessionDaoSupport implements OrgDao {

	@Override
	public List<Org> getOrgList(Org param) {
		return getSqlSession().selectList("org.selectOrgList", param);
	}

}
