Ext.define('Ext.stabilizationm.view.Viewport', {
    extend: 'Ext.Viewport', 
    overflowY : 'auto',
    requires: [
        'Ext.stabilizationm.view.StabilizationDashboard',
        'Ext.stabilizationm.view.StabilizationDashboard2',
        'Ext.stabilizationm.view.StabilizationDashboard3',
        'Ext.stabilizationm.view.StabilizationDashboard4',
        'Ext.stabilizationm.view.WidgetTop',
        'Ext.stabilizationm.view.WizardOne',
        'Ext.stabilizationm.view.ConnUserGrid',
        'Ext.stabilizationm.view.BizProcessGrid',
        'Ext.stabilizationm.view.ConnUserChart',
        'Ext.stabilizationm.view.QuestionGrid',
        'Ext.stabilizationm.view.WfmGrid',
        'Ext.stabilizationm.view.ItsmGrid',
        'Ext.stabilizationm.view.HelfGrid',
        'Ext.stabilizationm.view.BizProcessChart',
        'Ext.stabilizationm.view.StabilizationPieChart',
        'Ext.ux.BoxReorderer',
        'Ext.stabilizationm.view.JiraLevelGrid',
        'Ext.stabilizationm.view.JiraChart'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
				{
					xtype : 'tabpanel',
					border:false,
					bodyStyle: {
				        background: 'none'
				    },
				    id : 'stabliization-tab-panel',
					items : [
		                {
		                    xtype: 'stabliizationdashboard',
		                    title : '처리 현황'
		                },
		                {
		                	xtype: 'stabliizationdashboard2',
		                    title : '접속자 추이'
		                },
		                {
		                	xtype: 'stabliizationdashboard3',
		                    title : '업무 추이'
		                },
		                {
		                	xtype: 'stabliizationdashboard4',
		                    title : 'Defect 추이'
		                }
		            ]
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


