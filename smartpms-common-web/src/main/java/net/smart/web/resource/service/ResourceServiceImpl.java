package net.smart.web.resource.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import javax.annotation.PostConstruct;

import net.smart.common.domain.UploadFile;
import net.smart.common.domain.based.UserRole;
import net.smart.common.service.SmartCommonService;
import net.smart.web.domain.UserInfo;
import net.smart.web.domain.resource.RegUser;
import net.smart.web.domain.resource.Resource;
import net.smart.web.domain.resource.ResourceRole;
import net.smart.web.resource.dao.ResourceDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("resourceService")
public class ResourceServiceImpl implements ResourceService {
	
	@Autowired
	private ResourceDao resourceDao;
	
	private AtomicInteger sync = new AtomicInteger(0);
	
	private Map<String, String> contextData;
	
	@Autowired
	private SmartCommonService integrationCommonService;
	
	@PostConstruct
	private void init() {
		contextData = new HashMap<String, String>();
	}
	
	@Override
	public List<Resource> getResourceList(Resource param) {
		return resourceDao.getResourceList(param);
	}

	@Override
	@Transactional
	public void addResource(Resource param) {
		resourceDao.addResource(param);
	}

	@Override
	@Transactional
	public void removeResource(Resource param) {
		resourceDao.removeResource(param);
	}

	@Override
	@Transactional
	public void modifyResource(List<Resource> params) {
		resourceDao.modifyResource(params);
	}

	@Override
	@Transactional
	public void modifyResourceByContent(Resource param) {
		resourceDao.modifyResourceByContent(param);
		this.modifyCompleteMenu(param.getResourceId());
	}

	@Override
	@Transactional
	public void addUploadFile(List<UploadFile> params) {
		resourceDao.addUploadFile(params);
	}

	@Override
	public List<UploadFile> getUploadFileList(UploadFile param) {
		return resourceDao.getUploadFileList(param);
	}

	@Override
	@Transactional
	public void removeUploadFile(UploadFile param) {
		resourceDao.removeUploadFile(param);
	}

	@Override
	public List<UserInfo> getUserInfoList(UserInfo param) {
		Map<String, List<String>> roles = new HashMap<String, List<String>>();
		List<UserInfo> results = resourceDao.getUserInfoList(param);
		if (results != null && !results.isEmpty()) {
			List<UserRole> userRoleList = resourceDao.getUserRoleList(new UserRole());
			for (UserRole role : userRoleList) {
				List<String> temps = roles.get(role.getUserId());
				if (temps == null) {
					temps = new ArrayList<String>();
					roles.put(role.getUserId(), temps);
				}
				temps.add(role.getRoleId());
			}
			for (UserInfo user : results) {
				user.setRoles(roles.get(user.getUserId()));
			}
		}
		return results;
	}

	@Override
	public void removeUserRoles(UserInfo param) {
		resourceDao.removeUserRoles(param);
	}

	@Override
	public void addUserRoles(UserInfo param) {
		List<UserRole> params = new ArrayList<UserRole>();
		if(param.getRoles() != null && !param.getRoles().isEmpty()) {
			for (String roleId : param.getRoles()) {
				UserRole obj = new UserRole();
				obj.setUserId(param.getUserId());
				obj.setRoleId(roleId);
				params.add(obj);
			}
			resourceDao.addUserRoles(params);
		}
	}

	@Override
	@Transactional
	public void modifyUserRoles(UserInfo param) {
		this.removeUserRoles(param);
		this.addUserRoles(param);;
	}

	@Override
	public void modifyAccessUserInfo(UserInfo param) {
		resourceDao.modifyAccessUserInfo(param);
	}

	@Override
	@Transactional
	public void addResourceRole(ResourceRole param) {
		resourceDao.addResourceRole(param);
		Resource resource = new Resource();
		resource.setParentResourceId(param.getResourceId());
		resource.setViewType("ALL");
		resource.setAllData("Y");
		List<Resource> params = resourceDao.getResourceList(resource);
		for (Resource obj : params) {
			ResourceRole subResource = new ResourceRole();
			subResource.setRoleId(param.getRoleId());
			subResource.setResourceId(obj.getResourceId());
			subResource.setIncludeYn("Y");
			resourceDao.addResourceRole(subResource);
		}
	}

	@Override
	public void removeResourceRole(List<ResourceRole> params) {
		resourceDao.removeResourceRole(params);
	}

	@Override
	public List<ResourceRole> getResourceRoleList(ResourceRole param) {
		return resourceDao.getResourceRoleList(param);
	}

	@Override
	public void modifyResourceRole(ResourceRole param) {
		resourceDao.modifyResourceRole(param);
	}

	@Override
	public boolean getVaildModifyMenu(String resourceId) {
		if (contextData.containsKey(resourceId)) 
			return false;
		
		String displayName = integrationCommonService.getSessionUserName();
		synchronized(sync) {
			contextData.put(resourceId, displayName);
		}
		return true;
	}

	@Override
	public void modifyCompleteMenu(String resourceId) {
		synchronized(sync) {
			contextData.remove(resourceId);
		}
	}

	@Override
	public String getLockMenuByUserName(String resourceId) {
		String result = null;
		synchronized(sync) {
			result = contextData.get(resourceId);
		}
		return result;
	}

	@Override
	public List<Resource> getMenuServiceList(Resource param) {
		return resourceDao.getMenuServiceList(param);
	}

	@Override
	@Transactional
	public void removeResource(List<Resource> params) {
		resourceDao.removeResource(params);
	}

	@Override
	public RegUser getRegUser(RegUser param) {
		return resourceDao.getRegUser(param);
	}

}
