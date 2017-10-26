Ext.define('Ext.programcr.store.ProgramListJira', {
    extend: 'Ext.data.Store',
    model: 'Ext.programcr.model.ProgramListJira',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/changerequest/programlist/jira/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'programs'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0}
    },
    autoLoad : false
});