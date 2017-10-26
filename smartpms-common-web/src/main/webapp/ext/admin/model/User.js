Ext.define('Ext.admin.model.User', {
    extend: 'Ext.data.Model',
    fields: [
        'userId',
        'userName',
        'emailAddress',
        'team',
        'active',
        'roles'
    ]
});