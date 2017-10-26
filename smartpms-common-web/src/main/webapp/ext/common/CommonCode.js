Ext.define('CommonCode', {
    extend: 'Ext.data.Model',
    fields: [
        'commonCode',
        'commonCodeName'
    ]
});

var CommonCode = {
	    _getCodeStore : function(_type, ref1, ref2) {
	    	return Ext.create('Ext.data.Store', {
				fields : ['commonCode','commonCodeName'],
				model : 'CommonCode',
				autoDestroy: true,
			    proxy: {
			        type: 'ajax',
			        url: G_PATH + '/code/list/get.json',
			        headers: {
			            'Content-Type': 'application/json'
			        },
			        reader: {
			            type: 'json',
			            rootProperty: 'codes'
			        },
			        actionMethods: {
			            create : 'POST',
			            read   : 'POST',
			            update : 'POST',
			            destroy: 'POST'
			        },
			        extraParams : { maxRowSize : 0, commonCodeType : _type, refValue1 : ref1, refValue2 : ref2 }
			    },
			    autoLoad : true
			});
	    },
		_getCombo : function(_type, _label, ismult, id, option, changfunction, ref1, ref2) {
			return Ext.create('Ext.form.ComboBox', {
				id : id,
				store : CommonCode._getCodeStore(_type, ref1, ref2),
				fieldLabel: _label,
				multiSelect : (ismult == null?false : ismult),
				labelWidth : option.labelWidth,
				labelAlign : option.labelAlign ,
				width: option.width,
				allowBlank : (option.allowBlank != null ? option.allowBlank : true),
				editable : false,
				displayField : 'commonCodeName',
				valueField: 'commonCode',
				listeners : {
					change : function(combo, newValue, oldValue, eOpts) {
						if (changfunction != null)
							changfunction(newValue);
					}
				}
			});
		}
	};