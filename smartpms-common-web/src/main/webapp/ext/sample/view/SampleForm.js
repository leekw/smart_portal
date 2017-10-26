Ext.define('Ext.sample.view.SampleForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.sampleform',
    margin: '0 0 0 10',
    bodyPadding: 10,
    minHeight: 300,
    title:'Integration View Sample Form',
    defaults: {
        width: 300,
        labelWidth: 90
    },
    defaultType: 'textfield',
    items: [
        {
            fieldLabel: '지역코드',
            name: 'areaCode'
        },
        {
            fieldLabel: '서비스코드',
            name: 'serviceCode'
        },
        {
            xtype: 'checkbox',
            fieldLabel: '시설물여부',
            name: 'facilities'
        },
        {
            xtype: 'checkbox',
            fieldLabel: '사용여부',
            name: 'use'
        },
        {
            fieldLabel: '비고',
            name: 'remark'
        },
        {
        	xtype : 'hidden',
            name: 'facilitiesYn'
        },
        {
        	xtype : 'hidden',
            name: 'useYn'
        },
        {
        	xtype : 'hidden',
            name: 'dataMode'
        }
        
    ],
    buttons: [{
        text:'Save',
        action: 'save-form-data'
    },{
        text: 'Reset',
        action: 'reset-form-data'
    }]
});  