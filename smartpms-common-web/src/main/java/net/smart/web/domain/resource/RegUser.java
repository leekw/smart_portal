package net.smart.web.domain.resource;

import net.smart.common.domain.Common;

public class RegUser extends Common  {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1665543502838572913L;
	
	private String userId;
	private String userName;
	private String userEmail;
	private String userPhotoPath;
	private String userPhoneNumber;
	private String userPassword;
	private String defaultOrgId;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getUserPhotoPath() {
		return userPhotoPath;
	}
	public void setUserPhotoPath(String userPhotoPath) {
		this.userPhotoPath = userPhotoPath;
	}
	public String getUserPhoneNumber() {
		return userPhoneNumber;
	}
	public void setUserPhoneNumber(String userPhoneNumber) {
		this.userPhoneNumber = userPhoneNumber;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	public String getDefaultOrgId() {
		return defaultOrgId;
	}
	public void setDefaultOrgId(String defaultOrgId) {
		this.defaultOrgId = defaultOrgId;
	}
	

}
