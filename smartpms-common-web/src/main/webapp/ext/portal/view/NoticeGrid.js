Ext.define('Ext.portal.view.NoticeGrid', {
    extend: 'Ext.Panel',
    xtype: 'noticegrid',
    title: '공지사항',
    layout: {
        type: 'fit'
    },
    themes: {
        classic: {
            percentChangeColumn: {
                width: 75
            }
        },
        neptune: {
            percentChangeColumn: {
                width: 100
            }
        }
    },
    initComponent: function() {
        var me = this;
	    
	    this.myDataStore2 = Ext.create('Ext.data.JsonStore', {
            fields: ['no','title', 'type', 'createDate'],
            data: [
                { no: 1, title:'공지사항 테스트', type:'긴급', createDate: '2016-01-31 00:00:00'},
                { no: 2, title:'공지사항 테스트', type:'일반', createDate: '2016-01-31 00:00:00'},
                { no: 3, title:'공지사항 테스트', type:'작업', createDate: '2016-01-31 00:00:00'},
                { no: 4, title:'공지사항 테스트', type:'상시', createDate: '2016-01-31 00:00:00'}
            ]
        });

        me.items = [{
            xtype: 'gridpanel',
            autoScroll: true,
            columns : {
                defaults: {
                    sortable: false,
                    menuDisabled: true
                },
                items: [
                    { text: '번호', dataIndex: 'no' },
                    { text: '제목', dataIndex: 'title' },
                    { text: 'type', dataIndex: 'type' },
                    { text: '생성일시', dataIndex: 'createDate' }
                ]
            },
            store: this.myDataStore2,
            width: '100%'
        }];

        this.callParent();
    }
});
