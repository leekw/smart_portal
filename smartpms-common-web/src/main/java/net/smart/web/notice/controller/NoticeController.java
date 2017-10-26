package net.smart.web.notice.controller;

import java.util.ArrayList;
import java.util.List;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.annotation.IntegrationResponse;
import net.smart.common.exception.IntegrationException;
import net.smart.web.domain.MailGroup;
import net.smart.web.domain.notice.Notice;
import net.smart.web.notice.service.NoticeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class NoticeController {
	
	@Autowired
	private SimpMessagingTemplate template;
	
	
	@Autowired
	private NoticeService noticeService;
	
	
	@RequestMapping(value = "/notice/main/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="notices")
	public List<Notice> getMainNotice(@IntegrationRequest Notice param) {
		List<Notice> mains = new ArrayList<Notice>();
		param.setNoticeMainYn("Y");
		List<Notice> temps =  noticeService.getNoticeList(param);
		if (temps != null && !temps.isEmpty()) {
			mains.add(temps.get(0));
		}
		return mains;
	}
	
	@RequestMapping(value = "/notice/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="notices")
	public List<Notice> getNoticeList(@IntegrationRequest Notice param) {
		return noticeService.getNoticeList(param);
	}
	
	@RequestMapping(value = "/notice/publish.{metadataType}", method = RequestMethod.POST)
	public void publishNotice(@IntegrationRequest Notice param) {
		Notice result = new Notice();
		List<Notice> temps = noticeService.getNoticeList(param);
		if (temps != null && !temps.isEmpty()) {
			result = temps.get(0);
			if (result.getNoticePublishType() != null && !"1".equals(result.getNoticePublishType())) {
//				String address = this.getMailGroup(result.getMailGroupId());
//				String address = null;
//				MailQueue que = new MailQueue();
//				que.setNoticeId(result.getNoticeId());
//				que.setSendAddress(address);
//				noticeService.addMailQueue(que);

			}
			if (result.getNoticePublishType() != null && !"2".equals(result.getNoticePublishType()))
				template.convertAndSend("/topic/notice", result);
		} else {
			throw new IntegrationException("Notice Data Empty!..");
		}
	}
	
//	private String getMailGroup(String mailGroupId) {
//		for (MailGroup group : this.getMailGroups()) {
//			if (group.getMailGroupId().equals(mailGroupId)) {
//				return group.getTargetMailAddress();
//			}
//		}
//		return null;
//	}
		
//	private List<MailGroup> getMailGroups() {
//		return noticeService.getMailGroupList();
//	}
	
	@RequestMapping(value = "/notice/add.{metadataType}", method = RequestMethod.POST)
	public void addNotice(@IntegrationRequest List<Notice> params) {
		if (params != null && !params.isEmpty()) {
			Notice param = params.get(0);
			noticeService.addNotice(param);
		}
	}
	
	@RequestMapping(value = "/notice/modify.{metadataType}", method = RequestMethod.POST)
	public void modifyNotice(@IntegrationRequest List<Notice> params) {
		if (params != null && !params.isEmpty()) {
			Notice param = params.get(0);
			noticeService.modifyNotice(param);
		}
	}
	
	@RequestMapping(value = "/notice/remove.{metadataType}", method = RequestMethod.POST)
	public void removeNotice(@IntegrationRequest List<Notice> params) {
		noticeService.removeNotice(params);
	}
	
	@RequestMapping(value = "/mail/group/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="groups")
	public List<MailGroup> getMailGroupList() {
//		return this.getMailGroups();
		return null;
	}
	
	
	@RequestMapping(value = "/mail/modify.{metadataType}", method = RequestMethod.POST)
	public void modifyMailGroup(@IntegrationRequest MailGroup param) {
//		noticeService.modifyMailGroup(param);
	}
	
	@RequestMapping(value = "/mail/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="mail")
	public MailGroup getMailGroup(@IntegrationRequest MailGroup param) {
//		for (MailGroup group : this.getMailGroups()) {
//			if (group.getMailGroupId().equals(param.getMailGroupId())) {
//				return group;
//			}
//		}
		return null;
	}

}
