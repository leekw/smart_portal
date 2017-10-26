<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html> 
<html>
    <head>
       <title> ${sysTitle}</title>
       <link rel="stylesheet" type="text/css" href="${sysContext}/resources/theme-extends-etc-gr/resources/theme-triton-all-debug.css?version=${version}">
       <link rel="stylesheet" type="text/css" href="${sysContext}/resources/theme-extends-gr/Admin-all.css?version=${version}">
       <link rel="stylesheet" type="text/css" href="${sysContext}/resources/ux/triton/resources/ux-all-debug.css?version=${version}">
       <link rel="stylesheet" type="text/css" href="${sysContext}/resources/theme-int/charts-all.css?version=${version}">
       <link rel="stylesheet" type="text/css" href="${sysContext}/resources/css/traffic-lignt.css?version=${version}">
       <link rel="stylesheet" type="text/css" href="${sysContext}/resources/css/flipclock.css?version=${version}">
       <link rel="icon" type="image/png" sizes="16x16" href="${sysContext}/angular/assets/img/favicon-16x16.png?version=${resVersion}">
  	   <link rel="icon" type="image/png" sizes="32x32" href="${sysContext}/angular/assets/img/favicon-32x32.png?version=${resVersion}">
  	   <link rel="icon" type="image/png" sizes="96x96" href="${sysContext}/angular/assets/img/favicon-96x96.png?version=${resVersion}">
       <meta http-equiv="X-UA-Compatible" content="IE=9">
       <meta name="_csrf" content="${_csrf.token}"/>
       <meta name="_csrf_header" content="${_csrf.headerName}"/>
       <meta http-equiv="X-Frame-Options" content="SAMEORIGIN"/>
       <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
       <meta name="apple-mobile-web-app-capable" content="yes">
       <style type="text/css">
		#app-header {
		background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #8fc33a), color-stop(100%, #739b2e));
		background-image: -webkit-linear-gradient(top, #8fc33a, #739b2e);
		background-image: -moz-linear-gradient(top, #8fc33a, #739b2e);             
		background-image: -o-linear-gradient(top, #8fc33a, #739b2e);
		background-image: -ms-linear-gradient(top, #8fc33a, #739b2e);
		background-image: linear-gradient(top, #8fc33a, #739b2e);
		filter: progid:DXImageTransform.Microsoft.gradient.(GradientType=0, startColorstr='#8fc33a', endColorstr='#739b2e');
		border-bottom: 1px solid #567422;
		}
		#app-header-title {
		padding: 15px 10px 10px 31px;
		color: white;
		font-size: 18px;
		font-weight: bold;
		text-shadow: 0 1px 0 #4e691f;
		}
		// There is no required CSS for this plugin to work properly 
		// but here is what is being used to style this demo
		.horizontal-nav {
		  border-radius: 6px;
		}
		.horizontal-nav ul {
		position: absolute;
		  left: 180px;
		  top : -12px;
		  float: left;
		  list-style:none;
		  text-align: center;
		  font-size: 14px;
		  font-weight: bold;
		  border-radius: 6px;
		}
		.horizontal-nav ul li {
		  float: left;
		}
		.horizontal-nav ul li:first-child {
		  border-left: 0 none;
		}
		.horizontal-nav ul li a {
		  display: block;
		  padding: 10px 20px;
		  color: #fff;
		  text-decoration:none;
		  border-top: 1px solid rgba(255,255,255, 0.25);
		  border-left: 1px solid rgba(255,255,255, 0.25);
		}
		.horizontal-nav ul li:first-child a {
		  border-left: 0 none;
		}
		.horizontal-nav ul li a:hover {
		  background: #567422;
		}
		.horizontal-nav ul li:first-child a {
		  border-top-left-radius: 6px;
		  border-bottom-left-radius: 6px;
		}
		.horizontal-nav ul li:last-child a {
		  border-top-right-radius: 6px;
		  border-bottom-right-radius: 6px;
		}
		.rowedit .x-grid-cell{
			background-color : #ffffcc !important;
		}
		.rowerror .x-grid-cell{
			background-color : #ffbbbb !important;
		}
		.rowecomfirm .x-grid-cell{
			background-color : #afe4fc !important;
		}
		.grid-delay {
			background-color : #f497b8 !important;
			color : #ffffff !important;
		}
		.grid-important {
			background-color : #fbd5e2 !important;
			color : #ffffff !important;
		}
		.grid-workreay {
			background-color : #ffd862 !important;
			color : #ffffff !important;
		}
		.grid-working {
			background-color : #7cc781 !important;
			color : #ffffff !important;
		}
		.grid-complete {
			background-color : #73abdd !important;
			color : #ffffff !important;
		}
		.grid-assignreay {
			background-color : #c2c2c2 !important;
			color : #ffffff !important;
		}
		.fa-check-circle:before{color:#1c2b36;}
		.fa-search:before{color:#1c2b36;}
		.fa-cloud-download:before{color:#1c2b36;}
		.x-label{
			vertical-align: middle;
		}
		.x-column-header-inner.redheader {
			color:red;
		}
		<c:if test="${_category  == 'qualityhist'}">
		.x-grid-item{
			color:#404040;
			font:normal 12px/19px 'Open Sans', 'Helvetica Neue', helvetica, arial, verdana, sans-serif;
			background-color:#fff
		}
		.x-column-header{
			border-right:1px solid #d0d0d0;
			color:#404040;
			font:400 12px/19px 'Open Sans', 'Helvetica Neue', helvetica, arial, verdana, sans-serif;
			outline:0;
			background-color:#fff
		}
		</c:if>
		<c:if test="${_category  == 'stabilization' || _category  == 'stabilizationm'}">
		.x-panel-header-title-default{
			color : #000000;
			font-weight : 800;
		}
		</c:if>
		<c:if test="${_category  == 'stabilizationm'}">
	 	.clock {
			/* transform-origin: 0 0;
			transform: scale(.55);
			-ms-transform: scale(.55);
			-webkit-transform-origin: 0 0;
			-webkit-transform: scale(.55);
			-o-transform-origin: 0 0;
			-o-transform: scale(.55);
			-moz-transform-origin: 0 0;
			-moz-transform: sacle(.55); */
			zoom:0.73;
			-moz-transform:sacle(.73);
		}
		</c:if>
		.grid-row-span .x-grid3-row {
			border-bottom: 0;
		}
		.grid-row-span .x-grid3-col {
			border-bottom: 1px solid #ededed;
		}
		.grid-row-span .row-span-first {
			position: relative;
		}
		.grid-row-span .row-span-first .x-grid3-cell-inner {
			position : absolute;
		}
		.grid-row-span .row-span-last {
			border-bottom: 1px solid #ededed;
		}
		.x-legend-container {
			border:0;
		}
		.x-docked-left.x-legend .x-legend-item,
		.x-docked-right.x-legend .x-legend-item,
		.x-docked-left.x-legend-panel .x-legend-item,
		.x-docked-right.x-legend-panel .x-legend-item{
			border-top: 0;
		}
		.x-viewport, .x-viewport > .x-body {
			touch-action : auto;
		}
		.reg-panel-body {
		 }
		 .x-form-text-default {
		 	color : #1c2b36;
		 	background-color: rgba(0,0,0,.02);
   	 		border: 1px solid #d0d0d0;
		    box-shadow: none;
		 }
		 .x-form-item-label-default {
		 	color : #1c2b36;
		 	text-align: right;
		 	padding-right: 10px;
		 	font-weight : 700;
		 }
		 .x-form-trigger-wrap-default {
		 	border-radius: 5px;
		 }
		 .x-btn-inner-default-small {
		 	font-weight : 700;
		 }
		 .x-btn-default-small-mc {
		 	background-color : none;
		 }
		 .x-boundlist {
		 	border-radius: 3px;
		 }
		 .x-toolbar-text-default {
		 	    padding: 5px 4px;
		 	    color : #1c2b36;
		 }
		 .x-grid-item {
		 	/* color : #fff;
		 	background-color : none; */
		 }
		 
	   </style>
	   <script typ="text/javascript">
	   var G_PATH = "${sysContext}";
	   </script>
       <script type="text/javascript" src="${sysContext}/resources/ext/ext-all.js?version=${version}"></script>
       <!-- <script type="text/javascript" src="${sysContext}/resources/ext-charts/build/ext-charts.js"></script> -->
       <script type="text/javascript" src="${sysContext}/resources/ext/charts.js"></script>
       <script type="text/javascript" src="${sysContext}/resources/ux/ux-debug.js"></script>
       <script type="text/javascript" src="${sysContext}/resources/ux/BoxReorderer.js"></script>
       <script type ="text/javascript" src="${sysContext}/ui/core/core.js?version=${version}"></script>  
      <!--  <script type="text/javascript" src="${sysContext}/resources/ext/Exporter-all.js"></script> -->
       <script type ="text/javascript" src="${sysContext}/ui/${_category}/${_ui}.js?version=${version}"></script>
        <script type="text/javascript" src="${sysContext}/resources/js/jquery-1.7.1.min.js"></script>
       <c:if test="${(_category  == 'main' || _category  == 'portal') && CALL_LOC == 'internal'}">
       <script type="text/javascript" src="${sysContext}/resources/js/sockjs-0.3.4.min.js"></script>
       <script type="text/javascript" src="${sysContext}/resources/js/stomp.js"></script>
       </c:if>
       <c:if test="${_category  == 'stabilization' || _category  == 'stabilizationm'}">
       <script type="text/javascript" src="${sysContext}/resources/js/flipclock.js"></script>
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
    	var M_RESOURCE_CONTENT = '${M_RESOURCE_CONTENT}';
    	var G_MAX_CONNECTION = "${_maxConnection}";
    	var G_IS_LOGIN = "${IS_LOGIN}";
    	var G_LOGIN_NAME = "${LOGIN_NAME}";
    	var G_LOGIN_ID = "${LOGIN_ID}";
    	var G_BOARD_NO = "${BOARD_NO}";
    	G_TOKEN = "${_csrf.token}";
    	var app = window.navigator.userAgent.toLowerCase();

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