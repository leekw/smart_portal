Ext.define('Ext.loginpolicy.controller.LoginPolicy', {
    extend: 'Ext.app.Controller',
    stores: ['LoginPolicy', 'LoginPolicyDetail'],
    models: ['LoginPolicy', 'LoginPolicyDetail'],

    views: ['PolicyGrid','PolicyTabPanel', 'PolicyFactorComboBox'],

    refs: [{
        ref: 'policyGrid',
        selector: 'policygrid'
    },{
    	ref: 'policyTabPanel',
    	selector : 'policytabpanel'
    },{
    	ref: 'policyFactorComboBox',
    	selector : 'policyfactorcombobox'
    },{
    	ref : 'policyDetailGrid',
    	selector : 'policydetailgrid'
    }],
    
    init: function() {

        this.control({
        	'policygrid' : {
        		selectionchange: this.gridSelectionChange,
        	},
            'policyfactorcombobox' : {
            	change : this.policyFactorComboChange
            },
            'policydetailgrid' : {
            	beforeedit : this.beforePolicyDetailGridEdit
            },
            'button[action=add-login-policy]' : {
            	click : this.addLoginPolicy
            },
            'button[action=remove-login-policy]' : {
            	click : this.removeLoginPolicy
            }
        });
        
    },
    addLoginPolicy : function() {
    	
    	var rowEditing = this.getPolicyGrid().getPlugin('rowEditing');
    	var store = this.getPolicyGrid().getStore();
    	rowEditing.cancelEdit();

        var r = Ext.create('Ext.loginpolicy.model.LoginPolicy', {
        	loginPolicyId: '',
        	loginPolicyName: '',
        	loginPolicyEffectiveDate: Ext.Date.add (new Date(),Ext.Date.DAY,1),
        	loginpolicyExpirationDate: Ext.Date.add (new Date(),Ext.Date.MONTH,1),
            dataMode : 'I'
        });

        store.insert(0, r);
        rowEditing.startEdit(0, 0);
    	
    },
    removeLoginPolicy : function() {
    	var grid = this.getPolicyGrid();
    	var store = grid.getStore();
    	var sm = grid.getSelectionModel();
    	grid.getPlugin('rowEditing').cancelEdit();
        store.remove(sm.getSelection());
        if (store.getCount() > 0) {
            sm.select(0);
        }
    },
    gridSelectionChange : function(model, records) {
    	var grid = this.getPolicyGrid();
    	grid.down('#removeLoginPolicy').setDisabled(!records.length);
    },
    beforePolicyDetailGridEdit : function() {
    	var grid = this.getPolicyDetailGrid();
    	if (context.record.get('dataMode') == 'R') {
			grid.getPlugin('rowEditing').editor.form.findField('loginPolicyId').disable();
			grid.getPlugin('rowEditing').editor.form.findField('loginPolicyFactorId').disable();
			grid.getPlugin('rowEditing').editor.form.findField('loginPolicyFactorName').disable();
			grid.getPlugin('rowEditing').editor.form.findField('loginPolicyFactorTypeName').disable();
		} else {
			grid.getPlugin('rowEditing').editor.form.findField('loginPolicyId').enable();
			grid.getPlugin('rowEditing').editor.form.findField('loginPolicyFactorId').enable();
			grid.getPlugin('rowEditing').editor.form.findField('loginPolicyFactorName').enable();
			grid.getPlugin('rowEditing').editor.form.findField('loginPolicyFactorTypeName').enable();
		}
    },
    getTimeView : function() {
    	var items = [];
    	var startdt = Ext.create('Ext.form.DateField',{
    	    fieldLabel: 'Start',
    	    labelWidth : 120,
    	    name: 'startValue',
    	    id: 'startValue',
    	    vtype: 'daterange',
    	    format: 'H:m',
    	    endDateField: 'endValue'
    	    });
    	var enddt = Ext.create('Ext.form.DateField',{
    	    fieldLabel: ' End',
    	    labelWidth : 120,
    	    name: 'endValue',
    	    id: 'endValue',
    	    format: 'H:m',
    	    vtype: 'daterange',
    	    startDateField: 'startValue'
    	    });
    	items.push(startdt);
    	items.push(enddt);
    	return items;
    },
    getIpView : function() {
    	var items = [];
    	var ip = Ext.create('Ext.form.TextField',{
    	    fieldLabel: 'IP Address',
    	    labelWidth : 120,
    	    name: 'ipaddress',
    	    id: 'ipaddress',
    	    vtype: 'IPAddress'
    	 });
    	items.push(ip);
    	return items;
    },
    getEtcView : function() {
    	var items = [];
    	var etc = Ext.create('Ext.form.TextField',{
    	    fieldLabel: 'IP Address',
    	    labelWidth : 120,
    	    name: 'factorValue',
    	    id: 'factorValue'
    	 });
    	items.push(etc);
    	return items;
    },
    getNumRangeView : function() {
    	var items = [];
    	var start = Ext.create('Ext.form.TextField',{
    	    fieldLabel: 'Start',
    	    labelWidth : 120,
    	    name: 'startValue',
    	    id: 'startValue',
    	    maxLength: 3,
    	    maskRe: /[0-9.]/
    	 });
    	var end = Ext.create('Ext.form.TextField',{
    	    fieldLabel: ' End',
    	    labelWidth : 120,
    	    name: 'endValue',
    	    id: 'endValue',
    	    maxLength: 3,
    	    maskRe: /[0-9.]/
    	 });
    	items.push(start);
    	items.push(end);
    	return items;
    },
    getFactorValueView : function(type) {
    	if (type == 'TIME') {
    		return this.getTimeView();
    	} else if (type == 'IP') {
    		return this.getIpView();
    	} else if (type == 'NUM_RANGE') {
    		return this.getNumRangeView();
    	} else {
    		return this.getEtcView();
    	}
    }, 
    policyFactorComboChange : function(obj, newValue, oldValue, eOpts) {
    	var v = obj.getValue();
        var r = obj.findRecord(obj.valueField || obj.displayField, v);
    	var curTab = this.getPolicyTabPanel().getActiveTab();
    	curTab.query('textfield[name="loginPolicyId"]')[0].setValue(r.data.loginPolicyId);
    	curTab.query('textfield[name="loginPolicyFactorType"]')[0].setValue(r.data.loginPolicyFactorTypeCode);
    	var f = curTab.query('fieldset[id="newLoginPolicyFactor"]')[0];
    	var c = f.query('container[id="factorValue"]')[0];
    	
    	if (c != null) {
    		c.removeAll(true);
    	}
    	
    	f.add({
    		xtype:"container",
    		id: 'factorValue',
    		items : this.getFactorValueView(r.data.viewTypeCode)
    	});
    }
});