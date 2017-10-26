package net.smart.web.domain.changerequest;

import net.smart.common.domain.Common;

public class ChangeRequestItem extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5206457911306220169L;
	
	private String repository;
	private String fullpath;
	private String filename;
	private String commitAuthor;
	private String commitDate;
	private String jiraId;
	private String lastUpdateAuthor;
	private String lastUpdateDate;
	private boolean filterUser;
	private String checkinYn;
	private String status;
	
	
	public String getCheckinYn() {
		return checkinYn;
	}
	public void setCheckinYn(String checkinYn) {
		this.checkinYn = checkinYn;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public boolean isFilterUser() {
		return filterUser;
	}
	public void setFilterUser(boolean filterUser) {
		this.filterUser = filterUser;
	}
	public String getRepository() {
		return repository;
	}
	public void setRepository(String repository) {
		this.repository = repository;
	}
	public String getFullpath() {
		return fullpath;
	}
	public void setFullpath(String fullpath) {
		this.fullpath = fullpath;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getCommitAuthor() {
		return commitAuthor;
	}
	public void setCommitAuthor(String commitAuthor) {
		this.commitAuthor = commitAuthor;
	}
	public String getCommitDate() {
		return commitDate;
	}
	public void setCommitDate(String commitDate) {
		this.commitDate = commitDate;
	}
	public String getJiraId() {
		return jiraId;
	}
	public void setJiraId(String jiraId) {
		this.jiraId = jiraId;
	}
	public String getLastUpdateAuthor() {
		return lastUpdateAuthor;
	}
	public void setLastUpdateAuthor(String lastUpdateAuthor) {
		this.lastUpdateAuthor = lastUpdateAuthor;
	}
	public String getLastUpdateDate() {
		return lastUpdateDate;
	}
	public void setLastUpdateDate(String lastUpdateDate) {
		this.lastUpdateDate = lastUpdateDate;
	}
}
