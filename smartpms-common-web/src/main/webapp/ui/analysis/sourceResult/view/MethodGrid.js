Ext.define('Ui.analysis.sourceResult.view.MethodGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.methodgrid',
    title: '메소드',
    background: 'none',
    layout: 'fit',
    id:'method-grid',
    minHeight : 600,
    maxHeight : 700,
    columnLines : true,
    initComponent: function() {

         this.store = {
             // data:[{
             //     "methodName":"setTest",
             //     "parameter":"methodDTO",
             //     "returnType":"void",
             // },{
             //     "methodName":"getTest",
             //     "parameter":"String,Int",
             //     "returnType":"List<hashMap>",
             // },{
             //     "methodName":"getTarget",
             //     "parameter":"String,String",
             //     "returnType":"Boolean",
             // }]
         };
        
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
            dataIndex: 'methodName'
        },
		{
			header: '파라미터',
            width: 150,
			dataIndex: 'parameter',
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
    		
    	}
    }
});

