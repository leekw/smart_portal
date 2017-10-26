Ext.define('Ext.admin.view.RoleForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.roleform',
    bodyPadding: 10,
    minHeight: 300,
    autoScroll:true,
    defaults: {
        labelWidth: 120
    },
    defaultType: 'textfield',
    items: [
        {
            fieldLabel: 'Role 아이디',
            name: 'roleId',
            anchor: '70%'
        },
        {
            fieldLabel: '상위 Role 아이디',
            name: 'parentRoleId',
            anchor: '70%'
        },
        {
            fieldLabel: 'Role 이름',
            name: 'roleName',
            anchor: '70%'
        },
        {
            fieldLabel: 'Role 설명',
            name: 'roleDescription',
            anchor: '100%'
        }
        
    ],
    buttons: [{
        text:'저장',
        action: 'save-form-data',
        hidden : G_IS_HADNS == "Y" ? false : true
    },{
        text: '취소',
        action: 'reset-form-data',
        hidden : G_IS_HADNS == "Y" ? false : true,
    }]
});  