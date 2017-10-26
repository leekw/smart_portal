package net.smart.web.quality.service;

import java.util.List;
import java.util.Map;

import net.smart.web.domain.quality.InterfaceDetail;
import net.smart.web.domain.quality.InterfaceSummary;
import net.smart.web.domain.quality.QualityDetail;
import net.smart.web.domain.quality.QualityHistoryChart;
import net.smart.web.domain.quality.QualityHistorySummary;
import net.smart.web.domain.quality.QualityProgramType;
import net.smart.web.domain.quality.QualitySummary;
import net.smart.web.domain.quality.QualityTest;
import net.smart.web.domain.quality.QualtiyTestChart;

public interface QualityService {
	
	public List<QualitySummary> getQualitySummaryList(QualitySummary param);

	public List<QualitySummary> getQualityDeveloperList(QualitySummary param);
	
	public List<QualityProgramType> getQualityProgramTypeList(QualityProgramType param);
	
	public void addQualityData();
	
	public List<QualityDetail> getQualityDetailList(QualityDetail param);
	
	public Map<String, QualitySummary> getQaulityDetailListByProgramType(QualityDetail param);
	
	public List<QualitySummary> getQualityDeveloperTopList(QualitySummary param);
	
	public List<QualityHistorySummary> getQualityHistorySummary(QualityHistorySummary param);
	
	public List<QualityHistoryChart> getQualityHistoryChart(QualityHistorySummary param);
	
	public String getSvnFileInfo(String svnFilePath);
	
	public List<InterfaceSummary> getQualityInterfaceSummary(InterfaceSummary param);
	
	public List<InterfaceDetail> getQualityInterfaceList(InterfaceDetail param);
	
	public List<QualityTest> getQualityTestProgramCount(QualityTest param);
	
	public List<QualityTest> getQualityTestProgramCountChart(QualityTest param);
	
	public List<QualityTest> getQualtiyTestRealtion(QualityTest param);
	
	public List<QualityTest> getQualtiyTestRealtionChart(QualityTest param);
	
	public List<QualityTest> getQualtiyTestRealtionHistChart(QualityTest param);
	
	public List<QualtiyTestChart> getQualityTestRelationChangeChart(QualityTest param);
	
}
