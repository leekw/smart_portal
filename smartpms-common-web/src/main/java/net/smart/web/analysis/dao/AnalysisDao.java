package net.smart.web.analysis.dao;

import java.util.List;

import net.smart.web.domain.analysis.*;

public interface AnalysisDao {
	public List<AnalysisRaw> getAnalysisRawList(AnalysisRaw param);
	public List<AnalysisTop> getAnalysisTopList(AnalysisTop param);
	public List<AnalysisSummary> getAnalysisSummaryList(AnalysisSummary param);
	public Integer getAnalysisMaxOrderNo(AnalysisRaw param);
	public void addAnalysisRaw(List<AnalysisRaw> params);
	public List<AnalysisResult> getAnalysisResultList(AnalysisRaw param);
	public void modifyAnalysisResult(AnalysisResult param);
	public void addAnalysisResult(AnalysisResult param);
	public void removeAnalysisSummary(AnalysisSummary param);
	public void addAnalysisSummary(AnalysisSummary param);
	public List<AnalysisSummary> getAnalysisSummaryByWorkTarget(AnalysisSummary param);
	public void removeAnalysisTop(AnalysisSummary param);
	public void addAnalysisTop(AnalysisSummary param);
	public void saveAnalysisSummary(AnalysisSummary param);
	public void saveAnalysisSource(AnalysisSource param);
	public List<AnalysisSource> getAnalysisSourceList(AnalysisSource param);
	public List<AnalysisSourceResult> getAnalysisSourceResultList(AnalysisSourceResult param);
	public List<AnalysisSourceOperation> getAnalysisSourceOperationList(AnalysisSourceOperation param);
	public List<AnalysisSourceResult> getAnalysisSourceRowRankList(AnalysisSourceResult param);
	public List<AnalysisSourceResult> getAnalysisSourceHighRankList(AnalysisSourceResult param);
	public AnalysisSourceResult getAnalysisSourceCode(AnalysisSourceResult param);


}
