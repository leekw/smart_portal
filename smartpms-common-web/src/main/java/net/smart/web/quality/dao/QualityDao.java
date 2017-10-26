package net.smart.web.quality.dao;

import java.util.List;

import net.smart.web.domain.quality.InterfaceDetail;
import net.smart.web.domain.quality.InterfaceSummary;
import net.smart.web.domain.quality.NotUsedStat;
import net.smart.web.domain.quality.QualityDetail;
import net.smart.web.domain.quality.QualityHistorySummary;
import net.smart.web.domain.quality.QualityProgramType;
import net.smart.web.domain.quality.QualitySummary;
import net.smart.web.domain.quality.QualityTest;

public interface QualityDao {
	
	public List<QualitySummary> getQualitySummaryList(QualitySummary param);
	
	public List<QualitySummary> getQualityDeveloperList(QualitySummary param);
	
	public List<QualitySummary> getQualityProgramTypeList(QualityProgramType param);
	
	public List<QualityDetail> getQualityDetailList(QualityDetail param);
	
	public List<QualitySummary> getQaulityDetailListByProgramType(QualityDetail param);
	
	public List<QualitySummary> getQualityDeveloperTopList(QualitySummary param);
	
	public List<QualityHistorySummary> getQualityHistorySummary(QualityHistorySummary param);
	
	public List<QualityHistorySummary> getQualityHistoryChart(QualityHistorySummary param);
	
	public NotUsedStat getMaxNotUsedStat();
	
	public List<NotUsedStat> getNotUsedStatByLocal(NotUsedStat param);
	
	public List<InterfaceSummary> getQualityInterfaceSummary(InterfaceSummary param);
	
	public List<InterfaceDetail> getQualityInterfaceList(InterfaceDetail param);
	
	public List<QualityTest> getQualityTestProgramCount(QualityTest param);
	
	public List<QualityTest> getQualtiyTestRealtion(QualityTest param);

	public List<QualityTest> getQualtiyTestRealtionChart(QualityTest param);
	
	public List<QualityTest> getQualtiyTestRealtionHistChart(QualityTest param);
	
	public List<QualityTest> getQualityTestRelationChangeChart(QualityTest param);
	
	public List<InterfaceSummary> getQualityInterfaceSummaryBySystem(InterfaceSummary param);
}
