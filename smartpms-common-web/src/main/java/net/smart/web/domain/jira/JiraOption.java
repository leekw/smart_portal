package net.smart.web.domain.jira;

import net.smart.common.domain.Common;

public class JiraOption extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5855453635669608686L;
	
	private int customfield;
	private int id;
	private String customvalue;
	private int sequence;
	public int getCustomfield() {
		return customfield;
	}
	public void setCustomfield(int customfield) {
		this.customfield = customfield;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCustomvalue() {
		return customvalue;
	}
	public void setCustomvalue(String customvalue) {
		this.customvalue = customvalue;
	}
	public int getSequence() {
		return sequence;
	}
	public void setSequence(int sequence) {
		this.sequence = sequence;
	}
}
