<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="kr">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${sysTitle}</title>
  <script type="text/javascript">
  var G_PATH = "${sysContext}";
  </script>
  <link rel="icon" type="image/png" sizes="16x16" href="${sysContext}/angular/assets/img/favicon-16x16.png?version=${resVersion}">
  <link rel="icon" type="image/png" sizes="32x32" href="${sysContext}/angular/assets/img/favicon-32x32.png?version=${resVersion}">
  <link rel="icon" type="image/png" sizes="96x96" href="${sysContext}/angular/assets/img/favicon-96x96.png?version=${resVersion}">

  <link rel="stylesheet" type="text/css" href="${sysContext}/resources/theme-extends-etc-gr/resources/theme-triton-all-debug.css?version=${version}">
  <link rel="stylesheet" type="text/css" href="${sysContext}/resources/theme-extends-gr/Admin-all.css?version=${version}">
  <link rel="stylesheet" type="text/css" href="${sysContext}/resources/ux/triton/resources/ux-all-debug.css?version=${version}">
  <link rel="stylesheet" type="text/css" href="${sysContext}/resources/css/view_etc.css?version=${version}">
  
  <script type="text/javascript" src="${sysContext}/resources/ext/ext-all.js"></script>
  <script type="text/javascript" src="${sysContext}/resources/ext-charts/build/ext-charts.js"></script>
  <script type="text/javascript" src="${sysContext}/resources/ux/ux-debug.js"></script>
  <script type="text/javascript" src="${sysContext}/resources/ux/BoxReorderer.js"></script>
  <script type ="text/javascript" src="${sysContext}/ui/core/core.js"></script> 
  <script type ="text/javascript" src="${sysContext}/ui/external/regApp.js?version=${version}"></script> 

  <!-- build:css({.tmp/serve,src}) styles/auth.css?version=${resVersion} -->
  <!-- inject:css -->
  
  <!-- endinject -->
  <!-- endbuild -->
  <style type="text/css">
  	 .reg-panel-body {
	 }
	 .x-form-text-default {
	 	color : #1c2b36;
	 	background-color: rgba(0,0,0,.02);
	 	border: 0px solid #d0d0d0;
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
</head>
<body>
<main class="auth-main">
 </main>
</body>
</html>