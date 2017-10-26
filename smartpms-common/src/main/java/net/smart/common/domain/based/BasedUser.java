package net.smart.common.domain.based;

import java.util.List;

import net.smart.common.domain.Common;

public class BasedUser extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3117207658004350339L;
	private String userId;
	private String userPassword;
	private String ip;
	private String userName;
	private String emailAddress;
	private List<String> roles;
	private String searchValue;
	private String userNo;
	private String userType;
	private String phoneNumber;
	private String status;
	private String createDate;
	private String lastActiveDate;
	private String expirationDate;
	private String defaultOrgId;
	private String photoPath;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmailAddress() {
		return emailAddress;
	}
	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}
	public List<String> getRoles() {
		return roles;
	}
	public void setRoles(List<String> roles) {
		this.roles = roles;
	}
	public String getSearchValue() {
		return searchValue;
	}
	public void setSearchValue(String searchValue) {
		this.searchValue = searchValue;
	}
	public String getUserNo() {
		return userNo;
	}
	public void setUserNo(String userNo) {
		this.userNo = userNo;
	}
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public String getLastActiveDate() {
		return lastActiveDate;
	}
	public void setLastActiveDate(String lastActiveDate) {
		this.lastActiveDate = lastActiveDate;
	}
	public String getExpirationDate() {
		return expirationDate;
	}
	public void setExpirationDate(String expirationDate) {
		this.expirationDate = expirationDate;
	}
	public String getDefaultOrgId() {
		return defaultOrgId;
	}
	public void setDefaultOrgId(String defaultOrgId) {
		this.defaultOrgId = defaultOrgId;
	}
	public String getPhotoPath() {
		return photoPath;
	}
	public void setPhotoPath(String photoPath) {
		this.photoPath = photoPath;
	}

}
