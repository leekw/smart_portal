package net.smart.common.support.dbcp;

import net.smart.common.exception.IntegrationException;
import net.smart.common.support.constant.ErrorCode;
import net.smart.common.support.security.StringEncrypter;

import org.apache.commons.dbcp.BasicDataSource;

public class SmartBasicDataSource extends BasicDataSource {
	
	@Override
	public void setPassword(String password) {
		StringEncrypter stringEncrypter = new StringEncrypter(false);
		try {
//			super.setPassword(stringEncrypter.decrypt(password));
			super.setPassword(password);
		} catch (Exception e) {
			throw new IntegrationException(ErrorCode.SYSTEM_ERROR.getValue());
		}
    }
	
	@Override
	public void setUsername(String username) {
		StringEncrypter stringEncrypter = new StringEncrypter(false);
		try {
//			super.setUsername(stringEncrypter.decrypt(username));
			super.setUsername(username);
		} catch (Exception e) {
			throw new IntegrationException(ErrorCode.SYSTEM_ERROR.getValue());
		}
    }

}
