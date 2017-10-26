Ext.define('Ext.qualityhist.view.Viewport', {
    extend: 'Ext.Viewport',    
    overflowY : 'auto',
    requires: [
       'Ext.qualityhist.view.QualityHistPanel',
       'Ext.qualityhist.view.QualityHistSummaryGrid',
       'Ext.qualityhist.view.ProgramDevChart',
       'Ext.qualityhist.view.UnUsedSourceChart',
       'Ext.qualityhist.view.UnderStatementChart',
       'Ext.qualityhist.view.UnitTestChart',
       'Ext.qualityhist.view.RunChart',
       'Ext.qualityhist.view.CoverageChart',
       'Ext.qualityhist.view.SitTestChart',
       'Ext.qualityhist.view.SitCoverageChart',
       'Ext.qualityhist.view.ProgramGrid',
       'Ext.qualityhist.view.QualityWinPanel',
       'Ext.qualityhist.view.DeveloperWinGrid',
       'Ext.qualityhist.view.DeveloperRankGrid',
       'Ext.qualityhist.view.CheckTargetChart',
       'Ext.qualityhist.view.SourceSizeChart',
       'Ext.qualityhist.view.ChangeSourceChart',
       'Ext.qualityhist.view.SitRunChart',
       'Ext.qualityhist.view.SitNoTestChart',
       'Ext.qualityhist.view.SvnNotRegChart',
       'Ext.qualityhist.view.UnitTestNoTestChart',
       'Ext.ux.BoxReorderer'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'qualityhistpanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
