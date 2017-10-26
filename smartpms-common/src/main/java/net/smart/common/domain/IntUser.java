package net.smart.common.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public class IntUser extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 4983835495714484068L;
	private String userId;
	private String userPassword;
	private String ip;
	private String userName;
	private String loginDate;
	private List<Authority> authorities;
	private List<ExceptionAuthority> exceptionAuthorities;
	private List<GrantedAuthority> authorityList;
	private int rowId;
	private String sessionId;
	private boolean access;
	private String lastActionUrl;
	private Date lastActionDate;
	private String lastActionDateByStr;
	private String photoPath;
	
	
	public String getPhotoPath() {
		return photoPath;
	}
	public void setPhotoPath(String photoPath) {
		this.photoPath = photoPath;
	}
	public String getLastActionDateByStr() {
		return lastActionDateByStr;
	}
	public void setLastActionDateByStr(String lastActionDateByStr) {
		this.lastActionDateByStr = lastActionDateByStr;
	}
	public String getLastActionUrl() {
		return lastActionUrl;
	}
	public void setLastActionUrl(String lastActionUrl) {
		this.lastActionUrl = lastActionUrl;
	}
	public Date getLastActionDate() {
		return lastActionDate;
	}
	public void setLastActionDate(Date lastActionDate) {
		this.lastActionDate = lastActionDate;
	}
	public boolean isAccess() {
		return access;
	}
	public void setAccess(boolean access) {
		this.access = access;
	}
	public String getSessionId() {
		return sessionId;
	}
	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}
	public int getRowId() {
		return rowId;
	}
	public void setRowId(int rowId) {
		this.rowId = rowId;
	}
	public String getLoginDate() {
		return loginDate;
	}
	public void setLoginDate(String loginDate) {
		this.loginDate = loginDate;
	}
	public List<GrantedAuthority> getAuthorityList() {
		if (authorityList == null) {
			authorityList = new ArrayList<GrantedAuthority>();
			if (authorities != null && !authorities.isEmpty()) {
				for (Authority role : authorities) {
					GrantedAuthority authority = new SimpleGrantedAuthority(role.getId());
					authorityList.add(authority);
				}
			}
		}
		return authorityList;
	}
	public void setAuthorityList(List<GrantedAuthority> authorityList) {
		this.authorityList = authorityList;
	}
	public List<Authority> getAuthorities() {
		return authorities;
	}
	public void setAuthorities(List<Authority> authorities) {
		this.authorities = authorities;
	}
	public List<ExceptionAuthority> getExceptionAuthorities() {
		return exceptionAuthorities;
	}
	public void setExceptionAuthorities(
			List<ExceptionAuthority> exceptionAuthorities) {
		this.exceptionAuthorities = exceptionAuthorities;
	}
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
	
	

}
