//var _cutoverUrl = "http://10.217.136.106:8080/pmss/resource/websquare/websquare.html?w2xPath=/pmss/cosr/cutover.xml";
var _cutoverUrl = "/int/etc/cutover-min.html";

Ext.define('Ext.main.view.MainPanel', {
	extend : 'Ext.form.Panel',
	alias : 'widget.mainpanel',
	id : 'main-acc',
	bodyPadding : 5,
	layout:{
		type : 'fit',
		border: true
	},
	title: 'Cut-Over Task List',
	items : [{
		xtype: 'panel',
        maxHeight:70,
        html: '<iframe id="cutover-iframe" width="100%" height="100%" src="' + _cutoverUrl + '" frameborder="0" allowfullscreen></iframe>'
	},{
		id: 'main-grid',
		xtype : 'maingrid'
	}]
});