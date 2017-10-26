Ext.define('Ext.portal.model.QuestionChart', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'que', type: 'int' },
        { name: 'wfm1', type: 'int' },
        { name: 'wfm2', type: 'int' },
        { name: 'itsm1', type: 'int' },
        { name: 'itsm2', type: 'int' },
        { name: 'itsm3', type: 'int' },
        { name: 'helf1', type: 'int' },
        { name: 'helf2', type: 'int' },
        { name: 'helf3', type: 'int' },
        { name: 'helf4', type: 'int' },
        { name: 'helf5', type: 'int' },
        { name: 'helf6', type: 'int' },
        'day',
        'ownDay'
    ]
});