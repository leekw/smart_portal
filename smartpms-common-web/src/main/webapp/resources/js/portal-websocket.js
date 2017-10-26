var socket = new SockJS("/int/ws");
var stompClient = Stomp.over(socket);
var errorCount = 0;
var isNotConnected = false;

// Callback function to be called when stomp client is connected to server
var connectCallback = function() {
 	stompClient.subscribe('/topic/portal/status', changeProjectStatus);
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


function changeProjectStatus(frame) {
	var win = Ext.getCmp('noticeOpen');
	var data = Ext.decode(frame.body);
	
	projectStatus = data;
	
	if (projectStatus.useYn == 'Y') {
		var tr = $('.active');
		for (var i=0;i< tr.length;i++) {
			tr[i].className = '';
		}
		
		var trm = $('.activem');
		for (var i=0;i< trm.length;i++) {
			if (trm[i].id.indexOf("_c") != -1) {
				trm[i].id = projectStatus.connUserLight + '_c';
			}
			if (trm[i].id.indexOf("_b") != -1) {
				trm[i].id = projectStatus.bizLight + '_b';
			}
			if (trm[i].id.indexOf("_i") != -1) {
				trm[i].id = projectStatus.iscLight + '_i';
			}
		}
		
		var main = $('#' + projectStatus.mainLight + '_m');
		main[0].className = 'active';
	} else {
		var biz = '';
		var conn = '';
		var helf = '';
		if(projectStatus.bizData1 <  100) {
			biz = "red";
		} else if(projectStatus.bizData1 >= 100 && projectStatus.bizData1 < 500) {
			biz = "orange";
		} else {
			biz = "green";
		}
		
		var ratio = projectStatus.connData1/projectStatus.target*100;
		if(ratio <  30) {
			conn = "red";
		} else if(ratio >= 30 && ratio < 50) {
			conn = "orange";
		} else {
			conn = "green";
		}
		
		var ratio1 = projectStatus.helfData2/projectStatus.helfData2*100;
		var ratio2 = projectStatus.helfData4/projectStatus.helfData3*100;
		var ratio3 = projectStatus.helfData6/projectStatus.helfData5*100;
		var ratio4  = (ratio1 + ratio2 + ratio3)/3;
		if(ratio4 <  30) {
			helf = "red";
		} else if(ratio4 >= 30 && ratio4 < 50) {
			helf = "orange";
		} else {
			helf = "green";
		}
		
		var trm = $('.activem');
		for (var i=0;i< trm.length;i++) {
			if (trm[i].id.indexOf("_c") != -1) {
				trm[i].id = conn + '_c';
			}
			if (trm[i].id.indexOf("_b") != -1) {
				trm[i].id = biz + '_b';
			}
			if (trm[i].id.indexOf("_i") != -1) {
				trm[i].id = helf + '_i';
			}
		}
		
	}
	
}