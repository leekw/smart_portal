
Ext.define('Ui.analysis.sourceResult.view.AnalysisSourceResultGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.analysissourceresultgrid',
    id: 'result-grid',
    minHeight: 610,
    maxHeight: 610,
    margin: '0 0 0 2',
    bodyPadding: 10,
    border: false,
    rootVisible: false,
    scroll: 'vertical',
    store: 'AnalysisSourceResult',
    columns: [{

        header: '서비스',
        align: 'center',
        width: 200,
        dataIndex: 'service'

    },{

        header: '모듈',
        align: 'center',
        width: 200,
        dataIndex: 'module'

    },{

        header: '클래스',
        align: 'center',
        width: 200,
         dataIndex: 'assetSourceFullPath'

    }, {
        header: 'Full Path',
        align: 'center',
        width: 300,
        dataIndex: 'assetName',

    }, {
        header: 'PMD',
        align: 'center',
        width: 100,
        dataIndex: 'pmd',

    }, {
        header: 'FORTIFY',
        align: 'center',
        width: 100,
        dataIndex: 'fortify',

    }, {
        header: 'ETC',
        align: 'center',
        width: 100,
        dataIndex: 'etc',

    }]
    , tbar: [
        {
            xtype: 'textfield',
            width: '35%',
            id: 'className',
            fieldLabel: '클래스명'


        }, {
            xtype: 'textfield',
            width: '35%',
            id: 'methodName',
            fieldLabel: '메소드명'


        },
        {
            text: '검색',
            width: '15%',
            ui: 'soft-blue',
            handler: function () {
                var grid = Ext.getCmp('result-grid');
                var store = grid.getStore();
                var proxy = store.getProxy();
                var className = Ext.getCmp('className').getValue();


                proxy.extraParams.assetSourceFullPath = className;
                 store.load();
            }
        }]
    ,
    listeners: {
        cellclick :function(grid,td,cellIndex,record,tr,rowIndex,e,eOpts){
            console.log("cellclick");
            record.data.analysisAssetId;
            classInfo.assetName = record.data.assetName;
            ClassRelation.openClassRelation();

        }


    },
})



var ClassRelation = {
    callTarget :'',
    openClassRelation : function() {
        var win = Ext.getCmp('class-relation-info');
        if (win == null) {
            win = Ext.create('Ext.window.Window', {
                id : 'class-relation-info',
                title: '클래스 관계',
                autoScroll: true,
                maximizable : true,
                width: 800,
                height:600,
                layout: 'fit',
                animateTarget:this,
                items : [{
                    xtype : 'container',
                    layout: 'responsivecolumn',
                    border: false,
                    items :[
                        {
                            title:'상위 참조 클래스',
                            xtype:'panel',
                            border: false,
                            responsiveCls: 'big-50 small-100',
                            items :[
                                { xtype :'analysissourceresulthighranktree'}
                            ]
                        },
                        {

                            title:'하위 참조 클래스',
                            xtype:'panel',
                            border: false,
                            responsiveCls: 'big-50 small-100',
                            style : {
                                'background-color' : '#fff',
                                'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
                            },
                            items : [
                                { xtype :'analysissourceresulttree'}
                            ]
                    }]
                }]
            });
        }
        var tree = Ext.getCmp('result-tree');
        var store= tree.getStore();
        var proxy = store.getProxy();
        proxy.extraParams.assetName = classInfo.assetName;
        store.load();

        var tree2 = Ext.getCmp('high-rank-tree');
        var store2= tree2.getStore();
        var proxy2 = store2.getProxy();
        proxy2.extraParams.assetName = classInfo.assetName;
        store2.load();

        win.show();
    },

}

var classInfo= {
    assetName : ''
}