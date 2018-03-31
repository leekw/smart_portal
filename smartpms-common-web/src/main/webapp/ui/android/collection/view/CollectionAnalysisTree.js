
Ext.define('Ui.android.collection.view.CollectionAnalysisTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.collectionanalysistree',
    id: 'collection-analysis-tree',
    minHeight: 610,
    maxHeight: 610,
    margin: '0 0 0 2',
    bodyPadding: 10,
    border: false,
    rootVisible: false,
     store: 'CollectionAnalysisTree',
    columns: [
        {
            xtype: 'treecolumn',
            text: '보안진단 검출내역',
            width: 500,
            locked: true,
            dataIndex: 'analysisContents',
            editor: {
                allowBlank: false
            }
        },
        {
            text: 'Exported',
            width: 150,
            dataIndex: 'analysisExported',

        }
    ]
  ,
    listeners: {


        expand : function(p,eOpts){

        },

        beforecellclick: function (tree, td, cellIndex, record, tr, rowIndex, e, eOpts) {


        },

        beforeselect: function (model, record, index, eOpts) {

        },


        cellclick: function (talbe, td, cellIndex, record, tr, rowindex, e, eOpts) {
            var tree = Ext.getCmp('collection-analysis-tree');
            var store= tree.getStore();
            var proxy = store.getProxy();
             proxy.extraParams.analysisParentId = record.raw.analysisId;
             console.log(record);

        },

        beforeexpand : function (p,animate,eOpts) {
         }

    },
})

