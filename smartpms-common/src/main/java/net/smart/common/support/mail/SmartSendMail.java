package net.smart.common.support.mail;

import java.util.ArrayList;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

public class SmartSendMail {
	
	private JavaMailSender mailSender;

	public void setMailSender(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}
	
	public void sendMail(String from, String to, String cc, String subject, String msg) throws MessagingException {
		String[] ccList = null;
		if (cc != null)
			ccList = cc.split(",");
		List<String> targets = new ArrayList<String>();
		if (ccList != null) {
			for (String target : ccList) {
				if (!"".equals(target)) {
					targets.add(target);
				}
			}
		}
		
		String[] toList = to.split(",");
		if (toList != null) {
			for (String target : toList) {
				if (!"".equals(target)) {
					targets.add(target);
				}
			}
		}
		
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
		helper.setFrom(from);
		if (targets != null && !targets.isEmpty()) {
			String[] tos = new String[targets.size()];
			targets.toArray(tos);
			helper.setTo(tos);
		} else {
			helper.setTo(to);
		}
		helper.setSubject(subject);
		helper.setText(msg, true);
		
		mailSender.send(message);
		
	}

}
