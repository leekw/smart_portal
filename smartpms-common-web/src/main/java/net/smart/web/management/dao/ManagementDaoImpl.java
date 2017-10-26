package net.smart.web.management.dao;

import java.util.List;

import net.smart.common.support.dao.SmartSqlSessionDaoSupport;
import net.smart.web.domain.management.DeliverablesLog;
import net.smart.web.domain.management.MetaInfo;

import org.springframework.stereotype.Repository;

@Repository
public class ManagementDaoImpl extends SmartSqlSessionDaoSupport implements  ManagementDao  {

	@Override
	public List<DeliverablesLog> getDeliverablesLogList(DeliverablesLog param) {
		return getSqlSession().selectList("management.selectDeliverablesLogList", param);
	}

	@Override
	public List<MetaInfo> getMetaList(MetaInfo param) {
		return getSqlSession().selectList("management.selectMetaList", param);
	}

}
