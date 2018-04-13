
Ext.define('Ui.analysis.sourceResult.view.AnalysisSourceResultTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.analysissourceresulttree',
    id: 'result-tree',
    minHeight: 300,
    maxHeight: 300,
    margin: '0 0 0 2',
    bodyPadding: 10,
    border: false,
    rootVisible: false,
    scroll: 'vertical',
    store: 'AnalysisSourceResultTree',
    columns: [{
        xtype: 'treecolumn',
        text: '클래스',
        width: 700,
        locked: false,
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

    },
})

