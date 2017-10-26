Ext.define('Ui.admin.user.model.Role', {
    extend: 'Ext.data.Model',
    fields: [
        'roleId',
        'parentRoleId',
        'roleName',
        'roleDescription',
        'mode'
    ]
});