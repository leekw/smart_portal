package net.smart.web.domain.resource;

import net.smart.common.domain.Common;

public class ResourceRole extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7462807370359943823L;
	
	private String roleId;
	private String resourceId;
	private String resourceName;
	private String resourceType;
	private String includeYn;
	private boolean exclude;
	private String url;
	
	
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
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
	public String getResourceType() {
		return resourceType;
	}
	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}
	public String getIncludeYn() {
		return includeYn;
	}
	public void setIncludeYn(String includeYn) {
		this.includeYn = includeYn;
	}
	public boolean isExclude() {
		return exclude;
	}
	public void setExclude(boolean exclude) {
		this.exclude = exclude;
	}
	

}
