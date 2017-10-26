package net.smart.web.analysis.dao;

import java.util.List;

import net.smart.web.domain.analysis.AnalysisRaw;
import net.smart.web.domain.analysis.AnalysisResult;
import net.smart.web.domain.analysis.AnalysisSummary;
import net.smart.web.domain.analysis.AnalysisTop;

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
}
