Ext.define('Ext.sample.view.SampleTabPanel', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.sampletabpanel',
	title : 'Integration View Sample TabPanel',
	minHeight: 300,
	bodyPadding : 5,
	fieldDefaults : {
		labelAlign : 'left',
		msgTarget : 'side'
	},
	tools : [{
        type : 'plus',
        itemId: 'addTabButton'
    }],
	items : [{
		title : 'tab-1',
		items : [{
			xtype : 'samplecodegrid'
		}
		],
		closable : true
	},{
		title : 'tab-2',
		items : [{
			xtype : 'samplecombobox'
		}],
		closable : true
	}]
});