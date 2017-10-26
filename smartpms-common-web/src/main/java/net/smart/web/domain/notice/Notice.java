package net.smart.web.domain.notice;

import net.smart.common.domain.Common;

public class Notice extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5822258186546264770L;
	
	private int noticeId;
	private String noticeTitle;
	private String noticeTeam;
	private String noticeLevel;
	private String noticeCreateDate;
	private String noticePublishType;
	private String noticePublishDate;
	private int noticeRetryCount;
	private int noticeRetryCycle;
	private String noticeDescription;
	private String startSearchDate;
	private String endSeachDate;
	private String mailGroupId;
	private String mailGroupName;
	private String dataMode;
	private String noticeTemplate;
	private String mailAddress;
	private String noticeMainYn;
	private boolean main;
	
	
	public boolean isMain() {
		return main;
	}
	public void setMain(boolean main) {
		this.main = main;
	}
	public String getNoticeMainYn() {
		return noticeMainYn;
	}
	public void setNoticeMainYn(String noticeMainYn) {
		this.noticeMainYn = noticeMainYn;
	}
	public String getMailAddress() {
		return mailAddress;
	}
	public void setMailAddress(String mailAddress) {
		this.mailAddress = mailAddress;
	}
	public String getNoticeTemplate() {
		return noticeTemplate;
	}
	public void setNoticeTemplate(String noticeTemplate) {
		this.noticeTemplate = noticeTemplate;
	}
	public String getDataMode() {
		return dataMode;
	}
	public void setDataMode(String dataMode) {
		this.dataMode = dataMode;
	}
	public String getMailGroupName() {
		return mailGroupName;
	}
	public void setMailGroupName(String mailGroupName) {
		this.mailGroupName = mailGroupName;
	}
	public String getMailGroupId() {
		return mailGroupId;
	}
	public void setMailGroupId(String mailGroupId) {
		this.mailGroupId = mailGroupId;
	}
	public String getStartSearchDate() {
		return startSearchDate;
	}
	public void setStartSearchDate(String startSearchDate) {
		this.startSearchDate = startSearchDate;
	}
	public String getEndSeachDate() {
		return endSeachDate;
	}
	public void setEndSeachDate(String endSeachDate) {
		this.endSeachDate = endSeachDate;
	}
	public int getNoticeId() {
		return noticeId;
	}
	public void setNoticeId(int noticeId) {
		this.noticeId = noticeId;
	}
	public String getNoticeTitle() {
		return noticeTitle;
	}
	public void setNoticeTitle(String noticeTitle) {
		this.noticeTitle = noticeTitle;
	}
	public String getNoticeTeam() {
		return noticeTeam;
	}
	public void setNoticeTeam(String noticeTeam) {
		this.noticeTeam = noticeTeam;
	}
	public String getNoticeLevel() {
		return noticeLevel;
	}
	public void setNoticeLevel(String noticeLevel) {
		this.noticeLevel = noticeLevel;
	}
	public String getNoticeCreateDate() {
		return noticeCreateDate;
	}
	public void setNoticeCreateDate(String noticeCreateDate) {
		this.noticeCreateDate = noticeCreateDate;
	}
	public String getNoticePublishType() {
		return noticePublishType;
	}
	public void setNoticePublishType(String noticePublishType) {
		this.noticePublishType = noticePublishType;
	}
	public String getNoticePublishDate() {
		return noticePublishDate;
	}
	public void setNoticePublishDate(String noticePublishDate) {
		this.noticePublishDate = noticePublishDate;
	}
	public int getNoticeRetryCount() {
		return noticeRetryCount;
	}
	public void setNoticeRetryCount(int noticeRetryCount) {
		this.noticeRetryCount = noticeRetryCount;
	}
	public int getNoticeRetryCycle() {
		return noticeRetryCycle;
	}
	public void setNoticeRetryCycle(int noticeRetryCycle) {
		this.noticeRetryCycle = noticeRetryCycle;
	}
	public String getNoticeDescription() {
		return noticeDescription;
	}
	public void setNoticeDescription(String noticeDescription) {
		this.noticeDescription = noticeDescription;
	}
	
	

}
