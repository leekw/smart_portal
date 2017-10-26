package net.smart.common.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import javax.annotation.PostConstruct;

import net.smart.common.dao.RoleDao;
import net.smart.common.domain.based.BasedResource;
import net.smart.common.domain.based.BasedResourceRole;
import net.smart.common.domain.based.BasedRole;
import net.smart.common.domain.based.Role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("roleService")
public class RoleServiceImpl implements RoleService {
	
	
	@Autowired
	private RoleDao roleDao;
	
	@Autowired
	private SmartCommonService smartCommonService;
	
	private Map<String, Map<String, BasedResourceRole>> resourceRoleData;
	
	private AtomicInteger sync = new AtomicInteger(0);
	
	@PostConstruct
	public void init(){
		if (resourceRoleData == null) {
			resourceRoleData = new HashMap<String, Map<String, BasedResourceRole>>();
			synchronized(sync){
				resourceRoleData = this.getCacheResourceRole();
			}
		}
	}
	
	@Override
//	@Scheduled(cron="0 0/1 * * * ? ")
	public void modifyCacheResourceRole() {
		synchronized(sync){
			resourceRoleData.clear();
			resourceRoleData = this.getCacheResourceRole();
		}
	}
	
	private Map<String, Map<String, BasedResourceRole>> getCacheResourceRole() {
		Map<String, Map<String, BasedResourceRole>> result = new HashMap<String, Map<String, BasedResourceRole>>();
		List<BasedResourceRole> temps = roleDao.getResourceRoleList();
		for (BasedResourceRole obj : temps) {
			String key = obj.getResourceKey();
			Map<String, BasedResourceRole> resource = result.get(obj.getRoleId());
			if (resource == null) {
				resource = new HashMap<String, BasedResourceRole>();
				result.put(obj.getRoleId(), resource);
			}
			resource.put(key, obj);
		}
		return result;
	}
	

	@Override
	public List<Role> getRoleList(Role param) {
		return roleDao.getRoleList(param);
	}

	@Override
	@Transactional(value="transactionManagerBased")
	public void saveRole(Role param) {
		if (param.getMode() != null && param.getMode().equals("R")) {
			roleDao.modifyRole(param);
		} else {
			roleDao.addRole(param);
			BasedResourceRole defaultRole = new BasedResourceRole();
			defaultRole.setRoleId(param.getRoleId());
			defaultRole.setResourceId("RE_00013");
			defaultRole.setIncludeYn("Y");
			smartCommonService.addResourceRole(defaultRole);
			defaultRole = new BasedResourceRole();
			defaultRole.setRoleId(param.getRoleId());
			defaultRole.setResourceId("RE_00014");
			defaultRole.setIncludeYn("Y");
			smartCommonService.addResourceRole(defaultRole);
		}
	}

	@Override
	public void removeRole(Role param) {
		List<Role> params = new ArrayList<Role>();
		params.add(param);
		roleDao.removeRole(params);
	}

	@Override
	public List<BasedResourceRole> getInlcudeResourceRoleList() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<BasedResourceRole> getExcludeResourceRoleList() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isPermitResource(String roleId, String checkData) {
		Map<String, BasedResourceRole> data = resourceRoleData.get(roleId);
		if (data == null || data.isEmpty()) return false;
		BasedResourceRole result = data.get(checkData);
		return data != null && !data.isEmpty() ?  (result == null ? false : (result.isExclude() ? false : true)) : false ;
	}

	@Override
	public boolean isPermitResource(List<String> roles, String checkData) {
		boolean isPermit = false;
		for (String role : roles ) {
			isPermit = this.isPermitResource(role, checkData);
			if (isPermit) return true; 
		}
		return isPermit;
	}

	@Override
	public List<BasedRole> getRoleInUserList(BasedRole param) {
		return roleDao.getRoleInUserList(param);
	}

	@Override
	public List<BasedResource> getRoleAuthList(BasedResource param) {
		param.setParentResourceId("TOP");
		List<BasedResource> results = roleDao.getRoleAuthList(param);
		param.setParentResourceId("TOP2");
		List<BasedResource> temps = roleDao.getRoleAuthList(param);
		results.addAll(temps);		
		return results;
	}

	@Override
	public List<BasedResource> getServiceAuthList(BasedResource param) {
		return roleDao.getServiceAuthList(param);
	}

	@Override
	@Transactional(value="transactionManagerBased")
	public void saveAuth(List<BasedResource> params) {
		List<BasedResource> delList = new ArrayList<BasedResource>();
		List<BasedResource> modList = new ArrayList<BasedResource>();
		for (BasedResource obj : params) {
			obj.setAuthId(obj.getResourceId());
			if (!obj.isExclude() && !obj.isInclude()) {
				delList.add(obj);
			} else {
				if (obj.isExclude()) {
					obj.setIncludeYn("N");
				} else {
					obj.setIncludeYn("Y");
				}
				modList.add(obj);
			}
		}
		
		roleDao.removeAuth(params);
		roleDao.mergeAuth(modList);

		roleDao.removeRelRole(params);
		roleDao.mergeRelRole(modList);
		
	}

	@Override
	@Transactional(value="transactionManagerBased")
	public void removeRoleUser(List<Role> params) {
		roleDao.removeRoleUser(params);
	}

	@Override
	public void saveRoleUser(Role param) {
		roleDao.saveRoleUser(param);
	}

}
