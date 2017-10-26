Ext.Loader.loadScript({url:G_PATH + '/ext/common/CommonCode.js'});
Ext.Loader.loadScript({url:G_PATH + '/ext/common/Org.js'});
Ext.define('Ext.quality.view.Viewport', {
    extend: 'Ext.Viewport',    
    overflowY : 'auto',
    requires: [
       'Ext.quality.view.QualityPanel',
       'Ext.quality.view.OrgGrid',
       'Ext.quality.view.QualitySummaryGrid',
       'Ext.quality.view.QualityFunctionGrid',
       'Ext.quality.view.QualityDetailGrid',
       'Ext.quality.view.DeveloperGrid',
       'Ext.quality.view.DeveloperTopGrid',
       'Ext.quality.view.ProgramGrid',
       'Ext.quality.view.DeveloperRankGrid',
       'Ext.quality.view.DeveloperWinGrid',
       'Ext.quality.view.QualityWinPanel',
       'Ext.ux.BoxReorderer'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'qualitypanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
