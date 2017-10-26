package net.smart.web.jira.dao;

import java.util.List;

import net.smart.web.domain.jira.CrowdUserInfo;

public interface CrowdDao {
	
	public List<CrowdUserInfo> getCrowdUserList(CrowdUserInfo param);

}
