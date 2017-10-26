Ext.define('Ext.ncutover.view.CutoverStatusBar', {
    extend: 'Ext.Panel',
    xtype: 'cutoverstatusbar',

    requires: [
       
    ],

    cls: 'service-type shadow-panel',
    height: 320,
    bodyPadding: 15,
    title: '작업단계별 진행 현황',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
       
    ],
    listeners : {
    	afterrender : function(panel) {
    		var header = panel.header;
    		header.setStyle('background-color', '#8dc153');
    		header.setStyle('border-color', '#8dc153');
    	}
    }
});
