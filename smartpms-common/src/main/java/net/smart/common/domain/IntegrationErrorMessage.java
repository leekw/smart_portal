package net.smart.common.domain;

/**
 * 
 * net.smart.common.domain.IntegrationErrorMessage.java
 * <pre>
 *  오류 및 예외처리 메시지를 처리할 때 사용되는 메시지를 저장하는 도메인 클래스
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public class IntegrationErrorMessage {
	
	private String code;
    private String message;
    private String errorTrace;
    
    public IntegrationErrorMessage(){}
    public IntegrationErrorMessage(String code,String message) {
        this.code = code;
        this.message = message;
    }
    public IntegrationErrorMessage(String code,String message,String errorTrace) {
        this.code = code;
        this.message = message;
        this.errorTrace = errorTrace;
    }
    
    public String getCode() {
        return code;
    }
    public void setCode(String code) {
        this.code = code;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public String getErrorTrace() {
        return errorTrace;
    }
    public void setErrorTrace(String errorTrace) {
        this.errorTrace = errorTrace;
    }
}
