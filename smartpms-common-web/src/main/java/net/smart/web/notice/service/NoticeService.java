package net.smart.web.notice.service;

import java.util.List;

import net.smart.web.domain.notice.Notice;

public interface NoticeService {
	
	public List<Notice> getNoticeList(Notice param);
	
	public void addNotice(Notice param);
	
	public void modifyNotice(Notice param);
	
	public void removeNotice(List<Notice> params);
	
//	public List<MailGroup> getMailGroupList();
//	
//	public void addMailQueue(MailQueue param);
//	
//	public List<MailQueue> getMailQueueList();
//	
//	public void modifyMailQueue(MailQueue param);
//	
//	public void modifyMailGroup(MailGroup param);
}
