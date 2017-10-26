package net.smart.web.domain;

import net.smart.common.domain.Common;

public class SubSample extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6049127322841675216L;
	
	private String subName;
	private String subId;
	public String getSubName() {
		return subName;
	}
	public void setSubName(String subName) {
		this.subName = subName;
	}
	public String getSubId() {
		return subId;
	}
	public void setSubId(String subId) {
		this.subId = subId;
	}

}
