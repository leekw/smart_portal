package net.smart.web.domain;

import net.smart.common.domain.Common;

public class MailQueue extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3432070694837960246L;
	
	private int queueId;
	private int noticeId;
	private String sendAddress;
	private String mailSummary;
	private String mailDescription;
	private String sendYn;
	
	
	
	public String getSendYn() {
		return sendYn;
	}
	public void setSendYn(String sendYn) {
		this.sendYn = sendYn;
	}
	public String getMailSummary() {
		return mailSummary;
	}
	public void setMailSummary(String mailSummary) {
		this.mailSummary = mailSummary;
	}
	public String getMailDescription() {
		return mailDescription;
	}
	public void setMailDescription(String mailDescription) {
		this.mailDescription = mailDescription;
	}
	public String getSendAddress() {
		return sendAddress;
	}
	public void setSendAddress(String sendAddress) {
		this.sendAddress = sendAddress;
	}
	public int getQueueId() {
		return queueId;
	}
	public void setQueueId(int queueId) {
		this.queueId = queueId;
	}
	public int getNoticeId() {
		return noticeId;
	}
	public void setNoticeId(int noticeId) {
		this.noticeId = noticeId;
	}

	
}
