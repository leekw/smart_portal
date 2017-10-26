Ext.define('Ext.session.model.SessionUser', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'rowId', type: 'int' },
        'sessionId',
        'userId',
        'userName',
        'ip',
        'loginDate',
        'lastActionUrl',
        'lastActionDateByStr'
    ]
});