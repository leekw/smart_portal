Ext.define('Ui.android.analysis.view.AnalysisGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.analysisgrid',
    title: '정적 분석을 통해 중요 데이터 유출 등 악성행위 확인',
    background: 'none',
    layout: 'fit',
    minHeight : 600,
    maxHeight : 700,
    columnLines : true,
    initComponent: function() {

        this.store = 'Analysis';

        this.selModel = {};

        this.columns = [
            new Ext.grid.RowNumberer({
                header: 'No',
                width: 60,
                align: 'center'
            }),
            {
                header: '주요 악성행위',
                dataIndex: 'analysisFileNo',
                width:'50%'
            }, {
                header: '결과',
                dataIndex: 'result',
                width:'50%'
            }
        ];
        this.callParent(arguments);




    }, listeners : {
        afterrender : function(panel) {
            this.store.setData([{
                "analysisFileNo":"SMS 정보 유출",
                "result":"가능",
            },{
                "analysisFileNo":"연락처 정보 유출",
                "result":"불가능",
            },{
                "analysisFileNo":"외장 데이터 정보 유출",
                "result":"불가능",
            },{
                "analysisFileNo":"핸드폰 기기 정보 유출",
                "result":"가능",
            },{
                "analysisFileNo":"핸드폰 번호 유출",
                "result":"가능",
            }]);
        },
        beforerender : function(panel) {

        }
    }
})

