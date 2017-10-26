package net.smart.common.service;

import java.util.List;

import net.smart.common.domain.based.BasedResource;
import net.smart.common.domain.based.BasedResourceRole;
import net.smart.common.domain.based.BasedRole;
import net.smart.common.domain.based.Role;


public interface RoleService {
	
	public List<Role> getRoleList(Role param);
	
	public void saveRole(Role param);
	
	public void removeRole(Role param);
	
	public void modifyCacheResourceRole();
	
	public List<BasedResourceRole> getInlcudeResourceRoleList();
	
	public List<BasedResourceRole> getExcludeResourceRoleList();
	
	public boolean isPermitResource(List<String> roles, String checkData);
	
	public boolean isPermitResource(String roleId, String checkData);
	
	public List<BasedRole> getRoleInUserList(BasedRole param);
	
	public List<BasedResource> getRoleAuthList(BasedResource param);
	
	public List<BasedResource> getServiceAuthList(BasedResource param);
	
	public void saveAuth(List<BasedResource> params);
	
	public void removeRoleUser(List<Role> params);
	
	public void saveRoleUser(Role param);

}
