Ext.define('Ext.stabilization.view.Viewport', {
    extend: 'Ext.Viewport', 
    overflowY : 'auto',
    requires: [
        'Ext.stabilization.view.StabilizationDashboard',
        'Ext.stabilization.view.WidgetTop',
        'Ext.stabilization.view.WizardOne',
        'Ext.stabilization.view.ConnUserGrid',
        'Ext.stabilization.view.BizProcessGrid',
        'Ext.stabilization.view.ConnUserChart',
        'Ext.stabilization.view.QuestionGrid',
        'Ext.stabilization.view.WfmGrid',
        'Ext.stabilization.view.ItsmGrid',
        'Ext.stabilization.view.HelfGrid',
        'Ext.stabilization.view.BizProcessChart',
        'Ext.stabilization.view.StabilizationPieChart',
        'Ext.ux.BoxReorderer',
        'Ext.stabilization.view.JiraLevelGrid',
        'Ext.stabilization.view.JiraChart'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'stabliizationdashboard'
                }
            ]
        });
                
        me.callParent(arguments);
    },
    listeners : {
    	beforerender : function() {
			
    	},
    	beforeshow : function() {
    		
    	}
    }
});


