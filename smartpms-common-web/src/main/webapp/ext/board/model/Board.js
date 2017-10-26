Ext.define('Ext.board.model.Board', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'boardId', type: 'int' },
        { name: 'boardNo', type: 'int' },
        'boardTitle',
        'boardTeam',
        'boardCreateDate',
        'boardDescription',
        'dataMode',
        'ip',
        'boardCreator'
    ]
});