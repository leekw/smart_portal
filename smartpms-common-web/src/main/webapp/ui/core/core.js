var projectStatus = {
	mainLight : '',
	connUserLight : '',
	bizLight : '',
	iscLight : '',
	useYn : '',
	limitConnectionCount : 0,
	connTarget: 0,
	connData1: 0,
	bizData1: 0,
	helfData1: 0,
	helfData2: 0,
	helfData3: 0, 
	helfData4: 0,
	helfData5: 0,
	helfData6: 0,
	cutoverStartDate :'',
	cutoverEndDate : '',
	defectStartDate :'',
	defectEndDate : ''
};
var G_TOKEN;
var _hourSacle = 6;
var SELECTED_ROlE_NAME;
var SELECTED_ROlE_ID;

Ext.Ajax.defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
};

Ext.Ajax.on('beforerequest', function(con, opt){
	//Ext.getBody().mask("Processing...");
	opt.headers = Ext.apply({
		'Accept' : 'application/json',
		'X-CSRF-Token': G_TOKEN == null ? opener != null && opener.G_TOKEN != null ?  opener.G_TOKEN : parent != null && parent.parent != null ? parent.parent.G_TOKEN : parent.G_TOKEN : G_TOKEN
	}, opt.headers || {});
}, this);

Ext.Ajax.on('requestcomplete', function(con, res, opt){
	//Ext.getBody().unmask();
	var data = JSON.parse(res.responseText);
	if (data.error != null && data.error.code == 'NOTAUTH') {
		if (Ext == null || Ext.Msg == null) {
			alert('해당 서비스의 사용 권한이 없습니다.');
		} else {
			Ext.Msg.alert('Not Auth', '해당 서비스의 사용 권한이 없습니다.');
		}
//		alert('해당 서비스에 접근할 수 있는 권한이 없습니다.');
//		if (parent != null) {
//			parent.document.location.href = G_PATH + '/layout/app/view.do';
//		} else {
//			document.location.href = G_PATH + '/layout/app/view.do';
//		}
	}
	if (data.error != null && data.error.code == 'NOTLOGIN') {
		if (Ext == null || Ext.Msg == null) {
			alert('로그인 세션이 유효하지 않습니다. 재로그인 하시기 바랍니다.');
		} else {
			Ext.Msg.alert('Not Login', '로그인 세션이 유효하지 않습니다. 재로그인 하시기 바랍니다.');
		}
		if (parent != null) {
			parent.document.location.href = G_PATH + '/login.html';
		} else {
			document.location.href = G_PATH + '/login.html';
		}
	}
}, this);

Ext.Ajax.on('requestexception', function(con, resp, op, e){
	Ext.Msg.alert('System Error!!', '시스템 오류가 발생되었습니다.<br>관리자에게 문의하시기 바랍니다.');
}, this);

Ext.Ajax.setTimeout(60000 * 10);
Ext.override(Ext.data.proxy.Server, {
    buildRequest: function(operation) {
    var params = Ext.applyIf(operation.params || {}, this.extraParams || {}),
         request;
		
        //copy any sorters, filters etc into the params so they can be sent over the wire
    params = Ext.applyIf(params, this.getParams(params, operation));
		
    if (operation.id && !params.id) {
        params.id = operation.id;
     }
    request = Ext.create('Ext.data.Request', {
        // explicitly JSON-encode POSTed parameters
        params   : (Ext.JSON.encode(params)),
        action   : operation.action,
        records  : operation.records,
        operation: operation,
        url      : operation.url == null ? this.url : operation.url
    });
				
    request.url = this.buildUrl(request);
    

    /*
     * Save the request on the Operation. Operations don't usually care about Request and Response data, but in the
     * ServerProxy and any of its subclasses we add both request and response as they may be useful for further processing
     */
    operation.request = request;
    return request;
    }
});

Ext.apply(Ext.form.field.VTypes, {
    IPAddress:  function(v) {
        return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(v);
    },
    IPAddressText: 'Must be a numeric IP address!',
    IPAddressMask: /[\d\.*]/i
});
Ext.Loader.loadScript({url:G_PATH + '/ui/common/CommonCode.js'});
var Cookies = {
		_getCookie : function(cookieName) {
			var search = cookieName + "=";
			var cookie = document.cookie;
			var startIndex, endIndex;
			if (cookie != null && cookie.length > 0) {
				startIndex = cookie.indexOf(cookieName);
				
				if (startIndex != -1) {
					startIndex += cookieName.length;

					endIndex = cookie.indexOf(";", startIndex);
					
					if (endIndex == -1) endIndex = cookie.length;
					
					return unescape( cookie.substring(startIndex + 1, endIndex));
				} else {
					return false;
				}
			} else {
				return false;
			}
		},
		_setCookie : function(name, value, expiredday) {
			var today;
			if (expiredday != -1) {
				today = new Date();
				today.setDate(today.getDate() + expiredday);
			} else {
				today = new Date(9999, 12, 31);
			}
			document.cookie = name + "=" + escape(value) + ";path=/; expires=" + today.toGMTString() + ";";
		},
		_delCookie : function(_name) {
			var cookies = document.cookie.split(";");
			
			for (var i=0;i < cookies.length;i++) {
				var cookie = cookies[i];
				var eqPos = cookie.indexOf("=");
				var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
				if (name == _name) {
					document.cookie = name + "=;path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
				}
			}
		}
};
var DateUtil = {
		_formatDate : function(date, index) {
			date.setDate(date.getDate() + index);
			var yyyy = date.getFullYear().toString();
			var mm = (date.getMonth()+1).toString();
			var dd = date.getDate().toString();
			
			var mmChars = mm.split('');
			var ddChars = dd.split('');
			
			var datestring = (mmChars[1]?mm:"0"+mmChars[0]) + '/' + (ddChars[1]?dd:"0"+ddChars[0]);
			
			return datestring;
		},
		_formatDateYmd : function(date, index) {
			date.setDate(date.getDate() + index);
			var yyyy = date.getFullYear().toString();
			var mm = (date.getMonth()+1).toString();
			var dd = date.getDate().toString();
			
			var mmChars = mm.split('');
			var ddChars = dd.split('');
			
			var datestring = yyyy + (mmChars[1]?mm:"0"+mmChars[0]) + (ddChars[1]?dd:"0"+ddChars[0]);
			
			return datestring;
		},
		_formatDateNormal : function(date) {
			var yyyy = date.getFullYear().toString();
			var mm = (date.getMonth()+1).toString();
			var dd = date.getDate().toString();
			
			var mmChars = mm.split('');
			var ddChars = dd.split('');
			
			var datestring = yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
			
			return datestring;
		},
		_formatTime : function(date) {
			var hh = date.getHours().toString();
			var mi = date.getMinutes().toString();
			
			var hhChars = hh.split('');
			var miChars = mi.split('');
			
			var datestring = (hhChars[1]?hh:"0"+hhChars[0]) + ':' + (miChars[1]?mi:"0"+miChars[0]);
			
			return datestring;
		}
	};