package net.smart.web.analysis.service;

import java.util.List;

import net.smart.web.domain.analysis.*;


public interface AnalysisService {
	public List<AnalysisRaw> getAnalysisRawList(AnalysisRaw param);
	public List<AnalysisResult> getAnalysisResultList(AnalysisResult param);
	public List<AnalysisTop> getAnalysisTopList(AnalysisTop param);
	public List<AnalysisSummary> getAnalysisSummaryList(AnalysisSummary param);
	public void parseExcelByRawData(AnalysisRaw param);
	public void addAnalysisResult(AnalysisResult param);
	public void addAnalysisSummary();
	public void saveAnalysisSummary(AnalysisSummary param);
	public void saveAnalysisSource(AnalysisSource param);
	public List<AnalysisSource> getAnalysisSourceList(AnalysisSource param) ;
	public List<AnalysisSourceResult> getAnalysisSourceResultList(AnalysisSourceResult param) ;
	public List<AnalysisSourceOperation> getAnalysisSourceOperationList(AnalysisSourceOperation param) ;
	public List<AnalysisSourceResult> getAnalysisSourceRowRankList(AnalysisSourceResult param) ;
	public List<AnalysisSourceResult> getAnalysisSourceHighRankList(AnalysisSourceResult param) ;



}
