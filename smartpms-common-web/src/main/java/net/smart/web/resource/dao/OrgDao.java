package net.smart.web.resource.dao;

import java.util.List;

import net.smart.web.domain.Org;

public interface OrgDao {
	
	public List<Org> getOrgList(Org param);

}
