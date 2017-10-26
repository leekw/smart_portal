package net.smart.web.support.authentication.exception;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.session.InvalidSessionStrategy;
import org.springframework.security.web.session.SimpleRedirectInvalidSessionStrategy;
import org.springframework.util.Assert;

public class JsonInvalidSessionStrategy  implements InvalidSessionStrategy {
	
	private SimpleRedirectInvalidSessionStrategy defaultInvalidSessionStrategy;
	private String errorCode;
	private boolean createNewSession = true;
	private String metadataType;
	
	@Autowired
	private IntegrationExceptionHandler handler;

	@Override
	public void onInvalidSessionDetected(HttpServletRequest request,
			HttpServletResponse response) throws IOException, ServletException {
		String uri = request.getRequestURI();
		if (uri.indexOf(metadataType) != -1) {
			if (createNewSession) {
				request.getSession();
			}
			handler.writeExceptionMessage(request, response, null, errorCode, metadataType);
		} else {
			defaultInvalidSessionStrategy.onInvalidSessionDetected(request, response);
		}
	}
	
	public void setDefaultInvalidSessionStrategy(SimpleRedirectInvalidSessionStrategy defaultInvalidSessionStrategy) {
		Assert.isInstanceOf(InvalidSessionStrategy.class, defaultInvalidSessionStrategy, "defaultInvalidSessionStrategy class must be implemented by InvalidSessionStrategy interface");

		this.defaultInvalidSessionStrategy = defaultInvalidSessionStrategy;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public void setMetadataType(String metadataType) {
		this.metadataType = metadataType;
	}

}
