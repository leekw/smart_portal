Ext.define('Ui.admin.role.model.Role', {
    extend: 'Ext.data.Model',
    fields: [
        'roleId',
        'parentRoleId',
        'roleName',
        'roleDescription',
        'mode'
    ]
});