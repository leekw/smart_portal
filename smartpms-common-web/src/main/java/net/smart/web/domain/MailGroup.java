package net.smart.web.domain;

import net.smart.common.domain.Common;

public class MailGroup extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5402525685906705626L;
	
	private String mailGroupId;
	private String mailGroupName;
	private String targetMailAddress;
	public String getMailGroupId() {
		return mailGroupId;
	}
	public void setMailGroupId(String mailGroupId) {
		this.mailGroupId = mailGroupId;
	}
	public String getMailGroupName() {
		return mailGroupName;
	}
	public void setMailGroupName(String mailGroupName) {
		this.mailGroupName = mailGroupName;
	}
	public String getTargetMailAddress() {
		return targetMailAddress;
	}
	public void setTargetMailAddress(String targetMailAddress) {
		this.targetMailAddress = targetMailAddress;
	}
	
	

}
