package net.smart.web.support.authentication.exception;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.access.AccessDeniedHandler;

public class AccessDeniedExceptionHandler implements AccessDeniedHandler {
	
	@Autowired
	private IntegrationExceptionHandler handler;
	
	private String errorCode;
	private String errorPage;
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
	public void handle(HttpServletRequest request,
			HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException,
			ServletException {
		SecurityContext securityContext = SecurityContextHolder.getContext();
		if (securityContext == null || securityContext.getAuthentication() == null) {
			errorCode = "NOTLOGIN";
		} 
		String mediatype = request.getContentType();
		if (mediatype != null && mediatype.indexOf(ContentType.JSON.getValue()) != -1) {
			handler.writeExceptionMessage(request, response, accessDeniedException, errorCode, metadataType);
		} else {
			this.sendRedirect(request, response, accessDeniedException);
		}
	}
	
	public void sendRedirect(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException)
            throws IOException, ServletException {
        if (!response.isCommitted()) {
            if (errorPage != null) {
                // Put exception into request scope (perhaps of use to a view)
                request.setAttribute(WebAttributes.ACCESS_DENIED_403, accessDeniedException);

                // Set the 403 status code.
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);

                // redirect to error page.
                response.sendRedirect(request.getContextPath() + errorPage);
            } else {
                response.sendError(HttpServletResponse.SC_FORBIDDEN, accessDeniedException.getMessage());
            }
        }
    }
	
	public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

	public void setMetadataType(String metadataType) {
		this.metadataType = metadataType;
	}
	
	public void setErrorPage(String errorPage) {
        this.errorPage = errorPage;
    }
}
