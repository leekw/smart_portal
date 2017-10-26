Ext.define('Ui.based.board.model.File', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'fileNo', type: 'int' },
        'filePath',
        'fileName',
        'fileSize',
        'dataMode'
    ]
});