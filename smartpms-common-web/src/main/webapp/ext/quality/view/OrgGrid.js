Ext.define('Ext.quality.view.OrgGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.orggrid',
    autoScroll: true,
    background: 'none',
    border: false,
    id : 'org-grid',
    minHeight : 425,
    maxHeight : 425,
    initComponent: function() {

        this.store = 'Org';
        
        this.plugins = [];
        
        this.selModel = {
            selType: 'checkboxmodel',
            mode : 'SINGLE',
            listeners : {
            	deselect : function( check, record, index, eOpts ) {
	               	Ext.getCmp('quality-detail-grid').getStore().removeAll();
	               	Ext.getCmp('developer-grid').getStore().removeAll();
            	},
	            select : function(check, record, index, eOpts ) {
	            	var grid = Ext.getCmp('quality-summary-grid');
	    			var store = grid.getStore();
	               	var proxy = store.getProxy();
	               	proxy.extraParams.team = record.data.originalOrgName;
	               	store.load();
	               	
	               	var topGrid = Ext.getCmp('developer-top-grid');
	               	var topStore = topGrid.getStore();
	               	var topProxy = topStore.getProxy();
	               	topProxy.extraParams.team = record.data.originalOrgName;
	               	var topList = Ext.getCmp('top-list').getValue()["topList"] + "";
	               	topProxy.extraParams.topList = topList.split(",") ;
	               	topProxy.extraParams.module = null;
	               	topProxy.extraParams.function = null;
	               	topStore.load();
	               	
	               	Ext.getCmp('quality-detail-grid').getStore().removeAll();
	               	Ext.getCmp('developer-grid').getStore().removeAll();
	               	
	             }
            }
        };
        
        this.columns = [		
        { 
            header: '팀',
            dataIndex: 'orgName',
            width: 150,
            flex:1,
            align:'center'
        }];
        
        
        this.tbar = [
             {
             	xtype : 'label',
             	width : '100%',
             	hieght : 10,
             	html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;팀 선택 -' + DateUtil._formatDateNormal(new Date()) + '기준 </span></div>'
             	      + (G_IS_HADNS == 'Y' ? '<div style="float:right;"><span style="cursor:pointer;cursor:hand;" onclick="OrgGridAction.load()"><i class="x-fa fa-refresh" style="padding-right:5px;"></i></span><span style="cursor:pointer;cursor:hand;" onclick="OrgGridAction.processQualityData()"><i class="x-fa fa-gears" style="padding-right:5px;"></i></span>'
             		  : '<span style="cursor:pointer;cursor:hand;" onclick="OrgGridAction.load()"><i class="x-fa fa-refresh" style="padding-right:5px;"></i></span>')
             		  + '</div>'
              }
        ];
        
        this.callParent(arguments);
    },
    listeners : {
    	resize : function (self, width, height) {
    	}
    }
});
var OrgGridAction = {
		load : function() {
			var team;
			var grid = Ext.getCmp('org-grid');
			var sm = grid.getSelectionModel();
			var rec = sm.getSelection()[0];
			if (rec) {
				team = rec.data.originalOrgName;
			}
			
			var grid = Ext.getCmp('quality-summary-grid');
			var store = grid.getStore();
           	var proxy = store.getProxy();
           	proxy.extraParams.team = team;
           	store.load();
           	
           	var topGrid = Ext.getCmp('developer-top-grid');
           	var topStore = topGrid.getStore();
           	var topProxy = topStore.getProxy();
           	topProxy.extraParams.team = team;
           	var topList = Ext.getCmp('top-list').getValue()["topList"] + "";
           	topProxy.extraParams.topList = topList.split(",") ;
           	topProxy.extraParams.module = null;
           	topProxy.extraParams.function = null;
           	topStore.load();
           	
           	Ext.getCmp('quality-detail-grid').getStore().removeAll();
           	Ext.getCmp('developer-grid').getStore().removeAll();
		},
		processQualityData : function() {
			Ext.getBody().mask("Processing...");
			Ext.Ajax.setTimeout(1000 * 60 * 10);
			Ext.Ajax.request({
        	    url: G_PATH + '/quality/data/add.json',
        	    method: 'POST',
//        	    jsonData: Ext.encode(param),
        	    success: function(response){
        	    	var data = JSON.parse(response.responseText);
        	    	Ext.getBody().unmask();
        	    	if (data.error != null) {
        	    		Ext.Msg.alert('Error', '품질 데이터 생성 중 오류가 발생되었습니다.');
        	    	} else {
        	    		Ext.Msg.alert('Complete', '품질 데이터 생성이 완료되었습니다.');
        	    	}
        	    },
        	    failure: function(){
        	    	Ext.getBody().unmask();
        	    	Ext.Msg.alert('Error', '품질 데이터 생성 중 오류가 발생되었습니다.');
        	    }
        	});
		}
}
