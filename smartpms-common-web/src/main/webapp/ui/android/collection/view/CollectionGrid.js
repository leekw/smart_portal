Ext.define('Ui.android.collection.view.CollectionGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.collectiongrid',
    title: '분석대상 등록',
    id :'collection-grid',
    background: 'none',
    layout: 'fit',
    minHeight : 600,
    maxHeight : 700,
    columnLines : true,
    initComponent: function() {

        this.store = 'Collection';

        this.selModel = {};

        this.columns = [
            new Ext.grid.RowNumberer({
                header: 'No',
                width: 60,
                align: 'center'
            }),
            {
                header: '파일명',
                dataIndex: 'analysisJavaFileName',
                width:'30%'
            }, {
                header: 'APK 식별값(MD5 HASH)',
                dataIndex: 'md5Hash',
                width:'40%'
            }, {
                header: '분석진행상황',
                dataIndex: 'analysisYn',
                width:'25%'
            }

        ];


        this.bbar = this.paging= Ext.create('Ext.toolbar.Paging',
            {
                store : this.store,
                displayInfo: true
            });

        this.tbar = [
            {
                xtype :'form',
                border:false,
                layout: 'column',
                width: '80%',
                items :[{
                    xtype : 'filefield',
                    name: 'fileupload',
                    id : 'class-file-upload',
                    width: '100%',
                    buttonText : '파일선택',
                    listeners: {
                        afterrender: function (object) {
                            object.fileInputEl.set({multiple: 'multiple'});
                        },
                        change: function (object, value, eOpts) {

                            var frm = this.up("form").getForm();
                            if (frm.isValid()) {
                                frm.submit({
                                    url: G_PATH + '/permit/res/mobile/file/upload.file',
                                    success: function (ft, res) {
                                        var jsonResult = Ext.JSON.decode(res.response.responseText);

                                        var store = Ext.getCmp('collection-grid').getStore();
                                        store.load();

                                    },
                                    failure: function (ft, res) {
                                        Ext.Msg.alert('Exception', result.error.message);
                                    }
                                });
                            }

                        }
                    }
                }]
            },{
                text: 'parser',
                ui : 'soft-blue',
                handler : function() {

                    Ext.Ajax.request({
                        url: G_PATH + '/analysis/mobile/apk/parse.json',
                        method : 'POST',
                        headers : {'Content-Type' : 'application/json'},
                        params : (Ext.JSON.encode({analysisFileNo : 31})),
                        success: function(res, eOtps) {

                        },
                        failure: function(res, eOtps) {
                        }

                    });

                }
            }
        ];
        this.callParent(arguments);

    }, listeners : {
        afterrender : function(panel) {

        },
        beforerender : function(panel) {

        },

        cellclick :function(grid,td,cellIndex,record,tr,rowIndex,e,eOpts){


            //document.location.href = "http://192.168.0.29/9997/list.php"

            //local
            window.open("http://192.168.0.29:9997/list.php");

           //prd
            //window.open("http://14.39.151.185:9997/list.php");

            // var win = Ext.getCmp('analysis-apk-info');
            // if (win == null) {
            //     win = Ext.create('Ext.window.Window', {
            //         id : 'analysis-apk-info',
            //         title: 'APK 분석',
            //         autoScroll: true,
            //         maximizable : true,
            //         width: 800,
            //         height:600,
            //         layout: 'fit',
            //         modal:false,
            //         listeners : {
            //             afterrender : function(field) {
            //               document.location.href = "http://192.168.0.29/9997/list.php"
            //
            //             }
            //
            //         }
            //
            //     });
            // }
            // win.show();



        },


    }
})


