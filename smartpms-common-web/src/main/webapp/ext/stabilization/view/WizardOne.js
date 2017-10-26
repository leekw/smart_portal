Ext.define('Ext.stabilization.view.WizardOne', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.formswizardone',
    requires: [
    ],

    cls: 'wizardone shadow-panel',
    height : 60,
    plugins: 'responsive',

    responsiveConfig: {
    },

    items: [
        {
            xtype: 'box',
            flex: 1,
            html: '<div class="eq-box-md text-center bg-primary pad-all"><div class="box-vmiddle pad-all"><h2 class="text-thin">PA1-2 K-CRM(B2B)</h2></div></div>'
        }
    ]
});
