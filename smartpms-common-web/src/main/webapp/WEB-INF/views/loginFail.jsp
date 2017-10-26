<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title> ${sysTitle}</title>
    <script type="text/javascript">
	  var G_PATH = "${sysContext}";
	  </script>
     <!-- <link rel="stylesheet" type="text/css" href="/int/resources/ext-theme-neptune/build/resources/ext-theme-neptune-all-debug.css"> -->
     <link rel="stylesheet" type="text/css" href="${sysContext}/resources/theme-triton/resources/theme-triton-all-debug.css">
     <link rel="stylesheet" type="text/css" href="${sysContext}/resources/theme-int/Admin-all.css">
     <meta http-equiv="X-UA-Compatible" content="IE=9">
     <meta name="viewport" content="user-scalable=yes, width=device-width, initial-scale=0.9, maximum-scale=1.0"/>
     <meta name="apple-mobile-web-app-capable" content="yes">
      
     <script type="text/javascript" src="${sysContext}/resources/ext/ext-all.js"></script>
     <script type ="text/javascript" src="${sysContext}/ext/core/core.js"></script>
     <script type ="text/javascript" src="${sysContext}/ext/loginfail/app.js"></script>
</head>
<body>
    <script type="text/javascript">
    var G_ERROR_MSG = "${G_ERROR_MSG}";
    </script>
</body>
</html>
