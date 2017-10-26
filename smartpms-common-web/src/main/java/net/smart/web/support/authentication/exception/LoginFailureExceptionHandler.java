package net.smart.web.support.authentication.exception;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

public class LoginFailureExceptionHandler extends SimpleUrlAuthenticationFailureHandler {
	
	private String errorCode;
	private String metadataType;
	
	@Autowired
	private IntegrationExceptionHandler handler;
	
	@Override
	public void onAuthenticationFailure(HttpServletRequest request,
			HttpServletResponse response, AuthenticationException exception)
			throws IOException, ServletException {
		
		/** Logging **/
//		writeAutenticateLog(request, response, exception);
		
		request.setAttribute("G_ERROR_MSG", exception.getMessage());
		
		/** LoginFailure Page Redirect **/
		super.onAuthenticationFailure(request, response, exception);
	}

	private void writeAutenticateLog(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
		handler.writeExceptionMessage(request, response, exception, errorCode, metadataType);
	}
	
	public void setErrorCode(String errorCode) {
       this.errorCode = errorCode;
	}
	
	public void setMetadataType(String metadataType) {
		this.metadataType = metadataType;
	}

}
