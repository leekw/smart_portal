package net.smart.common.domain.sys;

import java.util.Date;

import net.smart.common.domain.Common;

public class SendQueue extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3980721883172148682L;

	private long sendQueId;
	private Date sendReqDate;
	private Date sendDate;
	private String sendType;
	private String sendSource;
	private String sendTarget;
	private String sendStatus;
	private String sendSubject;
	private String sendDescription;
	
	
	public String getSendSource() {
		return sendSource;
	}
	public void setSendSource(String sendSource) {
		this.sendSource = sendSource;
	}
	public String getSendSubject() {
		return sendSubject;
	}
	public void setSendSubject(String sendSubject) {
		this.sendSubject = sendSubject;
	}
	public long getSendQueId() {
		return sendQueId;
	}
	public void setSendQueId(long sendQueId) {
		this.sendQueId = sendQueId;
	}
	public Date getSendReqDate() {
		return sendReqDate;
	}
	public void setSendReqDate(Date sendReqDate) {
		this.sendReqDate = sendReqDate;
	}
	public Date getSendDate() {
		return sendDate;
	}
	public void setSendDate(Date sendDate) {
		this.sendDate = sendDate;
	}
	public String getSendType() {
		return sendType;
	}
	public void setSendType(String sendType) {
		this.sendType = sendType;
	}
	public String getSendTarget() {
		return sendTarget;
	}
	public void setSendTarget(String sendTarget) {
		this.sendTarget = sendTarget;
	}
	public String getSendStatus() {
		return sendStatus;
	}
	public void setSendStatus(String sendStatus) {
		this.sendStatus = sendStatus;
	}
	public String getSendDescription() {
		return sendDescription;
	}
	public void setSendDescription(String sendDescription) {
		this.sendDescription = sendDescription;
	}
	
}
