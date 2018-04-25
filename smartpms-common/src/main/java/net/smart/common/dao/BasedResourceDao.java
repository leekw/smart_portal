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

public interface BasedResourceDao {
	
	public List<BasedUser> getUserList(BasedUser param);
	
	public List<BasedRole> getRoleList(BasedRole param);
	
	public List<BasedOrg> getOrgList(BasedOrg param);

	public List<BasedOrgRel> getOrgRelationList(BasedOrgRel param);
	
	public List<BasedOrg> getOrgTrees(BasedOrg param);
	
	public BasedUser getUser(BasedUser param);
	
	public void regUser(BasedUser param);
	
	public List<SysPropertie> getSysProperties(SysPropertie param);
	
	public List<BasedResource> getResourceList(BasedResource param);
	
	public List<BasedResourceRole> getResourceRoleList(BasedResourceRole param);
	
	public List<BasedResource> getMenuServiceList(BasedResource param);
	
	public List<BasedFile> getCommonFileList(BasedFile param);
	
	public void addUploadFile(List<BasedFile> params);
	
	public Integer getCommonFileNextSeq();
	
	public void removeUploadFile(BasedFile param);
	
	public void addResource(BasedResource param);
	
	public void removeResource(BasedResource param);
	
	public void removeResource(List<BasedResource> params);
	
	public void modifyResource(List<BasedResource> params);
	
	public void modifyResourceByContent(BasedResource param);
	
	public void addResourceRole(BasedResourceRole param);
	
	public void modifyResourceRole(BasedResourceRole param);
	
	public void removeResourceRole(List<BasedResourceRole> params);
	
	public Map<String, String> getMainResourceInfo();
	
	public void modifySendQueue(SendQueue param);
	
	public void addSendQueue(SendQueue param);
	
	public List<BasedUser> getOrgUserList(BasedUser param);
	
	public List<BasedRole> getOrgRoleList(BasedRole param);
	
	public void addOrgUser(BasedUser param);
	
	public void removeOrgUser(BasedUser param);

	public void addAnalysisMobileFile(BasedFile basedFile);

	public void addAnalysisApk(AnalysisApk analysisApk);

}
