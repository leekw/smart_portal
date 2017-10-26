package net.smart.common.domain.sys;

import net.smart.common.domain.Common;

public class SysPropertie extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3508421763306716250L;
	private String sysPropertieId;
	private String sysPropertieValue;
	public String getSysPropertieId() {
		return sysPropertieId;
	}
	public void setSysPropertieId(String sysPropertieId) {
		this.sysPropertieId = sysPropertieId;
	}
	public String getSysPropertieValue() {
		return sysPropertieValue;
	}
	public void setSysPropertieValue(String sysPropertieValue) {
		this.sysPropertieValue = sysPropertieValue;
	}

}
