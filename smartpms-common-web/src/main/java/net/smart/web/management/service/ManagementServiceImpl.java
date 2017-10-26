package net.smart.web.management.service;

import java.util.List;

import net.smart.web.domain.management.DeliverablesLog;
import net.smart.web.domain.management.MetaInfo;
import net.smart.web.management.dao.ManagementDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("projectManagementService")
public class ManagementServiceImpl implements ManagementService {
	
	@Autowired
	private ManagementDao managementDao; 

	@Override
	public List<DeliverablesLog> getDeliverablesLogList(DeliverablesLog param) {
		return managementDao.getDeliverablesLogList(param);
	}

	@Override
	public List<MetaInfo> getMetaList(MetaInfo param) {
		return managementDao.getMetaList(param);
	}

}
