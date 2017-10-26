Ext.define('Ext.sample.view.SampleCodeGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.samplecodegrid',
    maxHeight: 500,

    initComponent: function() {
    	    	
        this.store = Ext.create('Ext.sample.store.SampleCode');
       
        this.columns = [{
            header: '코드카테고리아이디',
            dataIndex: 'codeCategoryId',
            width: 150
        }, { 
            header: '코드카테고리명',
            dataIndex: 'codeCategoryName',
            width: 150
        }, {
        	id :'useYn',
            header: '사용여부',
            dataIndex: 'useYn',
            width: 80
        }, {
            header: '비고',
            dataIndex: 'remark',
            flex: 1
        }];
                
        this.callParent(arguments);
    }
});    
