package net.smart.common.support.sender;

import javax.mail.MessagingException;

import net.smart.common.domain.sys.SendQueue;
import net.smart.common.exception.IntegrationException;
import net.smart.common.support.mail.SmartSendMail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("smartMailSender")
public class SmartMailSender extends AbstractSmartSender {
	
	@Autowired
	private SmartSendMail smartMail;

	@Override
	public boolean isSupport(String type) {
		return "MAIL".equals(type);
	}

	@Override
	protected void sendDetail(SendQueue param) {		
		try {
			smartMail.sendMail(param.getSendSource(), param.getSendTarget(), null, param.getSendSubject(), param.getSendDescription());
			param.setSendStatus("COMPLETE");
		} catch (MessagingException e) {
			throw new IntegrationException("ERROR.0001", "Mail Send Error", e);
		}
	}

	

}
