Ext.define('Ext.stabilization.store.ConnUser', {
    extend: 'Ext.data.Store',
    model: 'Ext.stabilization.model.Statistic',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/connuser/list/get.json',
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
    		var target = 0;
    		var syncDate = "";
    		for (var i=0;i < node.length;i++) {
    			target += parseInt(node[i].data.target);
    			data += parseInt(node[i].data.data1);
    			if (syncDate == "") {
    				syncDate = node[i].data.strDay;
    			}
    		}
    		var total = Ext.getCmp('conn-top');
    		total.setData({
    			amount: Ext.util.Format.number(data,'0,000'),
		        type: '접속자 수',
		        icon: 'users',
		        color : 'blue',
		        background :'#673ab7'
    	    });
//    		temp.setHtml('<font color="#777"><h2><div style="padding:10px;"><b><center>' + Ext.util.Format.number(target,'0,000') + '/' + Ext.util.Format.number(data,'0,000') + '</center></b></div></h2></font>');
//    		
//    		
//    		
//    		var colorId = "green";
//    		var ratio = data/target*100;
//    		if(ratio <  30) {
//    			colorId = "red";
//    		} else if(ratio >= 30 && ratio < 50) {
//    			colorId = "orange";
//    		} else {
//    			colorId = "green";
//    		}
//    		
//    		if (projectStatus.useYn == "Y") {
//    			colorId = projectStatus.connUserLight;
//    		}
//    		
//    		projectStatus.connTarget = target;
//    		projectStatus.connData1 = data;
//    		
//            var p1 = Ext.getCmp('conn-pt');
//		    var html = '<right><div id="light_sm"><span class="activem" id="'+ colorId + '_c" onclick="TrafficLight._changeTrafficLight(this);"></span>';
//		    //p1.header.setHtml(html);
//		    p1.setTitle("접속자 현황-" + syncDate);
//		    
//		    
//		    
//		    var chart = Ext.getCmp('conn-user-chart');
//			if (chart != null) {
//				chart.getStore().load();
//				chart.redraw();
//			}
    	}
    },
    autoLoad : true
});