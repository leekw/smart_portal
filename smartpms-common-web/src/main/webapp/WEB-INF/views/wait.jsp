<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html> 
<html>
    <head>
       <title>kt BSS Project State Shared System</title>
       <link rel="stylesheet" type="text/css" href="/int/resources/ext-theme-crisp/build/resources/ext-theme-crisp-all.css">
       <meta http-equiv="X-UA-Compatible" content="IE=9">
        <style type="text/css">
	   </style>
	   <script type="text/javascript" src="/int/resources/ext/ext-all.js"></script>
       <script type="text/javascript">
       Ext.require([ 
       		'Ext.window.Window',
       ]);
       
       var limit = ${maxConnection};
       var cur = ${curConnection};
       function view() {
	       	var win = Ext.create('Ext.window.Window', {
	   			id : 'wait-window',
	       	    title: '서버 접속 지연',
	       	    resizable : true,
	       	    autoScroll: true,
	       	    maximizable : true,
	       	    height: 320,
	       	    width: 300,
	       	    animateTarget:this,
	       	 	layout: 'fit',
	       	    html : '<center><div style="padding:20px;"><h2>최대 접속 가능 수 : ' + limit + '</h2><br><h2>현재 접속 시도 수:' + cur + '</h2><br><h3>잠시후 재접속 하시기 바랍니다.</h3></div></center>',
	       	    buttons:[
	       	       {text: '재접속', handler:function() {
	       	    	   if (parent != null) {
	       	    		   parent.document.location.href = "/int/layout/app/view.do";
	       	    	   } else {
	       	    		   document.location.href = "/int/layout/app/view.do";
	       	    	   }
	       	       }}
	       	    ]
	       	});
	   		win.show();
       }
       </script>
    </head>
    <body>

    	<script type="text/javascript">
    	
    	view();
    	</script>

    </body>
</html>