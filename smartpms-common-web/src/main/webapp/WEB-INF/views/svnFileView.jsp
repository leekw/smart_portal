<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html> 
<html>
    <head>
       <title> Integration Dashboard System</title>
       <link rel="stylesheet" type="text/css" href="/int/resources/css/styles/github.css">
       <style type="text/css">
		
	   </style>
       <script type="text/javascript" src="/int/resources/js/highlight.pack.js"></script>
    </head>
    <body>
    	<script type="text/javascript">hljs.initHighlightingOnLoad();</script>
    	<pre><code class="${hlType}">${svnFileInfo}</code></pre>
    </body>
</html>