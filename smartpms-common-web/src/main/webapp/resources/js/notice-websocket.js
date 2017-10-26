var socket = new SockJS(G_PATH + "/ws");
var stompClient = Stomp.over(socket);
var errorCount = 0;
var isNotConnected = false;

// Callback function to be called when stomp client is connected to server
var connectCallback = function() {
	isNotConnected = false;
 	stompClient.subscribe('/topic/notice', noticeOpen);
}; 

// Callback function to be called when stomp client could not connect to server
var errorCallback = function(error) {
	errorCount++;
	isNotConnected = true
	if (errorCount > 1000) {
		alert("서버 접속이 불가한 상태 입니다. 잠시후 재 접속하시기 바랍니다.");
	} else {
		sleep(10000);
		retryConnection(); 
	}
};

// Connect to server via websocket
stompClient.connect("guest", "guest", connectCallback, errorCallback);

function sleep(msecs) {
	var stat = new Date().getTime();
	var cur = stat;
	while(cur - stat < msecs) {
		cur = new Date().getTime();
	}
}

function retryConnection() {
	if (isNotConnected) {
		socket = new SockJS("/int/ws");
		stompClient = Stomp.over(socket);
		stompClient.connect("guest", "guest", connectCallback, errorCallback);
	}
}

function noticeContent(data) {
	var result = "";
	
	result += '<center><h2>' + data.noticeTitle + '</h2><br></center>';
	result += '<center><div style="padding: 10 10 10 10;"><p>' + data.noticeDescription + '</h2><div></center>';
	return result;
}


function notifyMe(data) {
	if(!Notification) { 
		alert('Desktop notifications not available in your browser. Try Chromium.');
		return;
	}
	
	if (Notification.permission !== "granted")
		Notification.requestPermission();
	else {
		var notification = new Notification('상황실 공지 알림' + data.noticeId,{
			icon: 'http://10.217.136.106:8080/int/resources/themes/images/default/shared/icon-info.gif',
			body: '상황실 공지 내용 : ' + data.noticeTitle
		});
		notification.onclick = function() {
			window.focus();
			this.close();
		}
		notification.onshow = function () {
			setTimeout(notification.close, 1000);
		}
	}
}

function noticeOpen(frame) {
	var win = Ext.getCmp('noticeOpen');
	var data = Ext.decode(frame.body);
	notifyMe(data);
	if (win != null) win.close();
	if (frame != null) {
		win = Ext.create('Ext.window.Window', {
			id : 'noticeOpen',
    	    title: '상황실 공지 알람',
    	    resizable : true,
    	    autoScroll: true,
    	    maximizable : true,
    	    height: '65%',
    	    width: '65%',
    	    layout: 'fit',
    	    animateTarget:this,
    	    html : noticeContent(data),
    	    listeners: {
    	    	show: function (w) {
    	             w.el.slideIn('t', {
    	            	    easing: 'easeIn',
    	            	    duration: 1500
    	            	});
    	        }
    	    }
    	});
		win.show();
	}
}