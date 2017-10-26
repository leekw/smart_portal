package net.smart.common.dao;

import java.util.List;

import net.smart.common.domain.based.BasedResource;
import net.smart.common.domain.based.BasedResourceRole;
import net.smart.common.domain.based.BasedRole;
import net.smart.common.domain.based.Role;

public interface RoleDao {
	
	public List<Role> getRoleList(Role param);
	
	public void removeRole(List<Role> params);
	
	public void modifyRole(Role param);
	
	public void addRole(Role param);
	
	public List<BasedResourceRole> getResourceRoleList();
	
	public List<BasedRole> getRoleInUserList(BasedRole param);
	
	public List<BasedResource> getRoleAuthList(BasedResource param);
	
	public List<BasedResource> getServiceAuthList(BasedResource param);
	
	public void mergeAuth(List<BasedResource> params);
	
	public void removeAuth(List<BasedResource> params);
	
	public void mergeRelRole(List<BasedResource> params);
	
	public void removeRelRole(List<BasedResource> params);
	
	public void removeRoleUser(List<Role> params);
	
	public void saveRoleUser(Role param);

}
