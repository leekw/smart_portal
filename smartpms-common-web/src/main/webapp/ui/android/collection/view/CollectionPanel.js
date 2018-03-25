Ext.define('Ui.android.collection.view.CollectionPanel', {
	extend : 'Ext.container.Container',
	alias : 'widget.collectionpanel',
	id : 'collection-panel',
	bodyPadding : 5,
	layout: 'responsivecolumn',
    defaults: {
        xtype: 'container'
    },
	border : false
	,
	items : [
        {
            xtype: 'collectiongrid',
            responsiveCls: 'big-80 small-100',
            style : {
                'background-color' : '#fff',
                'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)'
            },

        }

        //     responsiveCls: 'big-80 small-100',
        //     align:'center',
        //     region:'east',
        //     layout: 'column',
        //     items: [
        //         {
        //             // xtype :'form',
        //             // padding : 5,
        //             // layout: 'column',
        //             // border : false,
        //             // width: '70%',
        //             // align:'center',
        //             // items :[{
        //                 xtype : 'filefield',
        //                 name: 'fileupload',
        //                 id : 'class-file-upload',
        //                 width: '20%',
        //
        //                  //fieldLabel:'바이너리파일',
        //                 buttonText : '파일선택',
        //                // submitValue:true,
        //                 buttonOnly:true,
        //                   listeners: {
        //                     afterrender : function(object) {
        //                         object.fileInputEl.set({multiple: 'multiple'});
        //                     },
        //                     change : function(object, value, eOpts) {
        //                         alert("ddd");
        //                     }
        //                 }
        //
        //             },{
        //                  xtype:'textfield',
        //                  name: 'file',
        //                  width: '80%',
        //
        //             },{
        //
        //
        //            // }]
        //
        //         }
        //     ],
        //
        // },
        // {
        //     xtype : 'panel',
        //     border : false,
        //     title : '파일 정보',
        //     style : {
        //         'background-color' : '#fff',
        //         'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)',
        //         'align':'center',
        //     },
        //     responsiveCls: 'big-80 small-100',
        //     items: [
        //         {
        //             xtype :'form',
        //             border : false,
        //             padding : 10,
        //
        //             items :[{
        //                 xtype:'textfield',
        //                 name: 'fileName',
        //                 width: '70%',
        //                 labelWidth:'10%',
        //
        //                 fieldLabel:'파일명'
        //             },
        //             {
        //                 xtype:'textfield',
        //                 name: 'checksum',
        //                 width: '70%',
        //                 labelWidth:'10%',
        //                 fieldLabel:'MD5 체크'
        //             },
        //             {
        //                 xtype:'textfield',
        //                 name: 'size',
        //                 labelWidth:'10%',
        //                 width: '70%',
        //                 fieldLabel:'파일 사이즈'
        //             },
        //             ]
        //
        //         }
        //     ],
        //
        // },  {
        //     xtype : 'panel',
        //     border : false,
        //     title : '중복 등록정보',
        //     style : {
        //         'background-color' : '#fff',
        //         'box-shadow': '0 5px 5px 0 rgba(0,0,0,.25)',
        //         'align':'center',
        //     },
        //     responsiveCls: 'big-80 small-100',
        //     items: [
        //         {
        //             xtype :'form',
        //             border : false,
        //             padding : 10,
        //             items :[{
        //                 xtype:'textfield',
        //                 name: 'fileName',
        //                 width: '70%',
        //                 labelWidth:'10%',
        //
        //                 fieldLabel:'등록일자'
        //             }
        //             ]
        //
        //         }
        //     ],
        //
 	]
});




