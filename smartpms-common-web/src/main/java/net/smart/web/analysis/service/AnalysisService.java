package net.smart.web.analysis.service;

import java.util.List;

import net.smart.web.domain.analysis.AnalysisRaw;
import net.smart.web.domain.analysis.AnalysisResult;
import net.smart.web.domain.analysis.AnalysisSummary;
import net.smart.web.domain.analysis.AnalysisTop;

public interface AnalysisService {
	public List<AnalysisRaw> getAnalysisRawList(AnalysisRaw param);
	public List<AnalysisResult> getAnalysisResultList(AnalysisResult param);
	public List<AnalysisTop> getAnalysisTopList(AnalysisTop param);
	public List<AnalysisSummary> getAnalysisSummaryList(AnalysisSummary param);
	public void parseExcelByRawData(AnalysisRaw param);
	public void addAnalysisResult(AnalysisResult param);
	public void addAnalysisSummary();
	public void saveAnalysisSummary(AnalysisSummary param);
}
