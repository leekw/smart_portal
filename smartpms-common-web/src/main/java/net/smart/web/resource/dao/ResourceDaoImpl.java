package net.smart.web.resource.dao;

import java.util.List;

import net.smart.common.domain.UploadFile;
import net.smart.common.domain.based.UserRole;
import net.smart.common.support.dao.SmartSqlSessionDaoSupport;
import net.smart.web.domain.UserInfo;
import net.smart.web.domain.resource.RegUser;
import net.smart.web.domain.resource.Resource;
import net.smart.web.domain.resource.ResourceRole;

import org.springframework.stereotype.Repository;

@Repository
public class ResourceDaoImpl extends SmartSqlSessionDaoSupport implements ResourceDao {

	@Override
	public List<Resource> getResourceList(Resource param) {
		return getSqlSession().selectList("resource.selectResourceList", param);
	}

	@Override
	public void addResource(Resource param) {
		getSqlSession().insert("resource.insertResource", param);
	}

	@Override
	public void removeResource(Resource param) {
		getSqlSession().delete("resource.deleteResource", param);
	}

	@Override
	public void modifyResource(List<Resource> params) {
		for (Resource param : params) {
			getSqlSession().update("resource.updateResource", param);
		}
	}

	@Override
	public void modifyResourceByContent(Resource param) {
		getSqlSession().update("resource.updateResourceByContent", param);
	}

	@Override
	public void addUploadFile(List<UploadFile> files) {
		for (UploadFile file : files) {
			getSqlSession().insert("resource.insertUploadFile", file);
		}
	}

	@Override
	public List<UploadFile> getUploadFileList(UploadFile param) {
		return getSqlSession().selectList("resource.selectUploadFileList", param);
	}

	@Override
	public void removeUploadFile(UploadFile param) {
		getSqlSession().delete("resource.deleteUploadFile", param);
	}

	@Override
	public List<UserInfo> getUserInfoList(UserInfo param) {
		return getSqlSession().selectList("resource.selectUserList", param);
	}

	@Override
	public void removeUserRoles(UserInfo param) {
		getSqlSession().delete("resource.deleteUserRole", param);
	}

	@Override
	public void addUserRoles(List<UserRole> params) {
		for (UserRole param : params) {
			getSqlSession().insert("resource.inserUserRole", param);
		}
	}

	@Override
	public List<UserRole> getUserRoleList(UserRole param) {
		return getSqlSession().selectList("resource.selectUserRoleList", param);
	}

	@Override
	public void modifyAccessUserInfo(UserInfo param) {
		getSqlSession().update("resource.updateAccessUserInfo", param);
	}

	@Override
	public void addResourceRole(ResourceRole param) {
		getSqlSession().insert("resource.insertResourceRole", param);
	}

	@Override
	public void removeResourceRole(List<ResourceRole> params) {
		for (ResourceRole param : params) {
			getSqlSession().delete("resource.deleteResourceRole", param);
		}
	}

	@Override
	public List<ResourceRole> getResourceRoleList(ResourceRole param) {
		return getSqlSession().selectList("resource.selectResourceRoleList", param);
	}

	@Override
	public void modifyResourceRole(ResourceRole param) {
		getSqlSession().update("resource.updateResourceRole", param);
	}

	@Override
	public List<Resource> getMenuServiceList(Resource param) {
		return getSqlSession().selectList("resource.selectMenuServiceList", param);
	}

	@Override
	public void removeResource(List<Resource> params) {
		for (Resource param : params) {
			this.removeResource(param);
		}
	}

	@Override
	public RegUser getRegUser(RegUser param) {
		return getSqlSession().selectOne("resource.selectUser", param);
	}

}
