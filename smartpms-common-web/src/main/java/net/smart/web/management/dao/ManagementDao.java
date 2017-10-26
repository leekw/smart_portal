package net.smart.web.management.dao;

import java.util.List;

import net.smart.web.domain.management.DeliverablesLog;
import net.smart.web.domain.management.MetaInfo;

public interface ManagementDao {
	
	public List<DeliverablesLog> getDeliverablesLogList(DeliverablesLog param);
	
	public List<MetaInfo> getMetaList(MetaInfo param);

}
