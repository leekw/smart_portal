package net.smart.web.analysis.conroller;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.annotation.IntegrationResponse;
import net.smart.core.analyzer.stat.StaticAnalyzer;
import net.smart.web.analysis.service.AnalysisService;
import net.smart.web.domain.analysis.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
public class AnalysisController {
	
	@Autowired
	private AnalysisService analysisService;

	@Autowired
	private StaticAnalyzer analyzer;

	@RequestMapping(value = "/analysis/raw/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="analaysisraws")
	public List<AnalysisRaw> getAnalysisRawList(@IntegrationRequest AnalysisRaw param) {
		return analysisService.getAnalysisRawList(param);
	}
	
	@RequestMapping(value = "/analysis/result/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="analaysisresults")
	public List<AnalysisResult> getAnalysisResultList(@IntegrationRequest AnalysisResult param) {
		return  analysisService.getAnalysisResultList(param);
	}
	
	@RequestMapping(value = "/analysis/top/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="analaysistops")
	public List<AnalysisTop> getAnalysisTopList(@IntegrationRequest AnalysisTop param) {
		return  analysisService.getAnalysisTopList(param);
	}
	
	@RequestMapping(value = "/analysis/summary/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="analaysissummarys")
	public List<AnalysisSummary> getAnalysisSummaryList(@IntegrationRequest AnalysisSummary param) {
		return  analysisService.getAnalysisSummaryList(param);
	}
	
	
	@RequestMapping(value = "/analysis/excel/parse.{metadataType}", method = RequestMethod.POST)
	public void parseExcel(@IntegrationRequest AnalysisRaw param) {
		analysisService.parseExcelByRawData(param);
	}
	
	@RequestMapping(value = "/analysis/result/save.{metadataType}", method = RequestMethod.POST)
	public void saveAnalysisResult(@IntegrationRequest AnalysisResult param) {
		analysisService.addAnalysisResult(param);
	}
	
	@RequestMapping(value = "/analysis/summary/save.{metadataType}", method = RequestMethod.POST)
	public void saveAnalysisSummaryStatus(@IntegrationRequest AnalysisSummary param) {
		analysisService.saveAnalysisSummary(param);
	}



	@RequestMapping(value = "/analysis/source/save.{metadataType}", method = RequestMethod.POST)
	public void saveAnalysisSourceFile(@IntegrationRequest AnalysisSource param) {
		analysisService.saveAnalysisSource(param);
	}

	@RequestMapping(value = "/analysis/source/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="analysissources")
	public List<AnalysisSource> getAnalysisSourceList(@IntegrationRequest AnalysisSource param) {
		return  analysisService.getAnalysisSourceList(param);
	}

	@RequestMapping(value = "/analysis/run.{metadataType}", method = RequestMethod.GET)
	public void runAnalysis() {
		analyzer.analyze();
	}

	@RequestMapping(value = "/analysis/source/result/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="analysissourceresult")
	public List<AnalysisSourceResult> getAnalysisSourceResultList(@IntegrationRequest AnalysisSourceResult param) {
		return  analysisService.getAnalysisSourceResultList(param);
	}

	@RequestMapping(value = "/analysis/source/result/operation/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="analysissourceoperations")
	public List<AnalysisSourceOperation> getAnalysisSourceOperationList(@IntegrationRequest AnalysisSourceOperation param) {
		return  analysisService.getAnalysisSourceOperationList(param);
	}


	@RequestMapping(value = "/analysis/source/low/lank/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="analysissourceresults")
	public List<AnalysisSourceResult> getAnalysisSourceRowRankList(@IntegrationRequest AnalysisSourceResult param) {
		return  analysisService.getAnalysisSourceRowRankList(param);
	}

	@RequestMapping(value = "/analysis/source/high/lank/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="analysissourceresults")
	public List<AnalysisSourceResult> getAnalysisSourceHighRankList(@IntegrationRequest AnalysisSourceResult param) {
		return  analysisService.getAnalysisSourceHighRankList(param);
	}

}
