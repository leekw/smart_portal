
Ext.define('Ui.analysis.sourceResult.view.AnalysisSourceResultHighRankTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.analysissourceresulthighranktree',
    id: 'high-rank-tree',
    minHeight: 300,
    maxHeight: 300,
    margin: '0 0 0 2',
    bodyPadding: 10,
    border: false,
    rootVisible: false,
     store: 'AnalysisSourceResultHighRankTree',
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

            var url = G_PATH + '/analysis/source/code/view.do?analysisAssetId=' + encodeURIComponent(770);
            var option = "left=100,top=100,width='100%',height='100%',fullscreen=yes,location=no,titlebar=no,scrollbars=yes";
           // var popup = window.open(url, 'CutOver_Task_' + record.data.analysisAssetId, option);
           //popup.focus();



        },

        beforeexpand : function (p,animate,eOpts) {
            console.log("beforeexpand");
        }

    },
})

