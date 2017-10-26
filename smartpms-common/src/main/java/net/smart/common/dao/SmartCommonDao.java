package net.smart.common.dao;

import java.util.Map;

import net.smart.common.domain.DataSyncInfo;

public interface SmartCommonDao {
		
	public Integer getLimitConnectionCount();
	
	public Map<String, String> getMainResourceInfo();
	
	public DataSyncInfo getDataSyncInfo(DataSyncInfo param);
	
	public void modifyDataSyncInfo(DataSyncInfo param);
	
	public void addDataSyncInfo(DataSyncInfo param);
	
	public DataSyncInfo getInterfaceDateInfo();
	

}
