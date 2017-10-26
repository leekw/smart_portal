Ext.define('Ui.main.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Ui.main',
    
    appFolder: G_PATH + '/ui/main',

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
