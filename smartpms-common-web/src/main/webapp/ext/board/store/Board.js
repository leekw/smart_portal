Ext.define('Ext.board.store.Board', {
    extend: 'Ext.data.Store',
    model: 'Ext.board.model.Board',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: G_PATH + '/board/list/get.json',
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'boards'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        extraParams : { maxRowSize : 0, boardNo : G_BOARD_NO == null ? 0 : G_BOARD_NO }
    },
    autoLoad : true
});