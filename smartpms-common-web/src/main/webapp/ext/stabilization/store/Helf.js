Ext.define('Ext.stabilization.store.Helf', {
    extend: 'Ext.data.Store',
    model: 'Ext.stabilization.model.Statistic',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/helf/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'datas'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0, day : DateUtil._formatDateYmd(new Date(), 0) }
    },
    listeners : {
    	load : function(store, node, rec) {
    		
//    		var q1 = Ext.getCmp('q1-top');
//    		var q15 = Ext.getCmp('q15-top');
//    		var q2 = Ext.getCmp('q2-top');
//    		var que = Ext.getCmp('que-top');
    		var data1 = 0;
    		var data2 = 0;
    		var data3 = 0;
    		var data4 = 0;
    		var data5 = 0;
    		var data6 = 0;
    		var total = 0;
    		var syncDate = "";
    		for (var i=0;i < node.length;i++) {
    			data1 += parseInt(node[i].data.data1);
    			data2 += parseInt(node[i].data.data2);
    			data3 += parseInt(node[i].data.data3);
    			data4 += parseInt(node[i].data.data4);
    			data5 += parseInt(node[i].data.data5);
    			data6 += parseInt(node[i].data.data6);
    			if (syncDate == "") {
    				syncDate = node[0].data.strDay;
    			}
    		}
    		total = data1 + data2 + data3 + data4 + data5 + data6;
    		var total1 = Ext.getCmp('que-top');
    		total1.setData({
    			amount: Ext.util.Format.number(total,'0,000'),
    			type: '문의',
		        icon: 'question-circle',
		        color : 'orange',
		        background :'#ffc107'
    	    });
    		var total2 = Ext.getCmp('wait-top');
    		total2.setData({
    			amount: Ext.util.Format.number(data1,'0,000'),
    			type: '대기',
		        icon: 'pause',
		        color : 'green',
		        background :'#4caf50'
    	    });
    		var total3 = Ext.getCmp('proc-top');
    		total3.setData({
    			amount: Ext.util.Format.number(data2,'0,000') + '/' + Ext.util.Format.number(data3,'0,000') + '/' + Ext.util.Format.number(data4,'0,000'),
    			type: '처리중(1/1.5/2)',
		        icon: 'gears',
		        color : 'pink',
		        background :'#e91e63'
    	    });
    		var total4 = Ext.getCmp('comp-top');
    		total4.setData({
    			amount: Ext.util.Format.number(data5,'0,000') + '/' + Ext.util.Format.number(data6,'0,000'),
    			type: '조치완료/종료',
		        icon: 'check',
		        color : 'cornflower-blue',
		        background :'#458fd2'
    	    });
//    		q1.setHtml('<font color="#777"><h2><div style="padding:10px;"><b><center>' + Ext.util.Format.number(data1,'0,000')  + '</center></b></div></h2></font>');
//    		q15.setHtml('<font color="#777"><h2><div style="padding:10px;"><b><center>' + Ext.util.Format.number(data2,'0,000') + '/' + Ext.util.Format.number(data3,'0,000') + '/' + Ext.util.Format.number(data4,'0,000') + '</center></b></div></h2></font>');
//    		q2.setHtml('<font color="#777"><h2><div style="padding:10px;"><b><center>' + Ext.util.Format.number(data5,'0,000') + '/' + Ext.util.Format.number(data6,'0,000') + '</center></b></div></h2></font>');
//    	
    	    
//    	    que.setHtml('<font color="#777"><h2><div style="padding:10px;"><b><center>' + Ext.util.Format.number(total,'0,000') + '</center></b></div></h2></font>');
//    		
//    		
//    		var colorId = "green";
//    		var ratio1 = data2/data1*100;
//    		var ratio2 = data4/data3*100;
//    		var ratio3 = data6/data5*100;
//    		var ratio  = (ratio1 + ratio2 + ratio3)/3;
//    		if(ratio <  30) {
//    			colorId = "red";
//    		} else if(ratio >= 30 && ratio < 50) {
//    			colorId = "orange";
//    		} else {
//    			colorId = "green";
//    		}
//    		
//    		if (projectStatus.useYn == "Y") {
//    			colorId = projectStatus.iscLight;
//    		}
//    		
//    		projectStatus.helfData1 = data1;
//    		projectStatus.helfData2 = data2;
//    		projectStatus.helfData3 = data3;
//    		projectStatus.helfData4 = data4;
//    		projectStatus.helfData5 = data5;
//    		projectStatus.helfData6 = data6;
//    		
//    		var p3 = Ext.getCmp('isc-pt');
//			var html = '<center><div id="light_sm"><span class="activem" id="' + colorId + '_i" onclick="TrafficLight._changeTrafficLight(this);"></span></center>';
//		    //p3.header.setHtml(html);
//		    
//		    p3.setTitle("ISC 접수 현황 - " + syncDate);
    	}
    },
    autoLoad : true
});