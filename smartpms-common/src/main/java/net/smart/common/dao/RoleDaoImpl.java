package net.smart.common.dao;

import java.util.List;

import net.smart.common.domain.based.BasedResource;
import net.smart.common.domain.based.BasedResourceRole;
import net.smart.common.domain.based.BasedRole;
import net.smart.common.domain.based.Role;
import net.smart.common.support.dao.BasedSqlSessionDaoSupport;

import org.springframework.stereotype.Repository;

@Repository
public class RoleDaoImpl extends BasedSqlSessionDaoSupport implements RoleDao {

	@Override
	public List<Role> getRoleList(Role param) {
		return getSqlSession().selectList("based.selecteRoleList", param);
	}

	@Override
	public void removeRole(List<Role> params) {
		for (Role param : params) {
			getSqlSession().delete("based.deleteRole", param);
		}
	}

	@Override
	public void modifyRole(Role param) {
		getSqlSession().update("based.updateRole", param);
	}

	@Override
	public void addRole(Role param) {
		getSqlSession().update("based.insertRole", param);
	}

	@Override
	public List<BasedResourceRole> getResourceRoleList() {
		return getSqlSession().selectList("based.selectResourceRoleList", new BasedResourceRole());
	}

	@Override
	public List<BasedRole> getRoleInUserList(BasedRole param) {
		return getSqlSession().selectList("based.selectRoleInUserList", param);
	}

	@Override
	public List<BasedResource> getRoleAuthList(BasedResource param) {
		return getSqlSession().selectList("based.selectRoleAuthList", param);
	}

	@Override
	public List<BasedResource> getServiceAuthList(BasedResource param) {
		return getSqlSession().selectList("based.selectServiceAuthList", param);
	}

	@Override
	public void mergeAuth(List<BasedResource> params) {
		for (BasedResource param : params) {
			getSqlSession().insert("based.mergeAuth", param);
		}
	}

	@Override
	public void removeAuth(List<BasedResource> params) {
		for (BasedResource param : params) {
			getSqlSession().delete("based.deleteAuth", param);
		}
	}

	@Override
	public void removeRoleUser(List<Role> params) {
		for (Role param : params) {
			getSqlSession().delete("based.deleteRoleUser", param);
		}
	}

	@Override
	public void saveRoleUser(Role param) {
		getSqlSession().insert("based.insertRoleUser", param);
	}

	@Override
	public void mergeRelRole(List<BasedResource> params) {
		for (BasedResource param : params) {
			getSqlSession().insert("based.mergeRelRole", param);
		}
	}

	@Override
	public void removeRelRole(List<BasedResource> params) {
		for (BasedResource param : params) {
			getSqlSession().delete("based.deleteRelRole", param);
		}
	}

}
