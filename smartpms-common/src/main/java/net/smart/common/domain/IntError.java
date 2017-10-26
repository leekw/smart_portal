package net.smart.common.domain;

public class IntError {
	
	private String code;
    private String message;
    private String errorTrace;
    
    public IntError(){}
    public IntError(String code,String message) {
        this.code = code;
        this.message = message;
    }
    public IntError(String code,String message,String errorTrace) {
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
