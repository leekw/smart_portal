package net.smart.web.support.authentication.exception;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;

public class AuthenticationExceptionHandler extends LoginUrlAuthenticationEntryPoint {
	
	public AuthenticationExceptionHandler(String loginFormUrl) {
		super(loginFormUrl);
	}

	@Autowired
	private IntegrationExceptionHandler handler;

	
	private String errorCode;
	private String metadataType;
	
	public enum ContentType {
		JSON("application/json");
		private String value;
		private ContentType(String value) {
			this.value = value;
		}
		public String getValue() {
			return value;
		}
		public boolean isMatch(String compare) {
			return value.equals(compare);
		}		
	}
	
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)  throws IOException, ServletException {
		//Error Logging
		handler.logException(request, response, authException);
		//Error Message Output
		String mediatype = request.getContentType();
		if (mediatype != null && mediatype.indexOf(ContentType.JSON.getValue()) != -1) {
			handler.writeExceptionMessage(request, response, authException, errorCode, metadataType);
		} else {
			super.commence(request, response, authException);
		}
	}
	
    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

	public void setMetadataType(String metadataType) {
		this.metadataType = metadataType;
	}

}
