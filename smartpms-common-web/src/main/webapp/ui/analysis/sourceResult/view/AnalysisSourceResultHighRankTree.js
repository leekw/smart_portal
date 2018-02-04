
Ext.define('Ui.analysis.sourceResult.view.AnalysisSourceResultHighRankTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.analysissourceresulthighranktree',
    id: 'high-rank-tree',
    minHeight: 610,
    maxHeight: 610,
    margin: '0 0 0 2',
    bodyPadding: 10,
    border: false,
    rootVisible: false,
     store: 'AnalysisSourceResultHighRankTree',
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



        },

        beforeexpand : function (p,animate,eOpts) {
            console.log("beforeexpand");
        }

    },
})

