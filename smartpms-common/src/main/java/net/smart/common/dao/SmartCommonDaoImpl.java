package net.smart.common.dao;

import java.util.Map;

import net.smart.common.domain.DataSyncInfo;
import net.smart.common.support.dao.SmartSqlSessionDaoSupport;

import org.springframework.stereotype.Repository;

@Repository("smartCommonDao")
public class SmartCommonDaoImpl extends SmartSqlSessionDaoSupport  implements SmartCommonDao {

	@Override
	public Integer getLimitConnectionCount() {
		return getSqlSession().selectOne("smart.selectLimitConnectionCount");
	}

	@Override
	public Map<String, String> getMainResourceInfo() {
		return getSqlSession().selectOne("smart.selectMainResourceInfo");
	}

	@Override
	public DataSyncInfo getDataSyncInfo(DataSyncInfo param) {
		return getSqlSession().selectOne("smart.selecDataSyncInfo", param);
	}

	@Override
	public void modifyDataSyncInfo(DataSyncInfo param) {
		getSqlSession().update("smart.updateDataSyncInfo", param);
	}

	@Override
	public void addDataSyncInfo(DataSyncInfo param) {
		getSqlSession().insert("smart.insertDataSyncInfo", param);
	}

	@Override
	public DataSyncInfo getInterfaceDateInfo() {
		return getSqlSession().selectOne("smart.selectInterfaceDateInfo");
	}

}
