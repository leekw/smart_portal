Ext.define('Ext.admin.model.Role', {
    extend: 'Ext.data.Model',
    fields: [
        'roleId',
        'parentRoleId',
        'roleName',
        'roleDescription',
        'mode'
    ]
});