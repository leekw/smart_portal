Ext.define('Ui.based.notice.view.NoticeForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.noticeform',
    bodyPadding: 10,
    minHeight: 400,
    autoScroll:true,
    defaults: {
        labelWidth: 120
    },
    defaultType: 'textfield',
    cls: 'email-compose',
    items: [
        {
            fieldLabel: '제목',
            name: 'noticeTitle',
            anchor: '70%'
        },
        {
        	xtype: 'radiogroup',
            fieldLabel: '공지 레벨',
            id : 'noticeTemplateSelect',
            anchor: '50%',
            items:[
                {boxLabel: '일반', name:'noticeLevel', inputValue:'NORMAL'},
                {boxLabel: '장애발생공지', name:'noticeLevel', inputValue:'CRITICAL'},
                {boxLabel: '장애처리완료', name:'noticeLevel', inputValue:'COMPLETE'}
            ]
        },
        {
        	xtype: 'radiogroup',
            fieldLabel: '공지발행유형',
            anchor: '50%',
            items:[
                   {boxLabel: '공지발행', name:'noticePublishType', inputValue:'1', checked : true},
                   {boxLabel: '이메일발송', name:'noticePublishType', inputValue:'2'},
                   {boxLabel: '공지/이메일전체', name:'noticePublishType', inputValue:'3'}
               ]
        },
        {
        	xtype: 'checkbox',
            fieldLabel: '메인공지여부',
            name: 'main',
            anchor: '50%'
        },
        {
        	xtype:'htmleditor',
            fieldLabel: '공지내용',
            id:'noticeDescription',
            name: 'noticeDescription',
            width: '100%',
            minHeight: 340,
            listeners : {
            	'initialize' : function(editor) {
            		editor.getEditorBody().onpaste = function(event) {
            			var items = (event.clipboardData || event.originalEvent.clipboardData).items;
            			for (index in items) {
            				var item = items[index];
            				if (item.kind == 'file') {
            					var blob = item.getAsFile();
            					var reader = new FileReader();
            					if (blob) {
            						reader.readAsDataURL(blob);
            					}
            					reader.addEventListener("load", function() {
            						var obj = Ext.getCmp('noticeDescription');
            						var image = '<img src="' + reader.result + '">';
            				    	obj.setValue(obj.getValue() + image);
            					}, false);
            					
            				}
            			}
            		}
            	},
            	resize : function (self, width, height) {
            		this.setHeight(Ext.getCmp('notice-panel').getHeight() - 430);
            	}
            }
        },{
        	xtype : 'hidden',
            name: 'dataMode'
        },{
        	xtype : 'hidden',
            name: 'noticeId'
        }
        
    ],
    buttons: [{
        text:'<span class="right-icon hot-icon x-fa fa-send"></span>',
        action: 'pub-form-data',
        ui : 'soft-blue',
        hidden : G_IS_HADNS == "Y" ? false : true
    },{
        text:'저장',
        action: 'save-form-data',
        ui : 'soft-green',
        hidden : G_IS_HADNS == "Y" ? false : true
    },{
        text: '닫기',
        action: 'reset-form-data',
        ui : 'soft-red',
        hidden : G_IS_HADNS == "Y" ? false : true,
    }]
});  