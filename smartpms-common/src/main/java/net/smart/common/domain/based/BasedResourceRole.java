package net.smart.common.domain.based;

import net.smart.common.domain.Common;

public class BasedResourceRole extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5537373539309815885L;
	
	private String roleId;
	private String resourceId;
	private String resourceName;
	private String resourceType;
	private String includeYn;
	private boolean exclude;
	private String url;
	
	public String getResourceKey() {
		if (this.getResourceType().equals("MENU")
				|| this.getResourceType().equals("IMAGE")) {
			return this.getResourceId();
		} else if(this.getResourceType().equals("PAGE")) {
			return this.getUrl();
		} else if (this.getResourceType().equals("CONTENT")) {
			return this.getUrl();
		}
		return null;
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
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
}
