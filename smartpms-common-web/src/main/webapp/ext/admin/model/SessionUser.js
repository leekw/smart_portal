Ext.define('Ext.admin.model.SessionUser', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'rowId', type: 'int' },
        'sessionId',
        'userId',
        'userName',
        'ip',
        'loginDate'
    ]
});