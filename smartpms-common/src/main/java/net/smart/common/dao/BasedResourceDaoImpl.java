package net.smart.common.dao;

import java.util.List;
import java.util.Map;

import net.smart.common.domain.AnalysisApk;
import net.smart.common.domain.based.BasedFile;
import net.smart.common.domain.based.BasedOrg;
import net.smart.common.domain.based.BasedOrgRel;
import net.smart.common.domain.based.BasedResource;
import net.smart.common.domain.based.BasedResourceRole;
import net.smart.common.domain.based.BasedRole;
import net.smart.common.domain.based.BasedUser;
import net.smart.common.domain.sys.SendQueue;
import net.smart.common.domain.sys.SysPropertie;
import net.smart.common.support.dao.BasedSqlSessionDaoSupport;

import org.springframework.stereotype.Repository;

@Repository
public class BasedResourceDaoImpl extends BasedSqlSessionDaoSupport implements BasedResourceDao {

	@Override
	public List<BasedUser> getUserList(BasedUser param) {
		return getSqlSession().selectList("based.selectUserList", param);
	}

	@Override
	public List<BasedRole> getRoleList(BasedRole param) {
		return getSqlSession().selectList("based.selectRoleList", param);
	}

	@Override
	public List<BasedOrg> getOrgList(BasedOrg param) {
		return getSqlSession().selectList("based.selectOrgList", param);
	}

	@Override
	public List<BasedOrgRel> getOrgRelationList(BasedOrgRel param) {
		return getSqlSession().selectList("based.selectOrgRelationList", param);
	}

	@Override
	public List<BasedOrg> getOrgTrees(BasedOrg param) {
		return getSqlSession().selectList("based.selectOrgTrees", param);
	}

	@Override
	public BasedUser getUser(BasedUser param) {
		return getSqlSession().selectOne("based.selectUser", param);
	}

	@Override
	public void regUser(BasedUser param) {
		getSqlSession().insert("based.insertUser", param);
	}

	@Override
	public List<SysPropertie> getSysProperties(SysPropertie param) {
		return getSqlSession().selectList("based.selectSysProperites", param);
	}

	@Override
	public List<BasedResource> getResourceList(BasedResource param) {
		return getSqlSession().selectList("based.selectResourceList", param);
	}

	@Override
	public List<BasedResourceRole> getResourceRoleList(BasedResourceRole param) {
		return getSqlSession().selectList("based.selectResourceRoleList", param);
	}

	@Override
	public List<BasedResource> getMenuServiceList(BasedResource param) {
		return getSqlSession().selectList("based.selectMenuServiceList", param);
	}

	@Override
	public List<BasedFile> getCommonFileList(BasedFile param) {
		return getSqlSession().selectList("based.selectCommonFileList", param);
	}

	@Override
	public void addUploadFile(List<BasedFile> params) {
		for (BasedFile file : params) {
			file.setFileNo(this.getCommonFileNextSeq());
			getSqlSession().insert("based.insertCommonFile", file);
			getSqlSession().insert("based.insertCommonFileRelation", file);
		}
	}

	@Override
	public Integer getCommonFileNextSeq() {
		return getSqlSession().selectOne("based.selectCommonFileNextSeq");
	}

	@Override
	public void removeUploadFile(BasedFile param) {
		getSqlSession().delete("based.deleteCommonFile", param);
		getSqlSession().delete("based.deleteCommonFileRelation", param);
	}

	@Override
	public void addResource(BasedResource param) {
		getSqlSession().insert("based.insertResource", param);
	}

	@Override
	public void removeResource(BasedResource param) {
		getSqlSession().delete("based.deleteResource", param);
	}

	@Override
	public void removeResource(List<BasedResource> params) {
		for (BasedResource param : params) {
			getSqlSession().update("based.deleteResource", param);
		}
	}

	@Override
	public void modifyResource(List<BasedResource> params) {
		for (BasedResource param : params) {
			getSqlSession().update("based.updateResource", param);
		}
	}

	@Override
	public void modifyResourceByContent(BasedResource param) {
		getSqlSession().update("based.updateResourceByContent", param);
	}

	@Override
	public void addResourceRole(BasedResourceRole param) {
		getSqlSession().insert("based.insertResourceRole", param);
	}

	@Override
	public void modifyResourceRole(BasedResourceRole param) {
		getSqlSession().update("based.updateResourceRole", param);
	}

	@Override
	public void removeResourceRole(List<BasedResourceRole> params) {
		for (BasedResourceRole param : params) {
			getSqlSession().delete("based.deleteResourceRole", param);
		}
	}

	@Override
	public Map<String, String> getMainResourceInfo() {
		return getSqlSession().selectOne("based.selectMainResourceInfo");
	}

	@Override
	public void modifySendQueue(SendQueue param) {
		getSqlSession().update("based.updateSendQueue", param);
	}

	@Override
	public void addSendQueue(SendQueue param) {
		getSqlSession().insert("based.insertSendQueue", param);
	}

	@Override
	public List<BasedUser> getOrgUserList(BasedUser param) {
		return getSqlSession().selectList("based.selectOrgUserList", param);
	}

	@Override
	public List<BasedRole> getOrgRoleList(BasedRole param) {
		return getSqlSession().selectList("based.selectOrgRoleList", param);
	}

	@Override
	public void addOrgUser(BasedUser param) {
		getSqlSession().insert("based.insertOrgUser", param);
	}

	@Override
	public void removeOrgUser(BasedUser param) {
		getSqlSession().delete("based.deleteOrgUser", param);
	}

	@Override
	public void addAnalysisMobileFile(BasedFile basedFile){
		getSqlSession().insert("based.insertAnalysisMobileFile", basedFile);
	};


	@Override
	public void addAnalysisApk(AnalysisApk analysisApk){
		getSqlSession().insert("based.insertAnalysisApk", analysisApk);
	};

}
