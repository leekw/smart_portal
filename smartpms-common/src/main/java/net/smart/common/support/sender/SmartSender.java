package net.smart.common.support.sender;

import net.smart.common.domain.sys.SendQueue;

public interface SmartSender {
	
	public boolean isSupport(String type);
	
	public void send(SendQueue param);

}
