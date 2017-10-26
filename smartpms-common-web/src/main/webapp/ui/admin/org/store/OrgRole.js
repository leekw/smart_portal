Ext.define('Ui.admin.org.store.OrgRole', {
    extend: 'Ext.data.Store',
    model: 'Ui.admin.org.model.OrgRole',
    autoDestroy: true,
    pageSize : 200,
    remoteSort : true,
    proxy: {
        type: 'ajax',
        enablePaging : true,
        url: G_PATH + '/based/res/org/role/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'roles'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : {
        	maxRowSize : 0
        }
    },
    autoLoad : true
});