package net.smart.web.domain.jira;

import java.util.Map;

import net.smart.common.domain.Common;

public class JiraData extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5651175757594964053L;
	
	private String jsonData;
	private Map<String, String> statInfo;
	private String teamKind;
	private String sesUserId;
	private String isAdmin;
	public String getJsonData() {
		return jsonData;
	}
	public void setJsonData(String jsonData) {
		this.jsonData = jsonData;
	}
	public Map<String, String> getStatInfo() {
		return statInfo;
	}
	public void setStatInfo(Map<String, String> statInfo) {
		this.statInfo = statInfo;
	}
	public String getTeamKind() {
		return teamKind;
	}
	public void setTeamKind(String teamKind) {
		this.teamKind = teamKind;
	}
	public String getSesUserId() {
		return sesUserId;
	}
	public void setSesUserId(String sesUserId) {
		this.sesUserId = sesUserId;
	}
	public String getIsAdmin() {
		return isAdmin;
	}
	public void setIsAdmin(String isAdmin) {
		this.isAdmin = isAdmin;
	}
	

}
