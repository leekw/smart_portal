var sourceModule = null; 
var targetModule = null;
var linkWay = null;
Ext.define('Ext.qainterface.controller.QaInterface', {
    extend: 'Ext.app.Controller',
    stores: ['QaInterfaceSummary','Program'],
    models: ['QaInterfaceSummary','Program'],

    views: ['ProgramGrid'],

    refs: [
		{
		    ref: 'qaInterfaceSummaryGrid',
		    selector: 'qainterfacesummarygrid'
		}
    ],
    
    init: function() {

        this.control({
        	'qainterfacesummarygrid' : {
        		cellclick : this.openInterfaceProgramList
        	}
        });
    },
    openInterfaceProgramList : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	var grid = this.getQaInterfaceSummaryGrid();
    	if (grid.columns[cellIndex].dataIndex == 'targetModule'
    		|| grid.columns[cellIndex].dataIndex == 'sourceModule') {
    		var way = record.get('linkWay');
    		sourceModule = record.get('sourceModule');
			targetModule = record.get('targetModule');
			linkWay = record.get('linkWay');
    		if (sourceModule == "구분없음") sourceModule = '-';
    		if (targetModule == "구분없음") targetModule = '-';
    		if (sourceModule == "요금온라인") sourceModule = 'BCC';
    		if (targetModule == "요금온라인") targetModule = 'BCC';
    		if (sourceModule == "공통영역") sourceModule = 'COM';
    		if (targetModule == "공통영역") targetModule = 'COM';
    		if (sourceModule == "RDS") sourceModule = ' ';
    		if (targetModule == "RDS") targetModule = ' ';
    		if (sourceModule == "B-RDS") sourceModule = ' ';
    		if (targetModule == "B-RDS") targetModule = ' ';
    		this.openProgramGrid();
    	}
    },
    openProgramGrid : function() {
    	var win = Ext.getCmp('program-info');
		if (win == null) {
			win = Ext.create('Ext.window.Window', {
				id : 'program-info',
	    	    title: '인터페이스 프로그램 정보',
	    	    resizable : true,
	    	    autoScroll: true,
	    	    maximizable : true,
	    	    layout: 'fit',
	    	    modal: true,
	    	    animateTarget:this,
	    	    padding : 10,
	    	    width : '85%',
	    	    height : '90%',
	    	    border:false,
	    	    items : [
	    	        {
	    	        	xtype : 'programgrid'
	    	        } 
	    	    ],
	    	    listeners : {
        	    	beforeshow : function(win) {
        	    		var temp = '';
        	    		if (linkWay == 'source') {
        	    			temp = '▶';
        	    		} else {
        	    			temp = '◀';
        	    		}
        	    		win.setTitle('인터페이스 프로그램 정보 -' + (sourceModule == '-' ? '구분없음' : sourceModule) + temp + (targetModule == '-' ? '구분없음' : targetModule) );
        	    		var grid = Ext.getCmp('program-grid');
        	    		var store = grid.getStore();
        	    		store.removeAll();
        	    		var proxy = store.getProxy();
        	    		proxy.extraParams.sourceModule = sourceModule;
        	    		proxy.extraParams.targetModule = targetModule;
        	    		proxy.extraParams.linkWay = linkWay;
        	    		store.load();
        	    	}
	    	    }
			});
		}
		win.show();
    }
});
