package net.smart.common.exception;

import java.io.PrintStream;
import java.io.PrintWriter;

import net.smart.common.domain.IntegrationErrorMessage;
import net.smart.common.support.analyzer.DataAnalyzer;
import net.smart.common.support.analyzer.factory.DataAnalyzerFactory;
import net.smart.common.support.constant.ErrorCode;
import net.smart.common.support.message.smartMessageSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
/**
 * 
 * net.smart.common.exception.IntegrationException.java
 * <pre>
 *  System에서 사용되는 런타입 예외처리 클래스
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public class IntegrationException extends RuntimeException implements IIntegrationException {
	
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 2190149085456445278L;

	private static  Logger logger = LoggerFactory.getLogger(IntegrationException.class);
	
	private boolean isWriteLog;
	private String code;
	private String message;
	private Object userObject;
	private DataAnalyzerFactory analyzerFactor;
	
	public IntegrationException(String code) {
		this(code, (Throwable) null);
	}
	
	public IntegrationException(Throwable cause) {
		this(smartMessageSource.getDefaultMessageCode(), cause);
	}
	
	public IntegrationException(String code, Throwable cause) {
		super(cause);
		this.isWriteLog = false;
		this.setCode(code);
		this.message = smartMessageSource.getMessage(this.code);
	}

	public IntegrationException(String code, String message) {
		this.isWriteLog = false;
		this.setCode(code);
		this.message = message != null ? message : smartMessageSource.getMessage(this.code);
	}

	public IntegrationException(String code, Object messageParam) {
		this(code, (Object[])messageParam, null);
	}

	public IntegrationException(String code, Object messageParams, Throwable cause) {
		super(cause);
		this.isWriteLog = false;
		this.setCode(code);

		this.message = smartMessageSource.getMessage(this.code, messageParams);
	}

	public IntegrationException(String code, String message, Throwable cause) {
		super(cause);
		this.isWriteLog = false;
		this.code = code != null ? code : smartMessageSource.getDefaultMessageCode();

		this.message = message != null ? message : smartMessageSource.getMessage(code);
	}
	
	private void setCode(String code) {
		this.code = code != null ? code : smartMessageSource.getDefaultMessageCode();
	}

	public String getCode() {
		return this.code;
	}
	
	@Override
	public String getMessage() {
		return this.message;
	}

	public boolean isWriteLog() {
		return this.isWriteLog;
	}

	public void setWriteLog(boolean isWriteLog) {
		this.isWriteLog = isWriteLog;
	}

	public void setUserObject(Object userObject) {
		this.userObject = userObject;
	}
	
	public Object getUserObject() {
		return this.userObject;
	}
 
	@Override
	public void printStackTrace(PrintStream ps) {
		if (getCause() == null) {
			super.printStackTrace(ps);
		} else {
			getCause().printStackTrace(ps);
		}
	}

	@Override
	public void printStackTrace(PrintWriter pw) {
		if (getCause() == null) {
			super.printStackTrace(pw);
		} else {
			getCause().printStackTrace(pw);
		}
	}

    public String getMessageByMetadata(String metadataType) throws Exception {
        String result = null;
        analyzerFactor = new DataAnalyzerFactory();
        try {
        	IntegrationErrorMessage error = new IntegrationErrorMessage(this.getCode(),this.getMessage());
    		this.setErrorTrace(error);
        	if (metadataType != null) {
	            DataAnalyzer converter = analyzerFactor.getDataAnalyzer(metadataType);
	            result = converter.deserialize("error", error);
        	} else {
        		StringBuffer sb = new StringBuffer();
        		sb.append("Error Code :").append(error.getCode()).append("\n");
        		sb.append("Error Message :").append(error.getMessage()).append("\n");
        		sb.append("Error Trace :").append(error.getErrorTrace());
        		result = sb.toString();
        	}
        }catch(Exception e) {
            throw new IntegrationException(ErrorCode.SYSTEM_ERROR.getValue());
        }
        
        return result;
    }
    
    private IntegrationErrorMessage setErrorTrace(IntegrationErrorMessage errorMessage) {
        
        Throwable throwable = super.getCause();
        if(throwable != null) {
            
            StringBuilder sb = new StringBuilder();
            for (StackTraceElement element : throwable.getStackTrace()) {
                sb.append(element.toString()).append("\n");
            }
            errorMessage.setErrorTrace(sb.toString());
        }
        
        return errorMessage;
    }
	
}
