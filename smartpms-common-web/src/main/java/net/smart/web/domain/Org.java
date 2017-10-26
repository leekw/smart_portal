package net.smart.web.domain;

import net.smart.common.domain.Tree;

public class Org extends Tree {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -8455251283205765195L;
	private String orgId;
	private String orgName;
	private String originalOrgName;
	private String parentOrgId;
	private String orgType;
	private String orgDiv;
	private String excludeOrgDiv;
	private boolean checked;
	private String orgRefValue;
	
	
	public String getOrgRefValue() {
		return orgRefValue;
	}
	public void setOrgRefValue(String orgRefValue) {
		this.orgRefValue = orgRefValue;
	}
	public String getOriginalOrgName() {
		return originalOrgName;
	}
	public void setOriginalOrgName(String originalOrgName) {
		this.originalOrgName = originalOrgName;
	}
	public boolean isChecked() {
		return checked;
	}
	public void setChecked(boolean checked) {
		this.checked = checked;
	}
	public String getExcludeOrgDiv() {
		return excludeOrgDiv;
	}
	public void setExcludeOrgDiv(String excludeOrgDiv) {
		this.excludeOrgDiv = excludeOrgDiv;
	}
	public String getOrgId() {
		return orgId;
	}
	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}
	public String getOrgName() {
		return orgName;
	}
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
	public String getParentOrgId() {
		return parentOrgId;
	}
	public void setParentOrgId(String parentOrgId) {
		this.parentOrgId = parentOrgId;
	}
	public String getOrgType() {
		return orgType;
	}
	public void setOrgType(String orgType) {
		this.orgType = orgType;
	}
	public String getOrgDiv() {
		return orgDiv;
	}
	public void setOrgDiv(String orgDiv) {
		this.orgDiv = orgDiv;
	}
	
}
