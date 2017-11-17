package net.smart.common.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.smart.common.domain.DataSyncInfo;
import net.smart.common.domain.IntUser;
import net.smart.common.domain.based.BasedFile;
import net.smart.common.domain.based.BasedOrg;
import net.smart.common.domain.based.BasedResource;
import net.smart.common.domain.based.BasedResourceRole;
import net.smart.common.domain.based.BasedRole;
import net.smart.common.domain.based.BasedUser;


public interface SmartCommonService {
		
	public boolean isAdmin(String ip);
	
	public boolean isAdmin();
	
	public boolean isCutOverAdmin();
	
	public int getLimitCount();
	
	public Map<String, String> getMainResourceInfo();
	
	public DataSyncInfo getInterfaceDate();
	
	public DataSyncInfo getDataSyncInfo(DataSyncInfo param);
	
	public void modifyDataSyncInfo(DataSyncInfo param);
	
	public void addDataSyncInfo(DataSyncInfo param);
	
	public void beforeDataSyncInfo(DataSyncInfo param);
	
	public void afterDataSyncInfo(DataSyncInfo param);
	
	public boolean isValidInterfaceDate(String type);
	
	public boolean isSuperAmin();
	
	public String getSessionUserId();
	
	public String getSessionUserName();
	
	public boolean isAccessPossible();
	
	public String getSystemDeployVersion();
	
	public boolean isIntegrationDeveloper(String id);
	
	public boolean isPermitExternalUrl(String category);
	
	public List<BasedUser> getUserList(BasedUser param);
	
	public IntUser login(BasedUser param);
	
	public String getOrgPath(String orgId);
	
	public List<BasedOrg> getOrgTrees(BasedOrg param);
	
	public BasedUser getUser(BasedUser param);
	
	public void regUser(BasedUser param);
	
	public String getSysPropertieValue(String key);
	
	public List<String> getSessionRoles();
	
	public List<BasedResource> getResourceList(BasedResource param);
	
	public boolean isPermitResource(List<String> roles, String checkData);
	
	public boolean isPermitResource(String roleId, String checkData);
	
	public List<BasedResource> getMenuServiceList(BasedResource param);
	
	public List<BasedFile> getCommonFileList(BasedFile param);
	
	public Map<String, Object> getFileDownload(HttpServletRequest request);
	
	public void addUploadFile(List<BasedFile> params);
	
	public void removeUploadFile(BasedFile param);
	
	public void addResource(BasedResource param);
	
	public void removeResource(List<BasedResource> params);
	
	public void removeResource(BasedResource param);
	
	public void modifyResource(List<BasedResource> params);
	
	public List<BasedResourceRole> getResourceRoleList(BasedResourceRole param);
	
	public void addResourceRole(BasedResourceRole param);
	
	public void removeResourceRole(List<BasedResourceRole> params);
	
	public void modifyResourceRole(BasedResourceRole param);
	
	public void modifyResourceByContent(BasedResource param);
	
	public Boolean getVaildModifyMenu(String resourceId);
	
	public String getLockMenuByUserName(String resourceId);
	
	public void modifyCompleteMenu(String resourceId);
	
	public List<BasedUser> getOrgUserList(BasedUser param);
	
	public List<BasedRole> getOrgRoleList(BasedRole param);
	
	public void addOrgUser(BasedUser param);
	
	public void removeOrgUser(BasedUser param);

	public String getAnalysisFileDir();
	
}
