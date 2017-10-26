Ext.define('Org', {
    extend: 'Ext.data.Model',
    fields: [
        'orgId',
        'orgName'
    ]
});
var Org = {
	    _getOrgStore : function(_type, ref1) {
	    	return Ext.create('Ext.data.Store', {
				fields : ['orgId','orgName'],
				model : 'Org',
				autoDestroy: true,
			    proxy: {
			        type: 'ajax',
			        url: G_PATH + '/org/list/get.json',
			        headers: {
			            'Content-Type': 'application/json'
			        },
			        reader: {
			            type: 'json',
			            rootProperty: 'orgs'
			        },
			        actionMethods: {
			            create : 'POST',
			            read   : 'POST',
			            update : 'POST',
			            destroy: 'POST'
			        },
			        extraParams : { maxRowSize : 0, orgDiv : _type, parentOrgId : ref1 }
			    },
			    autoLoad : true
			});
	    },
		_getOrgCombo : function(_type, _label, ismult, id, option, changfunction, ref1) {
			return Ext.create('Ext.form.ComboBox', {
				id : id,
				store : Org._getOrgStore(_type, ref1),
				fieldLabel: _label,
				multiSelect : (ismult == null?false : ismult),
				labelWidth : option.labelWidth,
				labelAlign : option.labelAlign ,
				width: option.width,
				allowBlank : (option.allowBlank != null ? option.allowBlank : true),
				editable : false,
				displayField : 'orgName',
				valueField: 'orgId',
				listeners : {
					change : function(combo, newValue, oldValue, eOpts) {
						if (changfunction != null)
							changfunction(newValue);
					}
				}
			});
		}
	};