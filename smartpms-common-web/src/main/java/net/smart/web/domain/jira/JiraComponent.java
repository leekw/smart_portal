package net.smart.web.domain.jira;

import net.smart.common.domain.Common;

public class JiraComponent extends Common {
	
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 8235854229921533706L;
	private int id;
	private int project;
	private String cname;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getProject() {
		return project;
	}
	public void setProject(int project) {
		this.project = project;
	}
	public String getCname() {
		return cname;
	}
	public void setCname(String cname) {
		this.cname = cname;
	}
	
	
}
