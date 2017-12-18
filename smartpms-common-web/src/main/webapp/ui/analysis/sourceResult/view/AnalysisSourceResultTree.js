
Ext.define('Ui.analysis.sourceResult.view.AnalysisSourceResultTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.analysissourceresulttree',
    id: 'sub-menu',
    minHeight: 610,
    maxHeight: 610,
    margin: '0 0 0 2',
    bodyPadding: 10,
    border: false,
    rootVisible: false,
    scroll: 'vertical',
    store: 'AnalysisSourceResult',
    columns: [{
        xtype: 'treecolumn',
        text: '클래스',
        width: 200,
        locked: true,
        dataIndex: 'text',
        editor: {
            allowBlank: false
        }
    }, {
        text: '연관클래스',
        width: 100,
        align: 'center',
        dataIndex: 'refClass',

    }, {
        text: 'C/I',
        align: 'center',
        width: 80,
        dataIndex: 'classInterface',

    }, {
        text: '진단완료모듈',
        align: 'center',
        width: 120,
        dataIndex: 'analysisModul',

    }]
    , tbar: [
        {
            xtype: 'textfield',
            width: '75%',
            id: 'ClassName',
            fieldLabel: '클래스명'


        },
        {
            text: '검색',
            width: '15%',
            ui: 'soft-blue',
            handler: function () {
            }
        }]
    ,
    listeners: {
        beforecellclick: function (tree, td, cellIndex, record, tr, rowIndex, e, eOpts) {


        },
        cellclick: function (talbe, td, cellIndex, record, tr, rowindex, e, eOpts) {
            console.log("td:" + td.innerText);
            console.log("td:" + record.data.depth);

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
            if (rowindex== 1) {
                	Ext.getCmp('method-grid').store.setData([{
                            "methodName":"setTest",
                            "parameter":"methodDTO",
                            "returnType":"void",
                        },{
                            "methodName":"getTest",
                            "parameter":"String,Int",
                            "returnType":"List<hashMap>",
                        },{
                            "methodName":"getTarget",
                            "parameter":"String,String",
                            "returnType":"Boolean",
                        },{
                        "methodName":"getString",
                        "parameter":"String,String,int",
                        "returnType":"String",
                    }]);

			}else if(rowindex== 2){
                Ext.getCmp('method-grid').store.setData([{
                    "methodName":"beforeChange",
                    "parameter":"Menu",
                    "returnType":"int",
                },{
                    "methodName":"loadStore",
                    "parameter":"String,Int",
                    "returnType":"List<hashMap>",
                },{
                    "methodName":"getString",
                    "parameter":"String,String,int",
                    "returnType":"String",
                }]);

			}else if(rowindex== 3){
                Ext.getCmp('method-grid').store.setData([{
                    "methodName":"setTest",
                    "parameter":"methodDTO",
                    "returnType":"void",
                },{
                    "methodName":"getTest",
                    "parameter":"String,Int",
                    "returnType":"List<hashMap>",
                },{
                    "methodName":"getTarget",
                    "parameter":"String,String",
                    "returnType":"Boolean",
                },{
                    "methodName":"getString",
                    "parameter":"String,String,int",
                    "returnType":"String",
                }]);

            }else if(rowindex== 4){
                Ext.getCmp('method-grid').store.setData([{
                    "methodName":"beforeChange",
                    "parameter":"Menu",
                    "returnType":"int",
                },{
                    "methodName":"loadStore",
                    "parameter":"String,Int",
                    "returnType":"List<hashMap>",
                },{
                    "methodName":"getString",
                    "parameter":"String,String,int",
                    "returnType":"String",
                }]);

            }else if(rowindex== 5){
                Ext.getCmp('method-grid').store.setData([{
                    "methodName":"setTest",
                    "parameter":"methodDTO",
                    "returnType":"void",
                },{
                    "methodName":"getTest",
                    "parameter":"String,Int",
                    "returnType":"List<hashMap>",
                },{
                    "methodName":"getTarget",
                    "parameter":"String,String",
                    "returnType":"Boolean",
                },{
                    "methodName":"getString",
                    "parameter":"String,String,int",
                    "returnType":"String",
                }]);

            }else if(rowindex== 6){
                Ext.getCmp('method-grid').store.setData([{
                    "methodName":"beforeChange",
                    "parameter":"Menu",
                    "returnType":"int",
                },{
                    "methodName":"loadStore",
                    "parameter":"String,Int",
                    "returnType":"List<hashMap>",
                },{
                    "methodName":"getString",
                    "parameter":"String,String,int",
                    "returnType":"String",
                }]);

            }else{

                Ext.getCmp('method-grid').store.removeAll();
			};

        },

    },
})

