var socket2 = new SockJS("/int/ws");
var stompClient2 = Stomp.over(socket2);
var errorCount2 = 0; 
var isNotConnected2 = false;

// Callback function to be called when stomp client is connected to server
var connectCallback2 = function() {  
 	stompClient2.subscribe('/topic/portal/reload', reloadData);
}; 

// Callback function to be called when stomp client could not connect to server
var errorCallback2 = function(error) {
	errorCount2++;
	isNotConnected2 = true
	if (errorCount2 > 1000) {
		alert("서버 접속이 불가한 상태 입니다. 잠시후 재 접속하시기 바랍니다.");
	} else {
		sleep(10000);
		retryConnection(); 
	}
};

// Connect to server via websocket
stompClient2.connect("guest", "guest", connectCallback2, errorCallback2);

function sleep(msecs) {
	var stat = new Date().getTime();
	var cur = stat;
	while(cur - stat < msecs) {
		cur = new Date().getTime();
	}
}

function retryConnection() {
	if (isNotConnected2) {
		socket2 = new SockJS("/int/ws");
		stompClient2 = Stomp.over(socket);
		stompClient2.connect("guest", "guest", connectCallback2, errorCallback2);
	}
}


function reloadData(frame) {
	var data = Ext.decode(frame.body);
	
	var cmp = Ext.getCmp(data.action + '-grid');
	cmp.getStore().load();
	var chart = Ext.getCmp(data.chart);
	if (chart != null) {
		chart.getStore().load();
		chart.redraw();
	}
}