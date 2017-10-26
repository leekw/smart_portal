Ext.define('Ext.qualityhist.store.DeveloperRank', {
    extend: 'Ext.data.Store',
    model: 'Ext.qualityhist.model.DeveloperTop',
    autoDestroy: false,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/quality/developer/top/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'developers'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0}
    },
    autoLoad : false,
    listeners : {
    	load : function(store, node, rec) {
    		var verifyTotal = 0;
    		for (var i=0;i < node.length;i++) {
    			verifyTotal += node[i].data.totalScore;
    		}
    		var comp = Ext.getCmp('rank-title');
    		var html = '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;개발자 전체 순위</span></div>'
    			+ '<div style="float:right;">품질 전체 점수(100점기준)-' + (verifyTotal > 100 ? 100 : verifyTotal.toFixed(2))  + '점</div>'
    		    + '</div>';
    		comp.setHtml(html);
    	}
    }
});