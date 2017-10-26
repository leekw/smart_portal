Ext.define('Ext.nlayout.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Ext.nlayout',
    
    appFolder: G_PATH + '/ext/nlayout',

    stores: [
        'NavigationTree'
    ],
    models : [
        'NavigationTree'
    ],


    //controllers: [
        // TODO - Add Global View Controllers here
    //],

    onAppUpdate: function () {
    }
});
