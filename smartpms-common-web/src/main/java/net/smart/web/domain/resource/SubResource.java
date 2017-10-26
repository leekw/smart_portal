package net.smart.web.domain.resource;

import java.util.List;

import net.smart.common.domain.Common;

public class SubResource extends Common {
	
	private String resourceId;
	private String resourceName;
	private String parentResourceId;
	private String resourceTypeCode;
	private String url;
	private String resourceContent;
	private int sortNo;
	private String mainResourceYn;
	private String viewType;
	private String allData;
	private List<String> roles;
	private String iconCls;
	private String adminYn;
	private String resourceDepth;
	private boolean include;
	private boolean exclude;
	private String parentResourceName;
	private String roleId;
	private String includeYn;
	private boolean mainResource;
	public String getResourceId() {
		return resourceId;
	}
	public void setResourceId(String resourceId) {
		this.resourceId = resourceId;
	}
	public String getResourceName() {
		return resourceName;
	}
	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}
	public String getParentResourceId() {
		return parentResourceId;
	}
	public void setParentResourceId(String parentResourceId) {
		this.parentResourceId = parentResourceId;
	}
	public String getResourceTypeCode() {
		return resourceTypeCode;
	}
	public void setResourceTypeCode(String resourceTypeCode) {
		this.resourceTypeCode = resourceTypeCode;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getResourceContent() {
		return resourceContent;
	}
	public void setResourceContent(String resourceContent) {
		this.resourceContent = resourceContent;
	}
	public int getSortNo() {
		return sortNo;
	}
	public void setSortNo(int sortNo) {
		this.sortNo = sortNo;
	}
	public String getMainResourceYn() {
		return mainResourceYn;
	}
	public void setMainResourceYn(String mainResourceYn) {
		this.mainResourceYn = mainResourceYn;
	}
	public String getViewType() {
		return viewType;
	}
	public void setViewType(String viewType) {
		this.viewType = viewType;
	}
	public String getAllData() {
		return allData;
	}
	public void setAllData(String allData) {
		this.allData = allData;
	}
	public List<String> getRoles() {
		return roles;
	}
	public void setRoles(List<String> roles) {
		this.roles = roles;
	}
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	public String getAdminYn() {
		return adminYn;
	}
	public void setAdminYn(String adminYn) {
		this.adminYn = adminYn;
	}
	public String getResourceDepth() {
		return resourceDepth;
	}
	public void setResourceDepth(String resourceDepth) {
		this.resourceDepth = resourceDepth;
	}
	public boolean isInclude() {
		return include;
	}
	public void setInclude(boolean include) {
		this.include = include;
	}
	public boolean isExclude() {
		return exclude;
	}
	public void setExclude(boolean exclude) {
		this.exclude = exclude;
	}
	public String getParentResourceName() {
		return parentResourceName;
	}
	public void setParentResourceName(String parentResourceName) {
		this.parentResourceName = parentResourceName;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getIncludeYn() {
		return includeYn;
	}
	public void setIncludeYn(String includeYn) {
		this.includeYn = includeYn;
	}
	public boolean isMainResource() {
		return mainResource;
	}
	public void setMainResource(boolean mainResource) {
		this.mainResource = mainResource;
	}
	
	

}
