Ext.define('Ui.based.notice.model.Notice', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'noticeId', type: 'int' },
        'noticeTitle',
        'noticeTeam',
        'noticeLevel',
        'noticeCreateDate',
        'noticePublishType',
        'noticePublishTypeName',
        'noticePublishDate',
        { name: 'noticeRetryCount', type: 'int' },
        { name: 'noticeRetryCycle', type: 'int' },
        'noticePublishDescription',
        'mailGroupId',
        'mailGroupName',
        'dataMode'
    ]
});