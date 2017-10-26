Ext.define('Ext.portal.view.DefectGrid', {
    extend: 'Ext.Panel',
    xtype: 'defectgrid',
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
            fields: ['no','jiraNo','summary', 'description', 'component', 'status', 'due', 'processData'],
            data: [
                { no: 1, jiraNo:'NBSSD-111111', summary:'결함 테스트', description:'결함 테스트', component:'B2C CRM', status:'In Progress', due:'2016-01-31',processData:'처리 완료함.'},
                { no: 2, jiraNo:'NBSSD-211111', summary:'결함 테스트', description:'결함 테스트', component:'B2C CRM', status:'In Progress', due:'2016-01-31',processData:'처리 완료함.'},
                { no: 3, jiraNo:'NBSSD-311111', summary:'결함 테스트', description:'결함 테스트', component:'B2C CRM', status:'In Progress', due:'2016-01-31',processData:'처리 완료함.'},
                { no: 4, jiraNo:'NBSSD-411111', summary:'결함 테스트', description:'결함 테스트', component:'B2C CRM', status:'In Progress', due:'2016-01-31',processData:'처리 완료함.'},
                { no: 5, jiraNo:'NBSSD-511111', summary:'결함 테스트', description:'결함 테스트', component:'B2C CRM', status:'In Progress', due:'2016-01-31',processData:'처리 완료함.'},
                { no: 6, jiraNo:'NBSSD-611111', summary:'결함 테스트', description:'결함 테스트', component:'B2C CRM', status:'In Progress', due:'2016-01-31',processData:'처리 완료함.'},
                { no: 7, jiraNo:'NBSSD-711111', summary:'결함 테스트', description:'결함 테스트', component:'B2C CRM', status:'In Progress', due:'2016-01-31',processData:'처리 완료함.'},
                { no: 8, jiraNo:'NBSSD-811111', summary:'결함 테스트', description:'결함 테스트', component:'B2C CRM', status:'In Progress', due:'2016-01-31',processData:'처리 완료함.'}
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
                    { text: 'Jira ID', dataIndex: 'jiraNo' },
                    { text: 'Summary', dataIndex: 'summary' },
                    { text: '설명', dataIndex: 'description' },
                    { text: '모듈', dataIndex: 'component' },
                    { text: 'Jira 상태', dataIndex: 'status' },
                    { text: 'Due', dataIndex: 'due' },
                    { text: '처리내용', dataIndex: 'processData' }
                ]
            },
            store: this.myDataStore2,
            width: '100%'
        }];

        this.callParent();
    }
});
