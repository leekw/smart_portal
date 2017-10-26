<%@ page contentType="application/json; charset=utf-8" pageEncoding="utf-8" %>
<%@ page import="net.smart.common.exception.ExceptionHandler" %>
<%@ page import="net.smart.common.exception.IIntegrationException" %>
<%@ page import="net.smart.common.support.constant.BizCode" %>
<%@ page import="java.net.URLEncoder" %>
<%
    String metadataType = (String)request.getAttribute("metadataType");
    Throwable throwable = (Throwable)request.getAttribute("exception");
    
    String message = null;
    String errorCode = null ;
    String returnMessage = null;
    if(throwable != null) {    	
    	IIntegrationException pe = (IIntegrationException)ExceptionHandler.handleException(throwable);
        message = pe.getMessage();
        errorCode = pe.getCode();        
        
        if(BizCode.System.FILE_NOT_EXIST.isMatch(errorCode)){
        	message = URLEncoder.encode(message, "UTF-8");
        	response.sendRedirect("/prmui/error500.jsp?message="+message);
        } else {
	        out.print(pe.getMessageByMetadata(metadataType));        	
        }
    }
%>
