package net.smart.common.service;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import net.smart.common.dao.BasedResourceDao;
import net.smart.common.domain.DataSyncInfo;
import net.smart.common.domain.IntUser;
import net.smart.common.domain.UserDetail;
import net.smart.common.domain.based.BasedFile;
import net.smart.common.domain.based.BasedOrg;
import net.smart.common.domain.based.BasedOrgRel;
import net.smart.common.domain.based.BasedResource;
import net.smart.common.domain.based.BasedResourceRole;
import net.smart.common.domain.based.BasedRole;
import net.smart.common.domain.based.BasedUser;
import net.smart.common.domain.sys.SysPropertie;
import net.smart.common.exception.IntegrationException;
import net.smart.common.support.security.StringEncrypter;
import net.smart.common.support.util.DateUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("smartCommonService")
public class SmartCommonServiceImpl implements SmartCommonService {
	
	@Autowired
	private BasedResourceDao basedResourceDao;
	
	private int limitCount;
	
	private Map<String, String> mainResource;
	
	private Map<String, String> developerData;
	
	private Map<String, String> permitUrls;
	
	private DataSyncInfo interfaceDate;
	
	private AtomicInteger dateSync = new AtomicInteger(0);
	
	private AtomicInteger syncCount = new AtomicInteger(0);
	
	private Map<String, BasedOrg> orgData;
	private Map<String, BasedOrgRel> orgRelationData;
	private Map<String, SysPropertie> sysProperties;
	private Map<String, Map<String, BasedResourceRole>> resourceRoleData;
	private Map<String, String> contextData;
	
	@Value("${system.deploy.version}")
	private String systemDeployVersion;
	
	@Value("${integration.developers}")
	private String developers;
	
	
	public String getDevelopers() {
		return developers;
	}


	public void setDevelopers(String developers) {
		this.developers = developers;
	}


	public String getSystemDeployVersion() {
		return systemDeployVersion;
	}

	
	public int getLimitCount() {
		return this.limitCount;
	}
	
	
	
	@PostConstruct
	public void init() {
		this.setDeveloperData();
		this.setExternalPermitUrl();
		this.setOrgData();
		this.setOrgRelationData();
		this.setSysProperties();
		this.setResourceRoles();
		contextData = new ConcurrentHashMap<String, String>();
		
		this.limitCount = Integer.parseInt(sysProperties.get("LIMIT_CONNECTION") == null ? "-1" : sysProperties.get("LIMIT_CONNECTION").getSysPropertieValue());
		this.mainResource = basedResourceDao.getMainResourceInfo();
		
		if (sysProperties.get("CUTOVER_START_DATE") != null) {
			this.interfaceDate = new DataSyncInfo(sysProperties.get("CUTOVER_START_DATE").getSysPropertieValue(),
					sysProperties.get("CUTOVER_END_DATE").getSysPropertieValue(),
					sysProperties.get("DEFECT_START_DATE").getSysPropertieValue(),
					sysProperties.get("DEFECT_END_DATE").getSysPropertieValue());
		}
	}
	
	private void setResourceRoles() {
		if (resourceRoleData == null) {
			resourceRoleData = this.getCacheResourceRole();
		}
	}
	
	private Map<String, Map<String, BasedResourceRole>> getCacheResourceRole() {
		Map<String, Map<String, BasedResourceRole>> result = new ConcurrentHashMap<String, Map<String, BasedResourceRole>>();
		List<BasedResourceRole> temps = basedResourceDao.getResourceRoleList(new BasedResourceRole());
		for (BasedResourceRole obj : temps) {
			String key = obj.getResourceKey();
			Map<String, BasedResourceRole> resource = result.get(obj.getRoleId());
			if (resource == null) {
				resource = new ConcurrentHashMap<String, BasedResourceRole>();
				result.put(obj.getRoleId(), resource);
			}
			resource.put(key, obj);
		}
		return result;
	}
	
	
	
	private void setSysProperties() {
		if (this.sysProperties == null) {
			this.sysProperties = new ConcurrentHashMap<String, SysPropertie>();
			List<SysPropertie> temps = basedResourceDao.getSysProperties(new SysPropertie());
			for (SysPropertie pro : temps) {
				this.sysProperties.put(pro.getSysPropertieId(), pro);
			}
		}
	}
	
	private void setOrgData() {
		if (this.orgData == null) {
			this.orgData = new ConcurrentHashMap<String, BasedOrg>();
			List<BasedOrg> temps = basedResourceDao.getOrgList(new BasedOrg());
			for (BasedOrg org : temps) {
				this.orgData.put(org.getOrgId(), org);
			}
		}
	}
	
	private void setOrgRelationData() {
		if (this.orgRelationData == null) {
			this.orgRelationData = new ConcurrentHashMap<String, BasedOrgRel>();
			List<BasedOrgRel> temps = basedResourceDao.getOrgRelationList(new BasedOrgRel());
			for (BasedOrgRel rel : temps) {
				this.orgRelationData.put(rel.getSourceOrgId(), rel);
			}
		}
	}
	
	private void setExternalPermitUrl() {
		this.permitUrls = new HashMap<String, String>();
		this.permitUrls.put("nlayout", "nlayout");
		this.permitUrls.put("nlayoutm", "nlayoutm");
		this.permitUrls.put("ncutoverm", "ncutoverm");
		this.permitUrls.put("stabilizationm", "stabilizationm");
	}
	
	private void setDeveloperData() {
		this.developerData = new HashMap<String, String>();
		for (String dev : developers.split(",")) {
			this.developerData.put(dev, dev);
		}
	}
	
	@Override
	public boolean isAdmin(String ip) {
		if (this.isSuperAmin()) return true;
		return false;
	}

	@Override
	public Map<String, String> getMainResourceInfo() {
		return this.mainResource;
	}

	@Override
	public DataSyncInfo getDataSyncInfo(DataSyncInfo param) {
//		return smartCommonDao.getDataSyncInfo(param);
		return null;
	}

	@Override
	@Transactional
	public void modifyDataSyncInfo(DataSyncInfo param) {
//		smartCommonDao.modifyDataSyncInfo(param);
	}

	@Override
	@Transactional
	public void addDataSyncInfo(DataSyncInfo param) {
//		smartCommonDao.addDataSyncInfo(param);
	}

	@Override
	public void beforeDataSyncInfo(DataSyncInfo param) {
		DataSyncInfo temp = this.getDataSyncInfo(param);
		param.setInsert(temp == null ? true : false); 
		param.setLastSyncDate(temp == null ? DateUtil.getDateByString("20000101", DateUtil.Format.YYYYMMDD.getValue()) : temp.getLastSyncDate());
	}

	@Override
	public void afterDataSyncInfo(DataSyncInfo param) {
		param.setLastSyncDate(DateUtil.getNow());
		if (param.isInsert()) {
			this.addDataSyncInfo(param);
		} else {
			this.modifyDataSyncInfo(param);
		}
	}

	@Override
	public boolean isValidInterfaceDate(String type) {
		Date startDate = null;
		Date endDate = null;
		if ("cutover".equals(type)){
			startDate = DateUtil.getDateByString(this.interfaceDate.getCutoverStartDate(), DateUtil.Format.YYYY_MM_DD.getValue());
			endDate  = DateUtil.getDateByString(this.interfaceDate.getCutoverEndDate(), DateUtil.Format.YYYY_MM_DD.getValue());
		} else {
			startDate = DateUtil.getDateByString(this.interfaceDate.getDefectStartDate(), DateUtil.Format.YYYY_MM_DD.getValue());
			endDate  = DateUtil.getDateByString(this.interfaceDate.getDefectEndDate(), DateUtil.Format.YYYY_MM_DD.getValue());
		}
		
		return DateUtil.isBetweenDate(startDate, endDate, DateUtil.getNow());
	}
	
	private IntUser getIntUser() {
		SecurityContext securityContext = SecurityContextHolder.getContext();
		if (securityContext != null ) {
			Authentication authentication = securityContext.getAuthentication();
			if (authentication != null) {
				if (authentication.getDetails() != null) {
					try {
						UserDetail userDetail = (UserDetail) authentication.getDetails();
						IntUser intUser = userDetail.getIntUser();
						return intUser;
					} catch (Exception e) {
						return null;
					}
				}
			}
		}
		return null;
	}

	@Override
	public boolean isSuperAmin() {
		IntUser intUser = this.getIntUser();
		if (intUser != null && intUser.getAuthorityList() != null && !intUser.getAuthorityList().isEmpty()) {
			for (GrantedAuthority obj : intUser.getAuthorityList()) {
				if ("ROLE_SUPER".equals(obj.getAuthority())) 
					return true;
			}
		}
		return false;
	}

	@Override
	public String getSessionUserId() {
		IntUser intUser = this.getIntUser();
		if (intUser != null) {
			return intUser.getUserId();
		}
		return null;
	}

	@Override
	public boolean isAccessPossible() {
		IntUser intUser = this.getIntUser();
		if (intUser != null) {
			return intUser.isAccess();
		}
		return false;
	}

	@Override
	public String getSessionUserName() {
		IntUser intUser = this.getIntUser();
		if (intUser != null) {
			return intUser.getUserName();
		}
		return null;
	}

	@Override
	public boolean isAdmin() {
		IntUser intUser = this.getIntUser();
		if (intUser != null && intUser.getAuthorityList() != null && !intUser.getAuthorityList().isEmpty()) {
			for (GrantedAuthority obj : intUser.getAuthorityList()) {
				if ("ROLE_SUPER".equals(obj.getAuthority())
						|| "ROLE_ADMIN".equals(obj.getAuthority())) 
					return true;
			}
		}
		return false;
	}


	@Override
	public DataSyncInfo getInterfaceDate() {
		return this.interfaceDate;
	}


	@Override
	public boolean isIntegrationDeveloper(String id) {
		return developerData.containsKey(id);
	}


	@Override
	public boolean isPermitExternalUrl(String category) {
		return this.permitUrls.containsKey(category);
	}


	@Override
	public boolean isCutOverAdmin() {
		IntUser intUser = this.getIntUser();
		if (intUser != null && intUser.getAuthorityList() != null && !intUser.getAuthorityList().isEmpty()) {
			for (GrantedAuthority obj : intUser.getAuthorityList()) {
				if ("CUTOVER_JIRA_SYNC".equals(obj.getAuthority())) 
					return true;
			}
		}
		return false;
	}


	@Override
	public List<BasedUser> getUserList(BasedUser param) {
		return basedResourceDao.getUserList(param);
	}


	@Override
	public IntUser login(BasedUser param) {
		StringEncrypter se = new StringEncrypter(false);
		String checkParamPassword;
		try {
			checkParamPassword = se.encrypt(param.getUserPassword());
		} catch (Exception e) {
			throw new IntegrationException("ERROR.0006", "사용자 패스워드 Encription 도중 오류가 발생되었습니다.");
		}
		IntUser result = new IntUser();
		result.setUserId(param.getUserId());
		result.setLoginDate(DateUtil.getNowByFormat(DateUtil.Format.YYYY_MM_DD_HH_MI_SS.getValue()));
		result.setIp(param.getIp());
		param.setMaxRowSize(1);
		List<BasedUser> users = basedResourceDao.getUserList(param);
		boolean isAccess = false;
		String userName = null;
		if (users == null || users.isEmpty()) {
			throw new IntegrationException("ERROR.0007");
		}
		if (!checkParamPassword.equals(users.get(0).getUserPassword())) {
			throw new IntegrationException("ERROR.0008");
		}
		isAccess = users.get(0).getStatus().equals("USED");
		userName = users.get(0).getUserName();
		if (!isAccess) {
			throw new IntegrationException("ERROR.0009");
		}
		
		this.setSessionAuth(users.get(0), result);
		
		result.setPhotoPath(users.get(0).getPhotoPath());
		result.setAccess(isAccess);
		result.setUserName(userName);

		return result;
	}

	private void setSessionAuth(BasedUser user, IntUser result) {
		List<BasedRole> roles = new ArrayList<BasedRole>();
		BasedRole roleParam = new BasedRole();
		roleParam.setTargetId(user.getUserId());
		roleParam.setRelationType("USER");
		List<BasedRole> userRoles = basedResourceDao.getRoleList(roleParam);
		if (userRoles != null && !userRoles.isEmpty()) roles.addAll(userRoles);
		
		if (user.getDefaultOrgId() != null) {
			String orgPath =  this.getOrgPath(user.getDefaultOrgId());
			for (String org : orgPath.split("/")) {
				roleParam.setTargetId(org);
				roleParam.setRelationType("ORG");
				List<BasedRole> orgRoles = basedResourceDao.getRoleList(roleParam);
				if (orgRoles != null && !orgRoles.isEmpty()) roles.addAll(orgRoles);
			}
		}
		
		if (roles == null || roles.isEmpty()) {
			throw new IntegrationException("ERROR.0010");
		}
		
		List<GrantedAuthority> temps = new ArrayList<GrantedAuthority>();
		GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_USER");
		temps.add(authority);
		for (BasedRole role : roles) {
			authority = new SimpleGrantedAuthority(role.getRoleId());
			temps.add(authority);
		}
		result.setAuthorityList(temps);
	}


	@Override
	public String getOrgPath(String orgId) {
		StringBuffer path = new StringBuffer();
		this.setOrgPaht(orgId, path);
		return path.toString();
	}

	private void setOrgPaht(String orgId, StringBuffer path) {
		BasedOrgRel temp = this.orgRelationData.get(orgId);
		if (temp != null)  {
			path.append(temp.getSourceOrgId()).append("/");
		}
		if (temp != null && !temp.getTargetOrgId().equals("TOP")) {
			this.setOrgPaht(temp.getTargetOrgId(), path);
		}
	}


	@Override
	public List<BasedOrg> getOrgTrees(BasedOrg param) {
		return basedResourceDao.getOrgTrees(param);
	}


	@Override
	public BasedUser getUser(BasedUser param) {
		return basedResourceDao.getUser(param);
	}


	@Override
	public void regUser(BasedUser param) {
		StringEncrypter stringEncrypter = new StringEncrypter(false);
		param.setStatus("REQUEST");
		try {
			param.setUserPassword(stringEncrypter.encrypt(param.getUserPassword()));
		} catch (Exception e) {
			throw new IntegrationException("ERROR.0006", "사용자 패스워드 Encription 도중 오류가 발생되었습니다.");
		}
		basedResourceDao.regUser(param);
	}


	@Override
	public String getSysPropertieValue(String key) {
		return this.sysProperties.get(key).getSysPropertieValue();
	}


	@Override
	public List<String> getSessionRoles() {
		SecurityContext securityContext = SecurityContextHolder.getContext();
		if (securityContext != null ) {
			Authentication authentication = securityContext.getAuthentication();
			if (authentication != null) {
				List<String> roles=  new ArrayList<String>();
				for (GrantedAuthority role : authentication.getAuthorities()) {
					roles.add(role.getAuthority());
				}
				return roles;
			}
		}
		return null;
	}


	@Override
	public List<BasedResource> getResourceList(BasedResource param) {
		return basedResourceDao.getResourceList(param);
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
	public List<BasedResource> getMenuServiceList(BasedResource param) {
		return basedResourceDao.getMenuServiceList(param);
	}


	@Override
	public List<BasedFile> getCommonFileList(BasedFile param) {
		return basedResourceDao.getCommonFileList(param);
	}


	@Override
	public Map<String, Object> getFileDownload(HttpServletRequest request) {
		String path = request.getParameter("filePath");
		String fileName = request.getParameter("fileName");
		String temp = request.getParameter("fileNo");
		if (temp != null && !"".equals(temp)) {
			BasedFile param = new BasedFile();
			param.setFileNo(Integer.parseInt(temp));
			List<BasedFile> temps = this.getCommonFileList(param);
			if (temps != null && !temps.isEmpty()) {
				fileName = temps.get(0).getFileName();
			}
		}
		if (path == null) {
			throw new IntegrationException("ERROR.0001", "대상 파일이 존재하지 않습니다.");
		}
		File file = new File(path);
		if (!file.exists()) throw new IntegrationException("ERROR.0001", "대상 파일이 존재하지 않습니다.");

		Map<String, Object> data = new HashMap<String, Object>();
		data.put("downloadFile", file);
		data.put("fileName", fileName);
		
		return data;
	}


	@Override
	public void addUploadFile(List<BasedFile> params) {
		basedResourceDao.addUploadFile(params);
	}


	@Override
	public void removeUploadFile(BasedFile param) {
		basedResourceDao.removeUploadFile(param);
	}


	@Override
	public void addResource(BasedResource param) {
		basedResourceDao.addResource(param);
	}


	@Override
	public void removeResource(List<BasedResource> params) {
		basedResourceDao.removeResource(params);
	}


	@Override
	public void removeResource(BasedResource param) {
		basedResourceDao.removeResource(param);
	}



	@Override
	public void modifyResource(List<BasedResource> params) {
		basedResourceDao.modifyResource(params);
	}


	@Override
	public List<BasedResourceRole> getResourceRoleList(BasedResourceRole param) {
		return basedResourceDao.getResourceRoleList(param);
	}


	@Override
	public void addResourceRole(BasedResourceRole param) {
		basedResourceDao.addResourceRole(param);
	}


	@Override
	public void removeResourceRole(List<BasedResourceRole> params) {
		basedResourceDao.removeResourceRole(params);
	}


	@Override
	public void modifyResourceRole(BasedResourceRole param) {
		basedResourceDao.modifyResourceRole(param);
	}


	@Override
	public void modifyResourceByContent(BasedResource param) {
		basedResourceDao.modifyResourceByContent(param);
	}


	@Override
	public Boolean getVaildModifyMenu(String resourceId) {
		if (contextData.containsKey(resourceId)) 
			return false;
		
		String displayName = this.getSessionUserName();
		contextData.put(resourceId, displayName);
		return true;
	}


	@Override
	public String getLockMenuByUserName(String resourceId) {
		return contextData.get(resourceId);
	}


	@Override
	public void modifyCompleteMenu(String resourceId) {
		contextData.remove(resourceId);
	}


	@Override
	public List<BasedUser> getOrgUserList(BasedUser param) {
		return basedResourceDao.getOrgUserList(param);
	}


	@Override
	public List<BasedRole> getOrgRoleList(BasedRole param) {
		return basedResourceDao.getOrgRoleList(param);
	}


	@Override
	@Transactional(value="transactionManagerBased")
	public void addOrgUser(BasedUser param) {
		basedResourceDao.addOrgUser(param);
	}


	@Override
	@Transactional(value="transactionManagerBased")
	public void removeOrgUser(BasedUser param) {
		basedResourceDao.removeOrgUser(param);
	}

}
