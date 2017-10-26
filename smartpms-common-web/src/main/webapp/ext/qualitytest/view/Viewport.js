var ViewAction = {
	changeBar : function(_team, _module) {
		var panel = Ext.create('Ext.panel.Panel',{
			  requires: [
		   		'Ext.chart.CartesianChart',
		   		'Ext.chart.axis.Category',
		   		'Ext.chart.axis.Numeric',
		   		'Ext.chart.series.Bar',
		        'Ext.chart.interactions.PanZoom'
		      ],
		      cls: 'quick-graph-panel shadow-panel',
		      height: 350,
		      headerPosition: 'bottom',
		      ui: 'light', 
		      border :false,
		      bodyPadding: 30,
		       layout: {
		       	type: 'vbox',
		           align: 'stretch'
		       },
		       items: [
		   		{
		   		  	xtype : 'label',
		   		  	width : '100%',
		   		  	hieght : 10,
		   		  	html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;연동 변동 추이 </span></div>'
		   		  		  + '</div>'
		   		},
		   		{
		   		    xtype: 'container',
		   		    flex: 1,
		   		    layout: 'fit',
		   		    border :false,
		   		    items: [
		   		       {
	                        xtype: 'cartesian',
	                        border :false,
	                        animation : !Ext.isIE9m && Ext.os.is.Desktop,
	                        insetPadding:20,
	                        store: Ext.create('Ext.qualitytest.store.ChangeBarChart'),
	                        legend : {
	                        	border: false,
	                        	docked : 'bottom'
	                        },
	                        axes: [
	                            {
	                                type: 'category3d',
	                                maximum : 15,
	                                fields: [
	                                    'statDate'
	                                ],
	                                hidden: false,
	                                position: 'bottom',
	                                label: {
	                                    rotate: {
	                                        degrees: -45
	                                    }
	                                }
	                            },
	                            {
	                                type: 'numeric3d',
	                                minorTickSteps :1,
	                                grid: {
	                                    odd: {
	                                        fill: '#e8e8e8'
	                                    }
	                                },
	                                label: {
	                                    renderer: function(v) { return Ext.util.Format.number(v,'0,000'); }
	                                },
	                                hidden: false,
	                                position: 'left'
	                            }
	                        ],
	                        series: [
								
	                        ],
	                        interactions: [
	                            {
	                                type: 'panzoom',
	                                zoomOnPanGesture : true
	                            }
	                        ],
		   		            listeners : {
		   		            	beforerender : function(chart, eOpts) {
		   				    		
		   				    	}
		   		            }
	                    }
		   		    ]
		   		}
		        ],
		        responsiveCls: 'big-25 small-50'
		});
		return panel;
	},
	histLine : function(_team, _module) {
		var panel = Ext.create('Ext.panel.Panel',{
			  requires: [
		   		'Ext.chart.CartesianChart',
		   		'Ext.chart.axis.Category',
		   		'Ext.chart.axis.Numeric',
		   		'Ext.chart.series.Line',
		        'Ext.chart.interactions.PanZoom'
		      ],
		      cls: 'quick-graph-panel shadow-panel',
		      height: 350,
		      headerPosition: 'bottom',
		      ui: 'light', 
		      border :false,
		      bodyPadding: 30,
		       layout: {
		       	type: 'vbox',
		           align: 'stretch'
		       },
		       items: [
		   		{
		   		  	xtype : 'label',
		   		  	width : '100%',
		   		  	hieght : 10,
		   		  	html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;연동 호출 추이 </span></div>'
		   		  		  + '</div>'
		   		},
		   		{
		   		    xtype: 'container',
		   		    flex: 1,
		   		    layout: 'fit',
		   		    border :false,
		   		    items: [
		   		       {
	                        xtype: 'cartesian',
	                        border :false,
	                        animation : !Ext.isIE9m && Ext.os.is.Desktop,
	                        insetPadding:20,
	                        store: Ext.create('Ext.qualitytest.store.HistLineChart'),
	                        colors: [
	                             'rgba(103, 144, 199, 0.6)',
	                             'rgba(238, 146, 156, 0.6)'
	                        ],
	                        legend : {
	                        	border: false,
	                        	docked : 'bottom'
	                        },
	                        axes: [
	                            {
	                                type: 'category',
	                                maximum : 15,
	                                fields: [
	                                    'statDate'
	                                ],
	                                hidden: false,
	                                position: 'bottom',
	                                label: {
	                                    rotate: {
	                                        degrees: -45
	                                    }
	                                }
	                            },
	                            {
	                                type: 'numeric',
	                                minimum: 0,
	                                minorTickSteps :1,
	                                maximum : 110,
	                                fields: [
	                                    'sourceRunRatio',
	                                    'targetRunRatio'
	                                ],
	                                grid: {
	                                    odd: {
	                                        fill: '#e8e8e8'
	                                    }
	                                },
	                                label: {
	                                    renderer: function(v) { return Ext.util.Format.number(v,'0,000'); }
	                                },
	                                hidden: false,
	                                position: 'left'
	                            }
	                        ],
	                        series: [
								{
								    type: 'line',
								    showInLegend: true,
								    title: 'OutBound',
								    xField: 'statDate',
								    yField: 'sourceRunRatio',
								    marker: {
								    	type: 'arrow',
								    	fx: {
								    		duration:200,
								    		easing: 'backOut'
								    	}
								    },
								    style: {
								        'stroke-width': 3
								    },
								    highlightCfg : {
								    	opactity: 1,
								    	strokeStyle: 'black'
								    },
								    tooltip : {
								    	trackMouse: true,
								    	renderer: function(tooltip, record, item) {
								    		tooltip.setHtml(record.get('statDate') + ': ' + Ext.util.Format.number(record.get(item.field),'0,000') + '%');
								        }
								    },
								    useDarkerStrokeColor: false,
								    smooth: true
								},
								{
								    type: 'line',
								    showInLegend: true,
								    title: 'InBound',
								    xField: 'statDate',
								    yField: 'targetRunRatio',
								    marker: {
								    	type: 'arrow',
								    	fx: {
								    		duration:200,
								    		easing: 'backOut'
								    	}
								    },
								    style: {
								        'stroke-width': 3
								    },
								    highlightCfg : {
								    	opactity: 1,
								    	strokeStyle: 'black'
								    },
								    tooltip : {
								    	trackMouse: true,
								    	renderer: function(tooltip, record, item) {
								    		tooltip.setHtml(record.get('statDate') + ': ' + Ext.util.Format.number(record.get(item.field),'0,000') + '%');
								        }
								    },
								    useDarkerStrokeColor: false,
								    smooth: true
								}
	                        ],
	                        interactions: [
	                            {
	                                type: 'panzoom',
	                                zoomOnPanGesture : true
	                            }
	                        ],
		   		            listeners : {
		   		            	beforerender : function(chart, eOpts) {
		   				    	}
		   		            }
	                    }
		   		    ]
		   		}
		        ],
		        responsiveCls: 'big-25 small-50'
		});
		return panel;
	},
	pie : function(_team, _module) {
		var panel = Ext.create('Ext.panel.Panel',{
			  requires: [
		   		'Ext.chart.CartesianChart',
		   		'Ext.chart.axis.Category',
		   		'Ext.chart.axis.Numeric',
		   		'Ext.chart.series.Pie',
		        'Ext.chart.interactions.PanZoom'
		      ],
		      cls: 'quick-graph-panel shadow-panel',
		      height: 350,
		      headerPosition: 'bottom',
		      ui: 'light', 
		      border :false,
		      bodyPadding: 30,
		       layout: {
		       	type: 'vbox',
		           align: 'stretch'
		       },
		       items: [
		   		{
		   		  	xtype : 'label',
		   		  	width : '100%',
		   		  	hieght : 10,
		   		  	html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;프로그램 유형 현황 </span></div>'
		   		  		  + '</div>'
		   		},
		   		{
		   		    xtype: 'container',
		   		    flex: 1,
		   		    layout: 'fit',
		   		    border :false,
		   		    items: [
		   		        {
		   		            xtype: 'polar',
		   		            border :false,
		   		            theme: 'Muted',
		   		            animation : !Ext.isIE9m && Ext.os.is.Desktop,
		   		            insetPadding:20,
		   		            store: Ext.create('Ext.qualitytest.store.ProgramPieChart'),
		   		            legend : {
		   		            	border: 0,
		   		            	docked : 'bottom'
		   		            },
		   		            plugins : {
		   		            	ptype : 'chartitemevents',
		   		            	moveEvents: true
		   		            },
		   		            colorSpread : 2,
		   		            series: [
		   						{
		   						    type: 'pie3d',
		   						    angleField: 'programRatio',
		   						    donut: 30,
		   						    label: {
		   						        field: 'programType',
		   						        calloutLine : {
		   						        	length : 30,
		   						        	width: 3
		   						        }
		   						    },
		   						    highlight : true,
		   						    tooltip : {
								    	trackMouse: true,
								    	renderer: function(tooltip, record, item) {
		                            		tooltip.setHtml(record.get('programType') + '-' 
		                            				+ Ext.util.Format.number(record.get(item.field),'0,000') + '% (' + record.get('programRunCount') + '/' + record.get('programCount')  + ')');
		                                }
								    },
								    listeners : {
									    itemmousedown : function( series, item, event, eOpts  ) {
									    	var programType = item.record.get("programType");
									    	if (programType == 'SO/JO') programType = 'SJ';
									    	g_team = _team;
									    	g_module = _module;
									    	g_programType = programType;
								    		DataAction.openProgramOrgGrid();
				   				    	}
								    }
		   						}
		   		            ],
		   		            interactions: [
		   		                'rotatePie3d', 'itemhighlight'
		   		            ],
		   		            listeners : {
		   		            	beforerender : function(chart, eOpts) {
		   				    	}
		   		            }
		   		        }
		   		    ]
		   		}
		        ],
		        responsiveCls: 'big-25 small-50'
		});
		return panel;
	},
	pieByModule : function(_team, _module) {
		var panel = Ext.create('Ext.panel.Panel',{
			  requires: [
		   		'Ext.chart.CartesianChart',
		   		'Ext.chart.axis.Category',
		   		'Ext.chart.axis.Numeric',
		   		'Ext.chart.series.Pie',
		        'Ext.chart.interactions.PanZoom'
		      ],
		      cls: 'quick-graph-panel shadow-panel',
		      height: 350,
		      headerPosition: 'bottom',
		      ui: 'light', 
		      border :false,
		      bodyPadding: 30,
		       layout: {
		       	type: 'vbox',
		           align: 'stretch'
		       },
		       items: [
		   		{
		   		  	xtype : 'label',
		   		  	width : '100%',
		   		  	hieght : 10,
		   		  	html: '<div><div style="float:left;"><span sytle="padding-left:10px;font-size:14px;font-weight:800;text-decoration:underline; !important">&nbsp;<i class="x-fa fa-info-circle" style="padding-left:5px;"></i>&nbsp;연관 팀/모듈별 현황 </span></div>'
		   		  		  + '</div>'
		   		},
		   		{
		   		    xtype: 'container',
		   		    flex: 1,
		   		    layout: 'fit',
		   		    border :false,
		   		    items: [
		   		        {
		   		            xtype: 'polar',
		   		            border :false,
		   		            theme: 'Muted',
		   		            animation : !Ext.isIE9m && Ext.os.is.Desktop,
		   		            insetPadding:20,
		   		            store: Ext.create('Ext.qualitytest.store.ModulePieChart'),
		   		            legend : {
		   		            	border: 0,
		   		            	docked : 'bottom'
		   		            },
		   		            plugins : {
		   		            	ptype : 'chartitemevents',
		   		            	moveEvents: true
		   		            },
		   		            series: [
		   						{
		   						    type: 'pie3d',
		   						    angleField: 'relCount',
		   						    donut: 30,
		   						    label: {
		   						        field: 'module',
		   						        calloutLine : {
		   						        	length : 30,
		   						        	width: 3
		   						        }
		   						    },
		   						    highlight : true,
		   						    tooltip : {
								    	trackMouse: true,
								    	renderer: function(tooltip, record, item) {
		                            		tooltip.setHtml(record.get('module') + '-' 
		                            				+ '(' + record.get('relRunCount') + '/' + record.get('relCount')  + ')');
		                                }
								    },
								    listeners : {
									    itemmousedown : function( series, item, event, eOpts  ) {
									    	var module = item.record.get("module");
									    	sourceModule = _module;
											targetModule = module;
											linkWay = null;
											relationType = null;
											relationName = null;
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
								    		_programType = null;
								    		DataAction.openProgramGrid();
				   				    	}
								    }
		   						}
		   		            ],
		   		            interactions: [
		   		                'rotatePie3d', 'itemhighlight'
		   		            ],
		   		            listeners : {
		   		            	beforerender : function(chart, eOpts) {
		   				    	}
		   		            }
		   		        }
		   		    ]
		   		}
		        ],
		        responsiveCls: 'big-25 small-50'
		});
		return panel;
	},
	treeView : function(_team, _module) {
		return [
		 {
			xtype : 'treepanel',
			minHeight: 350,
			rootVisible : false,
			hideHeaders : true,
//			columnLines : true,
			bodyStyle: {
		        background: 'none'
		    },
		    style : {
		    	background: 'none'
		    },
		    features : [{
	        	ftype: 'summary'
	        }],
		    columns: [
			{
				width : 30,
				renderer : function(value, meta, record, rowIndex) {
					meta.style = "background-color:#f6f6f6;";
				}
			},
		    {
				text : 'count1',
				width : 30,
				align : 'center',
				dataIndex : 'relationWay',
				renderer : function(value, meta, record, rowIndex) {
					var color = null;
					if (record.get('programType') == 'DO') {
						color = '#c0c0c0';
					} else {
						var temp = record.get('relRunCount')*100 / record.get('relCount');
						temp = temp.toFixed(2);
						if (temp > 95) {
							color = '#4caf50';
						} else if (temp <= 95 && temp >= 50) {
							color = '#ffc107';
				    	} else {
				    		color = '#e91e63';
				    	}
					}
					meta.style = "background-color:#f6f6f6;";
					return '<i class="x-fa fa-circle" style="color:' + color +'"></i>';
				}
		    },
		    {
				text : 'relationWay',
				width : 28,
				align : 'center',
				dataIndex : 'relationWay',
				renderer : function(value, meta, record, rowIndex) {
					var item = value == 'source' ? 'right' : 'left';
			    	var color = value == 'source' ? 'blue' : 'red';
			    	meta.style = "background-color:#f6f6f6;";
			    	return '<i class="x-fa fa-arrow-' + item + '" style="color:' + color +'"></i>';
				}
		    },
		    {
//		    	xtype : 'treecolumn',
				text : 'realtionText',
				width : 150,
				flex:1,
				dataIndex : 'text',
				summaryType : function(records) {
	            	return records.length > 0 ? '전체' : null;
	            },
	            summaryRenderer : function(value, meta, record, rowIndex) {
	            	return '<span style="color:black;font-weight:bold">전체</span>';
	            },
	            renderer : function(value, meta, record, rowIndex) {
	            	meta.style = "background-color:#f6f6f6;";
	            	return value;
	            }
		    },
		    {
				text : 'programType',
				width : 75,
				align : 'center',
				dataIndex : 'programType',
	            renderer : function(value, meta, record, rowIndex) {
	            	meta.style = "background-color:#f6f6f6;";
	            	return value;
	            }
		    },
		    {
				text : 'count',
				width : 70,
				align : 'center',
				dataIndex : 'relCount',
				renderer : function(value, meta, record, rowIndex) {
					meta.style = "background-color:#f6f6f6;";
					return record.get('relRunCount') + '/' + value;
				},
				summaryType : function(records) {
			    	var result = 0;
			    	var count = 0;
			    	var total = 0;
			    	Ext.each(records, function(record, index) {
			    		if (record.get('programType') != 'DO') {
							result +=  record.get('relCount');
							count++;
							total += record.get('relRunCount');
			    		}
			    	});
			    	return total + '/' + result;
			    },
			    summaryRenderer : function(value, meta, record, rowIndex) {
	            	return '<span style="color:black;font-weight:bold">' + value + '</span>';
	            }
		    }],
		    border : false,
		    store : Ext.create('Ext.qualitytest.store.RelationTree'),
		    listeners : {
		    	beforerender : function(tree, eOpts) {
		    	},
		    	beforecelldblclick : function( tree, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
		    		return false;
		    	},
		    	cellclick : function(tree, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		    		sourceModule = _module;
					targetModule = record.get('module');
					linkWay = record.get('relationWay');
					relationType = record.get('relationType');
					relationName = record.get('relationName');
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
		    		_programType = null;
		    		DataAction.openProgramGrid();
		    	}
		    },
			responsiveCls: 'big-20 small-50'
		},
		{
			xtype : 'treepanel',
			minHeight: 350,
			rootVisible : false,
			bodyStyle: {
		        background: 'none'
		    },
		    features : [{
	        	ftype: 'summary'
	        }],
		    columns: [
		    {
				width : 30,
				renderer : function(value, meta, record, rowIndex) {
					meta.style = "background-color:#f6f6f6;";
				}
			},
		    {
				text : 'count1',
				width : 30,
				align : 'center',
				renderer : function(value, meta, record, rowIndex) {
					var color = null;
					if (record.get('programType') == 'DO') {
						color = '#c0c0c0';
					} else {
						var temp = record.get('relRunCount')*100 / record.get('relCount');
						temp = temp.toFixed(2);
						if (temp > 95) {
							color = '#4caf50';
						} else if (temp <= 95 && temp >= 50) {
							color = '#ffc107';
				    	} else {
				    		color = '#e91e63';
				    	}
					}
					meta.style = "background-color:#f6f6f6;";
					return '<i class="x-fa fa-circle" style="color:' + color +'"></i>';
				}
		    },
		    {
				text : 'relationWay',
				width : 28,
				align : 'center',
				dataIndex : 'relationWay',
				renderer : function(value, meta, record, rowIndex) {
					var item = value == 'source' ? 'right' : 'left';
			    	var color = value == 'source' ? 'blue' : 'red';
			    	meta.style = "background-color:#f6f6f6;";
			    	return '<i class="x-fa fa-arrow-' + item + '" style="color:' + color +'"></i>';
				}
		    },
		    {
//		    	xtype : 'treecolumn',
				text : 'realtionText',
				width : 150,
				flex:1,
				dataIndex : 'text',
				summaryType : function(records) {
	            	return '전체';
	            },
	            summaryRenderer : function(value, meta, record, rowIndex) {
	            	return '<span style="color:black;font-weight:bold">전체</span>';
	            },
	            renderer : function(value, meta, record, rowIndex) {
	            	meta.style = "background-color:#f6f6f6;";
	            	return value;
	            }
		    },
		    {
				text : 'programType',
				width : 75,
				align : 'center',
				dataIndex : 'programType',
	            renderer : function(value, meta, record, rowIndex) {
	            	meta.style = "background-color:#f6f6f6;";
	            	return value;
	            }
		    },
		    {
				text : 'count',
				width : 70,
				align : 'center',
				dataIndex : 'relCount',
				renderer : function(value, meta, record, rowIndex) {
					meta.style = "background-color:#f6f6f6;";
					return record.get('relRunCount') + '/' + value;
				},
				summaryType : function(records) {
			    	var result = 0;
			    	var count = 0;
			    	var total = 0;
			    	Ext.each(records, function(record, index) {
			    		if (record.get('programType') != 'DO') {
							result +=  record.get('relCount');
							count++;
							total += record.get('relRunCount');
			    		}
			    	});
			    	return total + '/' + result;
			    },
			    summaryRenderer : function(value, meta, record, rowIndex) {
	            	return '<span style="color:black;font-weight:bold">' + value + '</span>';
	            }
		    }],
//		    columnLines : true,
		    hideHeaders : true,
		    border : false,
		    store : Ext.create('Ext.qualitytest.store.RelationTree'),
		    listeners : {
		    	beforerender : function(tree, eOpts) {
		    	},
		    	beforecelldblclick : function( tree, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
		    		return false;
		    	},
		    	cellclick : function(tree, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		    		sourceModule = _module;
					targetModule = record.get('module');
					linkWay = record.get('relationWay');
					relationType = record.get('relationType');
					relationName = record.get('relationName');
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
		    		_programType = null;
		    		DataAction.openProgramGrid();
		    	}
		    },
			responsiveCls: 'big-20 small-50'
		},
		{
			xtype : 'treepanel',
			minHeight: 350,
			rootVisible : false,
			bodyStyle: {
		        background: 'none'
		    },
		    features : [{
	        	ftype: 'summary'
	        }],
		    columns: [
		    {
				width : 30,
				renderer : function(value, meta, record, rowIndex) {
					meta.style = "background-color:#f6f6f6;";
				}
			},
		    {
				text : 'count1',
				width : 30,
				align : 'center',
				renderer : function(value, meta, record, rowIndex) {
					var color = null;
					if (record.get('programType') == 'DO') {
						color = '#c0c0c0';
					} else {
						var temp = record.get('relRunCount')*100 / record.get('relCount');
						temp = temp.toFixed(2);
						if (temp > 95) {
							color = '#4caf50';
						} else if (temp <= 95 && temp >= 50) {
							color = '#ffc107';
				    	} else {
				    		color = '#e91e63';
				    	}
					}
					meta.style = "background-color:#f6f6f6;";
					return '<i class="x-fa fa-circle" style="color:' + color +'"></i>';
				}
		    },
		    {
				text : 'relationWay',
				width : 28,
				align : 'center',
				dataIndex : 'relationWay',
				renderer : function(value, meta, record, rowIndex) {
					var item = value == 'source' ? 'right' : 'left';
			    	var color = value == 'source' ? 'blue' : 'red';
			    	meta.style = "background-color:#f6f6f6;";
			    	return '<i class="x-fa fa-arrow-' + item + '" style="color:' + color +'"></i>';
				}
		    },
		    {
//		    	xtype : 'treecolumn',
				text : 'realtionText',
				width : 150,
				flex:1,
				dataIndex : 'text',
				summaryType : function(records) {
	            	return '전체';
	            },
	            summaryRenderer : function(value, meta, record, rowIndex) {
	            	return '<span style="color:black;font-weight:bold">전체</span>';
	            },
	            renderer : function(value, meta, record, rowIndex) {
	            	meta.style = "background-color:#f6f6f6;";
	            	return value;
	            }
		    },
		    {
				text : 'programType',
				width : 75,
				align : 'center',
				dataIndex : 'programType',
	            renderer : function(value, meta, record, rowIndex) {
	            	meta.style = "background-color:#f6f6f6;";
	            	return value;
	            }
		    },
		    {
				text : 'count',
				width : 70,
				align : 'center',
				dataIndex : 'relCount',
				renderer : function(value, meta, record, rowIndex) {
					meta.style = "background-color:#f6f6f6;";
					return record.get('relRunCount') + '/' + value;
				},
				summaryType : function(records) {
			    	var result = 0;
			    	var count = 0;
			    	var total = 0;
			    	Ext.each(records, function(record, index) {
			    		if (record.get('programType') != 'DO') {
							result +=  record.get('relCount');
							count++;
							total += record.get('relRunCount');
			    		}
			    	});
			    	return total + '/' + result;
			    },
			    summaryRenderer : function(value, meta, record, rowIndex) {
	            	return '<span style="color:black;font-weight:bold">' + value + '</span>';
	            }
		    }],
//		    columnLines : true,
		    hideHeaders : true,
		    border : false,
		    store : Ext.create('Ext.qualitytest.store.RelationTree'),
		    listeners : {
		    	beforerender : function(tree, eOpts) {
		    	},
		    	beforecelldblclick : function( tree, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
		    		return false;
		    	},
		    	cellclick : function(tree, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		    		sourceModule = _module;
					targetModule = record.get('module');
					linkWay = record.get('relationWay');
					relationType = record.get('relationType');
					relationName = record.get('relationName');
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
		    		_programType = 'SJ';
		    		DataAction.openProgramGrid();
		    	}
		    },
			responsiveCls: 'big-20 small-50'
		},
		{
			xtype : 'treepanel',
			minHeight: 350,
			rootVisible : false,
			bodyStyle: {
		        background: 'none'
		    },
		    features : [{
	        	ftype: 'summary'
	        }],
		    columns: [
		    {
				width : 30,
				renderer : function(value, meta, record, rowIndex) {
					meta.style = "background-color:#f6f6f6;";
				}
			},
		    {
				text : 'count1',
				width : 30,
				align : 'center',
				renderer : function(value, meta, record, rowIndex) {
					var color = null;
					if (record.get('programType') == 'DO') {
						color = '#c0c0c0';
					} else {
						var temp = record.get('relRunCount')*100 / record.get('relCount');
						temp = temp.toFixed(2);
						if (temp > 95) {
							color = '#4caf50';
						} else if (temp <= 95 && temp >= 50) {
							color = '#ffc107';
				    	} else {
				    		color = '#e91e63';
				    	}
					}
					meta.style = "background-color:#f6f6f6;";
					return '<i class="x-fa fa-circle" style="color:' + color +'"></i>';
				}
		    },
		    {
				text : 'relationWay',
				width : 28,
				align : 'center',
				dataIndex : 'relationWay',
				renderer : function(value, meta, record, rowIndex) {
					var item = value == 'source' ? 'right' : 'left';
			    	var color = value == 'source' ? 'blue' : 'red';
			    	meta.style = "background-color:#f6f6f6;";
			    	return '<i class="x-fa fa-arrow-' + item + '" style="color:' + color +'"></i>';
				}
		    },
		    {
//		    	xtype : 'treecolumn',
				text : 'realtionText',
				width : 150,
				flex:1,
				dataIndex : 'text',
				summaryType : function(records) {
	            	return '전체';
	            },
	            summaryRenderer : function(value, meta, record, rowIndex) {
	            	return '<span style="color:black;font-weight:bold">전체</span>';
	            },
	            renderer : function(value, meta, record, rowIndex) {
	            	meta.style = "background-color:#f6f6f6;";
	            	return value;
	            }
		    },
		    {
				text : 'programType',
				width : 75,
				align : 'center',
				dataIndex : 'programType',
	            renderer : function(value, meta, record, rowIndex) {
	            	meta.style = "background-color:#f6f6f6;";
	            	return value;
	            }
		    },
		    {
				text : 'count',
				width : 70,
				align : 'center',
				dataIndex : 'relCount',
				renderer : function(value, meta, record, rowIndex) {
					meta.style = "background-color:#f6f6f6;";
					return record.get('relRunCount') + '/' + value;
				},
				summaryType : function(records) {
			    	var result = 0;
			    	var count = 0;
			    	var total = 0;
			    	Ext.each(records, function(record, index) {
			    		if (record.get('programType') != 'DO') {
							result +=  record.get('relCount');
							count++;
							total += record.get('relRunCount');
			    		}
			    	});
			    	return total + '/' + result;
			    },
			    summaryRenderer : function(value, meta, record, rowIndex) {
	            	return '<span style="color:black;font-weight:bold">' + value + '</span>';
	            }
		    }],
//		    columnLines : true,
		    hideHeaders : true,
		    border : false,
		    store : Ext.create('Ext.qualitytest.store.RelationTree'),
		    listeners : {
		    	beforerender : function(tree, eOpts) {
		    	},
		    	beforecelldblclick : function( tree, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
		    		return false;
		    	},
		    	cellclick : function(tree, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		    		sourceModule = _module;
					targetModule = record.get('module');
					linkWay = record.get('relationWay');
					relationType = record.get('relationType');
					relationName = record.get('relationName');
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
		    		_programType = 'BOC';
		    		DataAction.openProgramGrid();
		    	}
		    },
			responsiveCls: 'big-20 small-50'
		},
		{
			xtype : 'treepanel',
			minHeight: 350,
			rootVisible : false,
			bodyStyle: {
		        background: 'none'
		    },
		    features : [{
	        	ftype: 'summary'
	        }],
		    columns: [
		    {
				width : 30,
				renderer : function(value, meta, record, rowIndex) {
					meta.style = "background-color:#f6f6f6;";
				}
			},
		    {
				text : 'count1',
				width : 30,
				align : 'center',
				renderer : function(value, meta, record, rowIndex) {
					var color = null;
					if (record.get('programType') == 'DO') {
						color = '#c0c0c0';
					} else {
						var temp = record.get('relRunCount')*100 / record.get('relCount');
						temp = temp.toFixed(2);
						if (temp > 95) {
							color = '#4caf50';
						} else if (temp <= 95 && temp >= 50) {
							color = '#ffc107';
				    	} else {
				    		color = '#e91e63';
				    	}
					}
					meta.style = "background-color:#f6f6f6;";
					return '<i class="x-fa fa-circle" style="color:' + color +'"></i>';
				}
		    },
		    {
				text : 'relationWay',
				width : 28,
				align : 'center',
				dataIndex : 'relationWay',
				renderer : function(value, meta, record, rowIndex) {
					var item = value == 'source' ? 'right' : 'left';
			    	var color = value == 'source' ? 'blue' : 'red';
			    	meta.style = "background-color:#f6f6f6;";
			    	return '<i class="x-fa fa-arrow-' + item + '" style="color:' + color +'"></i>';
				}
		    },
		    {
//		    	xtype : 'treecolumn',
				text : 'realtionText',
				width : 150,
				flex:1,
				dataIndex : 'text',
				summaryType : function(records) {
	            	return '전체';
	            },
	            summaryRenderer : function(value, meta, record, rowIndex) {
	            	return '<span style="color:black;font-weight:bold">전체</span>';
	            },
	            renderer : function(value, meta, record, rowIndex) {
	            	meta.style = "background-color:#f6f6f6;";
	            	return value;
	            }
		    },
		    {
				text : 'programType',
				width : 75,
				align : 'center',
				dataIndex : 'programType',
	            renderer : function(value, meta, record, rowIndex) {
	            	meta.style = "background-color:#f6f6f6;";
	            	return value;
	            }
		    },
		    {
				text : 'count',
				width : 70,
				align : 'center',
				dataIndex : 'relCount',
				renderer : function(value, meta, record, rowIndex) {
					meta.style = "background-color:#f6f6f6;";
					return record.get('relRunCount') + '/' + value;
				},
				summaryType : function(records) {
			    	var result = 0;
			    	var count = 0;
			    	var total = 0;
			    	Ext.each(records, function(record, index) {
			    		if (record.get('programType') != 'DO') {
							result +=  record.get('relCount');
							count++;
							total += record.get('relRunCount');
			    		}
			    	});
			    	return total + '/' + result;
			    },
			    summaryRenderer : function(value, meta, record, rowIndex) {
	            	return '<span style="color:black;font-weight:bold">' + value + '</span>';
	            }
		    }],
//		    columnLines : true,
		    hideHeaders : true,
		    border : false,
		    store : Ext.create('Ext.qualitytest.store.RelationTree'),
		    listeners : {
		    	beforerender : function(tree, eOpts) {
		    	},
		    	beforecelldblclick : function( tree, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
		    		return false;
		    	},
		    	cellclick : function(tree, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		    		sourceModule = _module;
					targetModule = record.get('module');
					linkWay = record.get('relationWay');
					relationType = record.get('relationType');
					relationName = record.get('relationName');
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
		    		_programType = 'BO';
		    		DataAction.openProgramGrid();
		    	}
		    },
			responsiveCls: 'big-20 small-50'
		}];
	}	
};
Ext.define('Ext.qualitytest.view.Viewport', {
    extend: 'Ext.Viewport',    
    overflowY : 'auto',
    requires: [
       'Ext.qualitytest.view.QualityBasePanel',
       'Ext.qualitytest.view.QualityTestPanel',
       'Ext.qualitytest.view.ProgramGrid',
       'Ext.qualitytest.view.ProgramPieChart',
       'Ext.qualitytest.view.ProgramOrgGrid',
       'Ext.ux.BoxReorderer'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'qualitybasepanel'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});
