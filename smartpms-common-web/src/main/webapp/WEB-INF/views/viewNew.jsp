<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html> 
<html>
    <head>
       <title> ${sysTitle}</title>
       <link rel="stylesheet" type="text/css" href="${sysContext}/resources/theme-extends-gr/Admin-all.css?version=${version}">
       <link rel="stylesheet" type="text/css" href="${sysContext}/resources/ext-charts/build/resources/ext-charts-all-debug.css?version=${version}">
       <link rel="stylesheet" type="text/css" href="${sysContext}/resources/css/traffic-lignt.css?version=${version}">
       <link rel="stylesheet" type="text/css" href="${sysContext}/resources/css/view_etc.css?version=${version}">
       <link rel="icon" type="image/png" sizes="16x16" href="${sysContext}/angular/assets/img/favicon-16x16.png?version=${resVersion}">
  	   <link rel="icon" type="image/png" sizes="32x32" href="${sysContext}/angular/assets/img/favicon-32x32.png?version=${resVersion}">
  	   <link rel="icon" type="image/png" sizes="96x96" href="${sysContext}/angular/assets/img/favicon-96x96.png?version=${resVersion}">
       <meta http-equiv="X-UA-Compatible" content="IE=9">
       <meta name="_csrf" content="${_csrf.token}"/>
       <meta name="_csrf_header" content="${_csrf.headerName}"/>
       <meta http-equiv="X-Frame-Options" content="SAMEORIGIN"/>
       <meta name="viewport" content="user-scalable=yes, width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
       <meta name="apple-mobile-web-app-capable" content="yes">
	   <script typ="text/javascript">
	   var G_PATH = "${sysContext}";
	   </script>
       <script type="text/javascript" src="${sysContext}/resources/ext/ext-all.js"></script>
       <script type="text/javascript" src="${sysContext}/resources/ext-charts/build/ext-charts.js"></script>
       <script type ="text/javascript" src="${sysContext}/ext/core/core.js"></script>  
       <script type ="text/javascript" src="${sysContext}/ui/${_category}/${_ui}.js?version=${version}"></script>
       <script type="text/javascript" src="${sysContext}/resources/js/jquery-1.7.1.min.js"></script>
       <c:if test="${(_category  == 'main' || _category  == 'portal')  && CALL_LOC == 'internal'}">
       <script type="text/javascript" src="${sysContext}/resources/js/sockjs-0.3.4.min.js"></script>
       <script type="text/javascript" src="${sysContext}/resources/js/stomp.js"></script>
       </c:if>
    </head>
    <body>
    	<script type="text/javascript">
    	var G_IS_HADNS = "${IS_HANDS}";
    	var G_IS_CT_HANDS = "${IS_CT_HANDS}";
    	var M_URL = "${M_URL}";
    	var M_RESOURCE_ID = "${M_RESOURCE_ID}";
    	var M_RESOURCE_NAME = "${M_RESOURCE_NAME}";
    	var M_PARENT_RESOURCE_NAME = "${M_PARENT_RESOURCE_NAME}";
    	var M_RESOURCE_TYPE = "${M_RESOURCE_TYPE}";
    	var G_MAX_CONNECTION = "${_maxConnection}";
    	var G_IS_LOGIN = "${IS_LOGIN}";
    	var G_LOGIN_NAME = "${LOGIN_NAME}";
    	var G_LOGIN_ID = "${LOGIN_ID}";
    	var G_BOARD_NO = "${BOARD_NO}";
    	var G_PHOTO_PATH = "${PHOTO_PATH}";
    	G_TOKEN = "${_csrf.token}";
    	var app = window.navigator.userAgent.toLowerCase();
    	
    	var M_RESOURCE_CONTENT = '';
    	</script>
    	<c:if test="${_category  == 'main'  && CALL_LOC == 'internal'}">
    	<script type="text/javascript">
    	window.addEventListener('load', function() {
    		if (Notification.permission !== "granted")
    			Notification.requestPermission();
    	});
    	</script>
    	<script type="text/javascript" src="${sysContext}/resources/js/notice-websocket.js?version=${version}"></script>
    	</c:if>
    	<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"> 	
    </body>
</html>