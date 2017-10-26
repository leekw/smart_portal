Ext.define('Ext.stabilization.store.BizProcess', {
    extend: 'Ext.data.Store',
    model: 'Ext.stabilization.model.Statistic',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/bizprocess/list/get.json',
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
    		var data = 0;
    		var syncDate = "";
    		var target = 0;
    		for (var i=0;i < node.length;i++) {
    			data += parseInt(node[i].data.data1);
    			if (syncDate == "") {
    				syncDate = node[i].data.strDay;
    				              
    			}
    		}
    		var total = Ext.getCmp('biz-top');
    		total.setData({
    			amount: Ext.util.Format.number(data,'0,000'),
		        type: '업무처리',
		        icon: 'tasks',
		        color : 'gray',
		        background :'#c0c0c0'
    	    });
//    		temp.setHtml('<font color="#777"><h2><div style="padding:10px;"><b><center>' + Ext.util.Format.number(data,'0,000') + '</center></b></div></h2></font>');
//    		
//    		var colorId = "green";
//    		if(data <  100) {
//    			colorId = "red";
//    		} else if(data >= 100 && data < 500) {
//    			colorId = "orange";
//    		} else {
//    			colorId = "green";
//    		}
//    		
//    		if (projectStatus.useYn == "Y") {
//    			colorId = projectStatus.bizLight;
//    		}
//    		
//    		projectStatus.bizData1 = data;
//    		
//    		var p2 = Ext.getCmp('biz-pt');
//			var html = '<center><div id="light_sm"><span class="activem" id="' + colorId + '_b" onclick="TrafficLight._changeTrafficLight(this);"></span></center>';
//		    //p2.header.setHtml(html);
//		    p2.setTitle("업무처리 현황-" + syncDate);
    	}
    },
    autoLoad : true
});