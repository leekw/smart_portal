Ext.define('Ext.notice.store.Mail', {
    extend: 'Ext.data.Store',
    model: 'Ext.notice.model.Mail',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/mail/group/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'groups'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0 }
    },
    autoLoad : true
});