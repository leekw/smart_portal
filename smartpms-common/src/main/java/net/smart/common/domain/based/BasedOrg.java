package net.smart.common.domain.based;

import net.smart.common.domain.Common;

public class BasedOrg extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1582545533339929628L;
	
	private String orgId;
	private String orgName;
	private String orgType;
	private String orgDetailType;
	private boolean leaf;
	private String parentOrgId;
	private boolean checked;
	
	
	public boolean isChecked() {
		return checked;
	}
	public void setChecked(boolean checked) {
		this.checked = checked;
	}
	public String getParentOrgId() {
		return parentOrgId;
	}
	public void setParentOrgId(String parentOrgId) {
		this.parentOrgId = parentOrgId;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
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
	public String getOrgType() {
		return orgType;
	}
	public void setOrgType(String orgType) {
		this.orgType = orgType;
	}
	public String getOrgDetailType() {
		return orgDetailType;
	}
	public void setOrgDetailType(String orgDetailType) {
		this.orgDetailType = orgDetailType;
	}

}
