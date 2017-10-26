package net.smart.web.resource.service;

import java.util.List;

import net.smart.common.domain.UploadFile;
import net.smart.web.domain.UserInfo;
import net.smart.web.domain.resource.RegUser;
import net.smart.web.domain.resource.Resource;
import net.smart.web.domain.resource.ResourceRole;

public interface ResourceService {
	
	public List<Resource> getResourceList(Resource param);
	
	public void addResource(Resource param);
	
	public void removeResource(Resource param);
	
	public void removeResource(List<Resource> params);
	
	public void modifyResource(List<Resource> params);
	
	public void modifyResourceByContent(Resource param);
	
	public void addUploadFile(List<UploadFile> params);
	
	public List<UploadFile> getUploadFileList(UploadFile param);
	
	public void removeUploadFile(UploadFile param);
	
	public List<UserInfo> getUserInfoList(UserInfo param);
	
	public void removeUserRoles(UserInfo param);
	
	public void addUserRoles(UserInfo param);
	
	public void modifyUserRoles(UserInfo param);
	
	public void modifyAccessUserInfo(UserInfo param);
	
	public void addResourceRole(ResourceRole param);
	
	public void modifyResourceRole(ResourceRole param);
	
	public void removeResourceRole(List<ResourceRole> params);
	
	public List<ResourceRole> getResourceRoleList(ResourceRole param);
	
	public boolean getVaildModifyMenu(String resourceId);
	
	public void modifyCompleteMenu(String resourceId);
	
	public String getLockMenuByUserName(String resourceId);
	
	public List<Resource> getMenuServiceList(Resource param);
	
	public RegUser getRegUser(RegUser param);
}
