package net.smart.web.management.service;

import java.util.List;

import net.smart.web.domain.management.DeliverablesLog;
import net.smart.web.domain.management.MetaInfo;

public interface ManagementService {
	
	public List<DeliverablesLog> getDeliverablesLogList(DeliverablesLog param);
	
	public List<MetaInfo> getMetaList(MetaInfo param);

}
