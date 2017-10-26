Ext.Loader.loadScript({url:G_PATH + '/ext/sample/controller/SampleCore.js'});
Ext.define('Ext.sample.controller.Sample', {
    extend: 'Ext.app.Controller',
    stores: ['Sample', 'SampleTree'],
    models: ['Sample', 'SampleTree'],

    views: ['SampleGrid','SampleForm','SamplePanel','SampleTree', 'SampleTabPanel'],

    refs: [{
        ref: 'sampleForm',
        selector: 'sampleform'
    },{
        ref: 'sampleGrid',
        selector: 'samplegrid'
    },{
    	ref: 'sampleTree',
    	selector: 'sampletree'
    },{
    	ref: 'sampleTabPanel',
    	selector : 'sampletabpanel'
    },{
    	ref: 'sampleTree2',
    	selector : 'sampletree2'
    },{
    	ref: 'sampleComboBox',
    	selector : 'samplecombobox'
    }],
    
    init: function() {

        this.control({
            'samplegrid': {
            	selectionchange: this.gridSelectionChange,
                beforeedit : this.gridBeforeedit
            },
            '#facilities' : {
            	checkchange : this.setCheckFacilities
            },
            '#use' : {
            	checkchange : this.setCheckUse
            },
            'button[action=add-grid-record]' : {
            	click : this.addGridRecord
            },
            'button[action=remove-grid-record]' : {
            	click : this.removeGridRecord
            },
            'button[action=save-grid-record]' : {
            	click : this.saveGridRecord
            },
            'button[action=reload-grid-record]' : {
            	click : this.reloadGridRecord
            },
            'button[action=save-form-data]' : {
            	click : this.saveFormData
            },
            'button[action=reset-form-data]' : {
            	click : this.resetFormData
            },
            'sampletree':{
            	itemclick : this.onNodeSelect,
            	beforeload : this.treeBeforeLoad,
            	checkchange : this.togleCheckChange
            },
            'sampletree2':{
            	beforeload : this.treeBeforeLoad2,
            	checkchange : this.togleCheckChange2
            },
            'button[action=get-checked-nodes]' : {
            	click : this.getCheckedNodes
            },
            'button[action=open-window-tree]' : {
            	click : this.openWindowTree
            },
            '#addTabButton' : {
            	click : this.addTab
            },
            'samplecombobox' : {
            	beforequery : this.beforeComboBoxQuery
            }
        });
        
    },
    
    setCheckFacilities : function(column, recordIndex, checked) {
    	var store = this.getSampleGrid().getStore();
    	var m = store.getAt(recordIndex);
        m.set('facilitiesYn', checked?'Y':'N');
    },
    
    setCheckUse : function(column, recordIndex, checked) {
    	var store = this.getSampleGrid().getStore();
    	var m = store.getAt(recordIndex);
        m.set('useYn', checked?'Y':'N');
    },
    
    addGridRecord : function() {
    	var rowEditing = this.getSampleGrid().getPlugin('rowEditing');
    	var store = this.getSampleGrid().getStore();
    	rowEditing.cancelEdit();

        // Create a model instance
        var r = Ext.create('Ext.sample.model.Sample', {
        	areaCode: '',
        	serviceCode: '',
        	facilities: false,
            use: false,
            remark: 'Input Data',
            facilitiesYn : 'N',
            useYn : 'N',
            dataMode : 'I'
        });

        store.insert(0, r);
        rowEditing.startEdit(0, 0);
    },
    
    removeGridRecord : function() {
    	var grid = this.getSampleGrid();
    	var store = grid.getStore();
    	var sm = grid.getSelectionModel();
    	grid.getPlugin('rowEditing').cancelEdit();
        store.remove(sm.getSelection());
        if (store.getCount() > 0) {
            sm.select(0);
        }
    },
    
    saveGridRecord : function() {
    	var grid = this.getSampleGrid();
    	var store = grid.getStore();
    	
    	SampleCore._add(store.getNewRecords(), store);
    	SampleCore._modify(store.getModifiedRecords(), store);
    	SampleCore._remove(store.getRemovedRecords(), store);
    },
    
    reloadGridRecord : function() {
    	var grid = this.getSampleGrid();
    	var store = grid.getStore();
    	store.load();
    },
    
    saveFormData : function() {
    	var form = this.getSampleForm();
    	var store = this.getSampleGrid().getStore();
    	var data = [];
    	var formData = form.getForm().getValues();
    	if (formData.facilities) formData.facilitiesYn = 'Y';
    	else formData.facilitiesYn = 'N';
    	if (formData.use) formData.useYn = 'Y';
    	else formData.useYn = 'N';
    	data.push(formData);
    	SampleCore._merge(data, formData.dataMode, store);
    },
    
    resetFormData : function() {
    	var form = this.getSampleForm();
    	form.getForm().reset();
    },
    
    gridBeforeedit : function(editor, context, opt) {
    	var grid = this.getSampleGrid();
    	if (context.record.get('dataMode') == 'R') {
			grid.getPlugin('rowEditing').editor.form.findField('areaCode').disable();
			grid.getPlugin('rowEditing').editor.form.findField('serviceCode').disable();
		} else {
			grid.getPlugin('rowEditing').editor.form.findField('areaCode').enable();
			grid.getPlugin('rowEditing').editor.form.findField('serviceCode').enable();
		}
    },
    
    gridSelectionChange : function(model, records) {
    	var grid = this.getSampleGrid();
    	var form = this.getSampleForm();
    	grid.down('#removeSample').setDisabled(!records.length);
        if (records[0]) {
        	form.getForm().loadRecord(records[0]);
        }
    },
    
    onNodeSelect : function(view, record) {
    	
    },
    treeBeforeLoad : function(store, operation, eOpts) {
    	var proxy = store.getProxy();
        var node = operation.config.node;
        if (node != null && proxy != null) {
        	if (node.data.id != 'root') {
        		proxy.extraParams.categoryCode = 'GGFT'; 
        		proxy.extraParams.parentId = node.data.id;
        	}
        }
    },
    togleCheckChange : function(node, checked) {
    	node.cascadeBy(function(n){n.set('checked', checked);} );
    },
    treeBeforeLoad2 : function(store, operation, eOpts) {
    	var proxy = store.getProxy();
        var node = operation.config.node;
        if (node != null && proxy != null) {
        	if (node.data.id != 'root') {
        		proxy.extraParams.categoryCode = 'GGFT'; 
        		proxy.extraParams.parentId = node.data.id;
        	}
        }
    },
    togleCheckChange2 : function(node, checked) {
    	node.cascadeBy(function(n){n.set('checked', checked);} );
    },
    getCheckedNodes : function() {
    	var tree = this.getSampleTree();
    	var records = tree.getView().getChecked();
    	var data = [];
    	Ext.Array.each(records, function(rec){
    		data.push(rec.get('text'));
        });
    	
    	Ext.MessageBox.show({
            title: 'Selected Nodes',
            msg: data.join('<br />'),
            icon: Ext.MessageBox.INFO
        });
    },
    openWindowTree : function() {
    	var win = new Ext.sample.view.SampleWindow;
    	win.show();
    },
    addTab : function() {
    	var tab = this.getSampleTabPanel();
    	var count = tab.items.getCount();
		tab.add({
			title : 'tab-' + (count + 1),
			html : 'Tab Body ' + (count + 1),
			closable : true
		});
    	tab.setActiveTab(count);
    },
    beforeComboBoxQuery : function(queryEvent, eOpts) {
	     queryEvent.combo.store.proxy.extraParams = {
	       maxRowSize: 10,
	       codeCategoryName : queryEvent.combo.getValue()
	     };
    }
});