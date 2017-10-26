Ext.Loader.loadScript({url:G_PATH + '/ext/main/controller/MainCore.js'});
Ext.define('Ext.main.controller.Main', {
    extend: 'Ext.app.Controller',
    stores: ['Main', 'MainCode', 'TransitionCode'],
    models: ['Main', 'MainCode'],

    views: ['MainGrid','MainPanel', 'MainComboBox','TransitionComboBox'],

    refs: [{
        ref: 'mainGrid',
        selector: 'maingrid'
    },{
        ref: 'mainComboBox',
        selector: 'maincombobox'
    },{
        ref: 'transitionComboBox',
        selector: 'transitioncombobox'
    }],
    
    init: function() {

        this.control({
            'maingrid': {
            	selectionchange: {fn : this.gridSelectionChange, scope: window}
            },
            '#jiraId' : {
            	click : this.openJiraPopup
            },
            'button[action=reload-grid-record]' : {
            	click : this.reloadGridRecordByLocal
            },
            'button[action=view-option]' : {
            	click : this.ganttViewOption
            },
            'button[action=open-jira-dashboard]' : {
            	click : this.openJiraDashboard
            },
            'button[action=sync-jira]' : {
            	click : this.syncJira
            },
            'button[action=toggle-panel]' : {
            	click : this.togglePanel
            },
            '#hourScaleOption' : {
            	change : this.changeScale
            }
            
        });
        
    },
    changeScale : function() {
    	var iframe = document.getElementById("cutover-iframe").contentWindow;
    	var rg = Ext.getCmp('hourScale-opt');
    	_hourSacle = rg.getValue().hourScale;
    	if (_hourSacle < 4) {
	    	if(confirm("클라이언트 로딩 속도가 저하될 수 있습니다.\n그래도 시간단위 설정을 변경하시겠습니까?")){
	    		iframe.changeScale();
	    		this.reloadGridRecord();
	    	}
    	}
    },
    moveSelectRow : function(task) {
    	var grid = this.getMainGrid();
    	var rowIndex = grid.getStore().find('jobId', task);
    	grid.getView().select(rowIndex);
    	grid.getView().focusRow(rowIndex);
    },
    gridSelectionChange : function(model, records) {
        var iframe = document.getElementById("cutover-iframe").contentWindow;
    	iframe.openQuickInfo(records[0].data.jobId);
    },
    ganttViewOption : function() {

    },
    openJiraDashboard : function() {
    	var iframe = document.getElementById("cutover-iframe").contentWindow;
    	iframe.goJiraDashboard();
    },
    syncJira : function() {
    	var grid = this.getMainGrid();
    	var combobox = this.getMainComboBox();
    	var store = grid.getStore(); 
    	var proxy = store.getProxy();
    	var param = combobox.getValue() == null ? proxy.extraParams.cutoverTh : combobox.getValue(); 
    	var iframe = document.getElementById("cutover-iframe").contentWindow;
    	var transition = this.getTransitionComboBox();
    	var step = transition.getValue() == null ? proxy.extraParams.jobStep : transition.getValue();
    	
    	iframe.jiraSync(param, step);
    },
    reloadGridRecord : function(filterType) {
    	var grid = this.getMainGrid();
    	var store = grid.getStore(); 
    	var proxy = store.getProxy();
    	var combobox = this.getMainComboBox();
    	var transition = this.getTransitionComboBox();
    	var param = combobox.getValue() == null ? proxy.extraParams.cutoverTh : combobox.getValue(); 
    	proxy.extraParams.cutoverTh = param;
    	if (filterType != null) {
    		proxy.extraParams.filterType = filterType;
    	}
    	if (transition.getValue() != null) {
        	proxy.extraParams.jobStep = transition.getValue();
    	}
    	store.load();
    },
    reloadGridRecordByLocal : function() {
    	var iframe = document.getElementById("cutover-iframe").contentWindow;
    	var filterType = null;
    	var grid = this.getMainGrid();
    	var store = grid.getStore(); 
    	var proxy = store.getProxy();
    	var combobox = this.getMainComboBox();
    	var transition = this.getTransitionComboBox();
    	var param = combobox.getValue() == null ? proxy.extraParams.cutoverTh : combobox.getValue(); 
    	proxy.extraParams.cutoverTh = param;
    	proxy.extraParams.filterType = null;
    	var jobStep = null;
    	if (transition.getValue() != null) {
    		jobStep = transition.getValue();
    		proxy.extraParams.jobStep = jobStep;
    	}
    	proxy.extraParams.filterType = iframe._type;
    	store.load();
    	iframe.dataReload(param, "N", jobStep);
    },
    openJiraPopup : function (grid, td, cellIndex, rowIndex, tr, record, e, eOpts) {
    	var jiraId = record.get('jiraId');
    	var url = "http://10.217.230.250:8080/browse/" + jiraId;
	    var option = "left=10,top=10,width=1280px,height=700px,location=no,titlebar=no,scrollbars=yes";
    	var popup = window.open(url, 'Jira', option);
        popup.focus();
    },
    togglePanel : function() {
    	var acc = Ext.getCmp('main-acc');
    	var line = Ext.getCmp('main-line');
    	var grid = Ext.getCmp('main-grid');
    	if (line.getHeight() > 200) {
    		line.setMaxHeight(100);
        	grid.setMaxHeight(acc.getHeight()-100);
    	} else {
    		grid.setMaxHeight(250);
        	line.setMaxHeight(acc.getHeight()-250);
    	}
    	acc.doLayout();
    	
    }
});