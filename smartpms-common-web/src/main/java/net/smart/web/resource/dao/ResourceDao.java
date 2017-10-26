package net.smart.web.resource.dao;

import java.util.List;

import net.smart.common.domain.UploadFile;
import net.smart.common.domain.based.UserRole;
import net.smart.web.domain.UserInfo;
import net.smart.web.domain.resource.RegUser;
import net.smart.web.domain.resource.Resource;
import net.smart.web.domain.resource.ResourceRole;

public interface ResourceDao {
	
	public List<Resource> getResourceList(Resource param);
	
	public void addResource(Resource param);
	
	public void removeResource(Resource param);
	
	public void removeResource(List<Resource> params);
	
	public void modifyResource(List<Resource> params);
	
	public void modifyResourceByContent(Resource param);
	
	public void addUploadFile(List<UploadFile> files);
	
	public List<UploadFile> getUploadFileList(UploadFile param);
	
	public void removeUploadFile(UploadFile param);
	
	public List<UserInfo> getUserInfoList(UserInfo param);
	
	public void removeUserRoles(UserInfo param);
	
	public void addUserRoles(List<UserRole> params);
	
	public List<UserRole> getUserRoleList(UserRole param);
	
	public void modifyAccessUserInfo(UserInfo param);
	
	public void addResourceRole(ResourceRole param);
	
	public void modifyResourceRole(ResourceRole param);
	
	public void removeResourceRole(List<ResourceRole> params);
	
	public List<ResourceRole> getResourceRoleList(ResourceRole param);
	
	public List<Resource> getMenuServiceList(Resource param);
	
	public RegUser getRegUser(RegUser param);

}
