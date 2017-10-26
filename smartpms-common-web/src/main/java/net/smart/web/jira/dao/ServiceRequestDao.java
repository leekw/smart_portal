package net.smart.web.jira.dao;

import java.util.List;

import net.smart.web.domain.jira.ServiceRequest;

public interface ServiceRequestDao {
	
	public List<ServiceRequest> getServiceRequestList(ServiceRequest param);

}
