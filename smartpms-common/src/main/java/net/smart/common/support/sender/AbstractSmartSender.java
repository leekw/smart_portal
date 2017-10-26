package net.smart.common.support.sender;

import net.smart.common.dao.BasedResourceDao;
import net.smart.common.domain.sys.SendQueue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

public abstract class AbstractSmartSender implements SmartSender {
	
	@Autowired
	private BasedResourceDao basedResourceDao;
	
	
	@Transactional
	@Override
	public void send(SendQueue param) {
		sendDetail(param);
		basedResourceDao.modifySendQueue(param);
	}
	
	protected abstract void sendDetail(SendQueue param);
	

}
