package net.smart.web.resource.service;

import java.util.List;

import net.smart.web.domain.Org;

public interface OrgService {
	
	public List<Org> getOrgList(Org param);
	
	public String getOrgName(String orgId);

}
