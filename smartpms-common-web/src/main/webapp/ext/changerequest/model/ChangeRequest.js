Ext.define('Ext.changerequest.model.ChangeRequest', {
    extend: 'Ext.data.Model',
    fields: [
       'repository',
       'fullpath',
       'filename',
       'commitAuthor',
       'commitDate',
       'jiraId',
       'lastUpdateAuthor',
       'lastUpdateDate',
       'checkinYn'
    ]
});