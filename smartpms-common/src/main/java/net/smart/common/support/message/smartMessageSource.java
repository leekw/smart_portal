package net.smart.common.support.message;

import java.util.Locale;

import net.smart.common.support.constant.ErrorCode;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;

/**
 * 
 * net.smart.common.support.message.IntegrationMessageSource.java
 * <pre>
 *  message.properties 파일에 정의된 메시지를 메시지 코드에 따라 메시지값을 읽어 오는 클래스
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public class smartMessageSource {
	private static  Logger logger = LoggerFactory.getLogger(smartMessageSource.class);
	private static MessageSource messageSource;
	
	private enum Code {
	    DEFAULT_MESSAGE_DETAIL("Integration View Application Error!");
        private String value;
        private Code(String value) { this.value = value;}
        private String getValue () { return this.value;}
    }
	
	public void setMessageSource(MessageSource messageSource) {
		smartMessageSource.messageSource = messageSource;
	}


	public static String getMessage(String code) {
		return getMessage(code, null);
	}
	
	public static String getDefaultMessageCode() {
		return ErrorCode.SYSTEM_ERROR.getValue();
	}

	public static String getDefaultMessageDetail() {
		return Code.DEFAULT_MESSAGE_DETAIL.getValue();
	}

	public static String getMessage(String paramCode, Object messageParams) {
		String message = "";
		String code;
		if (paramCode == null || paramCode.length() == 0){
			code = ErrorCode.SYSTEM_ERROR.getValue();
		}else{
			code = paramCode;
		}
		try {
			message = messageSource.getMessage(code, (Object[])messageParams, Locale.KOREA);
		} catch (NoSuchMessageException nsme) {
			message = Code.DEFAULT_MESSAGE_DETAIL.getValue();
			logger.error(null, nsme);
		} catch (Exception e) {
			message = Code.DEFAULT_MESSAGE_DETAIL.getValue();
			logger.error(null, e);
		}
		return message;
	}
}
