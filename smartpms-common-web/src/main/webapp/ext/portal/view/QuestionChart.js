Ext.define('Ext.portal.view.QuestionChart', {
    extend: 'Ext.Panel',
    xtype: 'questionchart',
    maxHeight: 780,
    layout: {
        type: 'fit'
    },
    themes: {
        classic: {
            percentChangeColumn: {
                width: 75
            }
        },
        neptune: {
            percentChangeColumn: {
                width: 100
            }
        }
    },
    initComponent: function() {
        var me = this;


        me.items = [
        
        ];

        this.callParent();
    }
});
