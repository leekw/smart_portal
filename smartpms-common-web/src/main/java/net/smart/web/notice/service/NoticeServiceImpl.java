package net.smart.web.notice.service;

import java.util.List;

import net.smart.web.domain.notice.Notice;
import net.smart.web.notice.dao.NoticeDao;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("noticeService")
public class NoticeServiceImpl implements NoticeService {
	
	private static Logger logger = LoggerFactory.getLogger(NoticeServiceImpl.class);
	
	@Autowired
	private NoticeDao noticeDao;
	
//	@Autowired
//	private IntegrationSendMail integrationMail;

	@Override
	public List<Notice> getNoticeList(Notice param) {
		return noticeDao.getNoticeList(param);
	}

	@Override
	public void addNotice(Notice param) {
		noticeDao.addNotice(param);
	}


	@Override
	public void modifyNotice(Notice param) {
		noticeDao.modifyNotice(param);
	}

//	@Override
//	public void addMailQueue(MailQueue param) {
//		noticeDao.addMailQueue(param);
//	}
//
//	@Override
//	public List<MailQueue> getMailQueueList() {
//		return noticeDao.getMailQueueList();
//	}
//
//	@Override
//	@Transactional
//	public void modifyMailQueue(MailQueue param) {
//		noticeDao.mofityMailQueue(param);
//	}
//	
////	@Scheduled(cron="0 0/1 * * * ? ")
//	public void sendNoticeMail() {
//		final String isProdServer = System.getProperty("prodServer");
//		if (isProdServer != null && "true".equals(isProdServer)) {
//			List<MailQueue> result = noticeDao.getMailQueueList();
//			for (MailQueue queue : result) {
//				try {
//					String address = queue.getSendAddress().replaceAll("..", ".");
//					integrationMail.sendMail("\"PA1-1 종합상황실\" <nbss-pmo@kt.com>", "nbss-pmo@kt.com", address, queue.getMailSummary(), queue.getMailDescription());
//					queue.setSendYn("Y");
//				} catch (Exception e) {
//					queue.setSendYn("E");
//					logger.info("###### Mail Send Error :" + e.getMessage() + " : Skip Send Mail!!");
//				}
//				this.modifyMailQueue(queue);
//			}
//		}
//	}
//
//	@Override
//	public void modifyMailGroup(MailGroup param) {
//		noticeDao.modifyMailGroup(param);
//	}

	@Override
	public void removeNotice(List<Notice> params) {
		noticeDao.removeNotice(params);
	}
	

}
