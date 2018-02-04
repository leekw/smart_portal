
Ext.define('Ui.analysis.sourceResult.view.AnalysisSourceResultTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.analysissourceresulttree',
    id: 'result-tree',
    minHeight: 610,
    maxHeight: 610,
    margin: '0 0 0 2',
    bodyPadding: 10,
    border: false,
    rootVisible: false,
    scroll: 'vertical',
    store: 'AnalysisSourceResultTree',
    columns: [{
        xtype: 'treecolumn',
        text: '클래스',
        width: 300,
        locked: true,
        dataIndex: 'assetName',
        editor: {
            allowBlank: false
        }
    } ]
  ,
    listeners: {
        beforeexpand : function(p,animate,eOpts){
            console.log("beforeexpand");
        },

        expand : function(p,eOpts){
            console.log("expand");
        },

        beforecellclick: function (tree, td, cellIndex, record, tr, rowIndex, e, eOpts) {

            console.log("beforecellclick");
            console.log(record.data.assetName);
            var proxy = tree.store.proxy;
            proxy.extraParams.assetName = record.data.assetName;


        },

        beforeselect: function (model, record, index, eOpts) {
            console.log("beforeselect");

        },


        cellclick: function (talbe, td, cellIndex, record, tr, rowindex, e, eOpts) {
            console.log("cellclick");





            // if(td.dataset.columnid =='target') {
            //
            //     var grid = Ext.getCmp('operation-grid');
            //     var store = grid.getStore();
            //     var proxy = store.getProxy();
            //
            //     proxy.extraParams.analysisAssetId = record.raw.analysisAssetId;
            //     store.load();
            //
            //     var tabPanel = Ext.getCmp('analysis-source-result-tab-panel');
            //
            //     tabPanel.setActiveTab(0);
            // }
            // if (record.data.depth != "1") {
				// 	Ext.getCmp('method-grid').store.setData([{
            //             "methodName":"setTest",
            //             "parameter":"methodDTO",
            //             "returnType":"void",
            //         },{
            //             "methodName":"getTest",
            //             "parameter":"String,Int",
            //             "returnType":"List<hashMap>",
            //         },{
            //             "methodName":"getTarget",
            //             "parameter":"String,String",
            //             "returnType":"Boolean",
            //         }]);
            // }
            // if (rowindex== 1) {
            //     	Ext.getCmp('operation-grid').store.setData([{
            //                 "methodName":"setTest",
            //                 "parameter":"methodDTO",
            //                 "returnType":"void",
            //             },{
            //                 "methodName":"getTest",
            //                 "parameter":"String,Int",
            //                 "returnType":"List<hashMap>",
            //             },{
            //                 "methodName":"getTarget",
            //                 "parameter":"String,String",
            //                 "returnType":"Boolean",
            //             },{
            //             "methodName":"getString",
            //             "parameter":"String,String,int",
            //             "returnType":"String",
            //         }]);
            //
            // }else if(rowindex== 2){
            //     Ext.getCmp('operation-grid').store.setData([{
            //         "methodName":"beforeChange",
            //         "parameter":"Menu",
            //         "returnType":"int",
            //     },{
            //         "methodName":"loadStore",
            //         "parameter":"String,Int",
            //         "returnType":"List<hashMap>",
            //     },{
            //         "methodName":"getString",
            //         "parameter":"String,String,int",
            //         "returnType":"String",
            //     }]);
            //
            // }else if(rowindex== 3){
            //     Ext.getCmp('operation-grid').store.setData([{
            //         "methodName":"setTest",
            //         "parameter":"methodDTO",
            //         "returnType":"void",
            //     },{
            //         "methodName":"getTest",
            //         "parameter":"String,Int",
            //         "returnType":"List<hashMap>",
            //     },{
            //         "methodName":"getTarget",
            //         "parameter":"String,String",
            //         "returnType":"Boolean",
            //     },{
            //         "methodName":"getString",
            //         "parameter":"String,String,int",
            //         "returnType":"String",
            //     }]);
            //
            // }else if(rowindex== 4){
            //     Ext.getCmp('operation-grid').store.setData([{
            //         "methodName":"beforeChange",
            //         "parameter":"Menu",
            //         "returnType":"int",
            //     },{
            //         "methodName":"loadStore",
            //         "parameter":"String,Int",
            //         "returnType":"List<hashMap>",
            //     },{
            //         "methodName":"getString",
            //         "parameter":"String,String,int",
            //         "returnType":"String",
            //     }]);
            //
            // }else if(rowindex== 5){
            //     Ext.getCmp('operation-grid').store.setData([{
            //         "methodName":"setTest",
            //         "parameter":"methodDTO",
            //         "returnType":"void",
            //     },{
            //         "methodName":"getTest",
            //         "parameter":"String,Int",
            //         "returnType":"List<hashMap>",
            //     },{
            //         "methodName":"getTarget",
            //         "parameter":"String,String",
            //         "returnType":"Boolean",
            //     },{
            //         "methodName":"getString",
            //         "parameter":"String,String,int",
            //         "returnType":"String",
            //     }]);
            //
            // }else if(rowindex== 6){
            //     Ext.getCmp('operation-grid').store.setData([{
            //         "methodName":"beforeChange",
            //         "parameter":"Menu",
            //         "returnType":"int",
            //     },{
            //         "methodName":"loadStore",
            //         "parameter":"String,Int",
            //         "returnType":"List<hashMap>",
            //     },{
            //         "methodName":"getString",
            //         "parameter":"String,String,int",
            //         "returnType":"String",
            //     }]);
            //
            // }else{
            //
            //     Ext.getCmp('operation-grid').store.removeAll();
            // };

        },

    },
})

