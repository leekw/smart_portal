Ext.define('Ext.programvf.store.ProgramListJira', {
    extend: 'Ext.data.Store',
    model: 'Ext.programvf.model.ProgramListJira',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/changerequest/programlist/jira/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'programs'
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
    		var topLabel = '';
    		for (var i=0;i < node.length;i++) {
    			if (topLabel == '') {
    				topLabel = '팀 : ' + node[i].data.team + ' > 모듈 : ' + node[i].data.module;
    				break;
    			}
    		}
    		var top = Ext.getCmp('top-label');
    		top.setHtml('<h3>' + topLabel + '</h3>');
    		
    	}
    }
});