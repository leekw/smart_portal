Ext.define('Ui.analysis.sourceResult.view.OperationGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.operationgrid',
    title: '메소드',
    background: 'none',
    layout: 'fit',
    id:'operation-grid',
    minHeight : 600,
    maxHeight : 700,
    columnLines : true,
    initComponent: function() {

         this.store = 'OperationGrid';
        
        this.selModel = {
        };
       
        this.columns = [
		new Ext.grid.RowNumberer({
			header : 'No',
			width: 60,
			align :'center'
		}),
        { 
            header: '메소드 명',
            dataIndex: 'assetOpName'
        },
		{
			header: '파라미터',
            width: 150,
			dataIndex: 'argumentType',
            allowBlank: false
		},
        { 
            header: '리턴타입',
            width: 200,
            dataIndex: 'returnType'
        }
        
        ];
        
        this.callParent(arguments);
    },

    listeners : {
    	afterrender : function(panel) {
    	},
    	beforerender : function(panel) {
    		
    	},
        cellselecion : function(grid, selection,eOpts){
    	    console.log("cellselecion");
        },
        select : function (grid,selected,eOpts){
            console.log("select:"+selected.data.assetOpCode);
            var panel = Ext.getCmp('operation-panel');

            panel.html = selected.data.assetOpCode;
            var tabPanel = Ext.getCmp('analysis-source-result-tab-panel');

            tabPanel.setActiveTab(1);
         }
    }
});

