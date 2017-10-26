Ext.define('Ext.quality.store.Org', {
    extend: 'Ext.data.Store',
    model: 'Ext.quality.model.Org',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/org/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'orgs'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0, orgDiv : 'TEAM', orgRefValue : 'DEV'}
    },
    autoLoad : true
});