Ext.define('Ext.sample.view.SampleGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.samplegrid',    
    title : 'Integration View Sample Grid',    
    minHeight: 300,
    initComponent: function() {
    	
    	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            pluginId: 'rowEditing'
        });
    	
        this.store = 'Sample';
        
        this.plugins = [rowEditing];
       
        this.columns = [{
            header: '지역코드',
            dataIndex: 'areaCode',
            width: 120,
            editor: {
                allowBlank: false
            }
        }, { 
            header: '서비스코드',
            dataIndex: 'serviceCode',
            width: 120,
            editor: {
                allowBlank: false
            }
        }, {
            xtype: 'checkcolumn',
            header: '시설물여부',
            id :'facilities',
            dataIndex: 'facilities',
            width: 100,
            editor: {
                xtype: 'checkbox',
                cls: 'x-grid-checkheader-editor'
            }
        }, {
        	id :'use',
            xtype: 'checkcolumn',
            header: '사용여부',
            dataIndex: 'use',
            width: 80,
            editor: {
                xtype: 'checkbox',
                cls: 'x-grid-checkheader-editor'
            }
        }, {
            header: '비고',
            dataIndex: 'remark',
            flex: 1,
            editor: {
                allowBlank: false
            }
        }];
        
        this.tbar = [{
            text: 'Add',
            action: 'add-grid-record'
        }, {
            itemId: 'removeSample',
            text: 'Remove',
            action: 'remove-grid-record',
            disabled: true
        },{
            text: 'Save',
            action:'save-grid-record'
        },{
            text: 'Reload',
            action:'reload-grid-record'
        }];
        
        this.callParent(arguments);
    }
});    
