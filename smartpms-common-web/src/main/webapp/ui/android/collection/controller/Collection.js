Ext.define('Ui.android.collection.controller.Collection', {
    extend: 'Ext.app.Controller',
    stores: ['Collection','CollectionAnalysisTree'],
    models: ['CollectionAnalysisTree'],

    views: ['CollectionPanel','CollectionGrid'],

    refs: [{
        ref     : 'collectionpanel',
        selector: 'collectionpanel'
    }],
    
    init: function() {

        this.control({
            'collectionpanel': {
            }
        });
        
    }
});