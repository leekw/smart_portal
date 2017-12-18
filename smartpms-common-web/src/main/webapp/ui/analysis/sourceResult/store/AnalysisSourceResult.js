Ext.define('Ui.analysis.sourceResult.store.AnalysisSourceResult', {
	extend : 'Ext.data.TreeStore',
	model : 'Ui.analysis.sourceResult.model.AnalysisSourceResultTree',
	// proxy : {
	// 	type: 'ajax',
     //    url: G_PATH + '/permit/res/list/get.json',
     //    headers: {
     //        'Content-Type': 'application/json'
     //    },
     //    reader: {
     //        type: 'json',
     //        rootProperty: 'resources'
     //    },
     //    actionMethods: {
     //        create : 'POST',
     //        read   : 'POST',
     //        update : 'POST',
     //        destroy: 'POST'
     //    },
     //    defaultRootProperty: 'resources',
     //    extraParams : { maxRowSize : 0, parentResourceId : 'TOP', adminYn : 'Y' }
	// },
	root : {
		id : 'root',
		text : '차세대 PMO',
		expanded : true,
        children :[
            {
                text: 'Analysis.class',
                children :[
                    {leaf:false, text:'AnalysisSource.class',analysisModul:'PMD'},
                    {leaf:true, text:'AnalysisTarget.class',classInterface:'interface',analysisModul:'PMD'},
                    {leaf:true, text:'AnalysisResult.class',analysisModul:'PMD'},
                ]

            },{
                text: 'Board.class',
                    children :[
                    {leaf:true, text:'BoardSource.class',classInterface:'class',analysisModul:'PMD,FORTIRY'},
                    {leaf:true, text:'BoardTarget.class',classInterface:'class',analysisModul:'PMD,FORTIRY'},
                    {leaf:true, text:'BoardList.class',classInterface:'interface',analysisModul:'PMD,FORTIRY'},
                    {leaf:true, text:'Notice.class',classInterface:'class',analysisModul:'PMD,FORTIRY'},

                ]
            },{
                text: 'Notice.class',
                    children :[
                    {leaf:true, text:'NoticeRead.class',analysisModul:'PMD,FORTIRY'},
                    {leaf:true, text:'NoticeWrite.class',analysisModul:'PMD,FORTIRY'},
                    {leaf:true, text:'NoticeRemove.class',analysisModul:'PMD'},
                    {leaf:true, text:'Board.class',analysisModul:'PMD'},
                    ]
            }
        ]
	},
	autoLoad: false
	
});
