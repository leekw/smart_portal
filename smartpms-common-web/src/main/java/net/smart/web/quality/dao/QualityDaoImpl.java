package net.smart.web.quality.dao;

import java.util.List;

import net.smart.common.support.dao.SmartSqlSessionDaoSupport;
import net.smart.web.domain.quality.InterfaceDetail;
import net.smart.web.domain.quality.InterfaceSummary;
import net.smart.web.domain.quality.NotUsedStat;
import net.smart.web.domain.quality.QualityDetail;
import net.smart.web.domain.quality.QualityHistorySummary;
import net.smart.web.domain.quality.QualityProgramType;
import net.smart.web.domain.quality.QualitySummary;
import net.smart.web.domain.quality.QualityTest;

import org.springframework.stereotype.Repository;

@Repository
public class QualityDaoImpl extends SmartSqlSessionDaoSupport implements QualityDao{

	@Override
	public List<QualitySummary> getQualitySummaryList(QualitySummary param) {
		return getSqlSession().selectList("quality.selectQualitySummaryList", param);
	}

	@Override
	public List<QualitySummary> getQualityDeveloperList(QualitySummary param) {
		return getSqlSession().selectList("quality.selectQualityDeveloperList", param);
	}

	@Override
	public List<QualitySummary> getQualityProgramTypeList(QualityProgramType param) {
		return getSqlSession().selectList("quality.selectQualityProgramTypeList", param);
	}

	@Override
	public List<QualityDetail> getQualityDetailList(QualityDetail param) {
		return getSqlSession().selectList("quality.selectQualityDetailList", param);
	}

	@Override
	public List<QualitySummary> getQualityDeveloperTopList(QualitySummary param) {
		return getSqlSession().selectList("quality.selectQualityDeveloperTopList", param);
	}

	@Override
	public List<QualityHistorySummary> getQualityHistorySummary(QualityHistorySummary param) {
		return getSqlSession().selectList("quality.selectQualityHistorySummary", param);
	}

	@Override
	public List<QualityHistorySummary> getQualityHistoryChart(QualityHistorySummary param) {
		return getSqlSession().selectList("quality.selectQualityHistoryChart", param);
	}

	@Override
	public NotUsedStat getMaxNotUsedStat() {
		return getSqlSession().selectOne("quality.selectMaxNotUsedStat");
	}

	@Override
	public List<NotUsedStat> getNotUsedStatByLocal(NotUsedStat param) {
		return getSqlSession().selectList("quality.selectNotUsedStatByLocal", param);
	}

	@Override
	public List<QualitySummary> getQaulityDetailListByProgramType(QualityDetail param) {
		return getSqlSession().selectList("quality.selectQaulityDetailListByProgramType", param);
	}

	@Override
	public List<InterfaceSummary> getQualityInterfaceSummary(InterfaceSummary param) {
		return getSqlSession().selectList("quality.selectQualityInterfaceSummary", param);
	}

	@Override
	public List<InterfaceDetail> getQualityInterfaceList(InterfaceDetail param) {
		return getSqlSession().selectList("quality.selectQualityInterfaceList", param);
	}

	@Override
	public List<QualityTest> getQualityTestProgramCount(QualityTest param) {
		return getSqlSession().selectList("quality.selectQualityTestProgramCount", param);
	}

	@Override
	public List<QualityTest> getQualtiyTestRealtion(QualityTest param) {
		return getSqlSession().selectList("quality.selectQualtiyTestRealtion", param);
	}

	@Override
	public List<QualityTest> getQualtiyTestRealtionChart(QualityTest param) {
		return getSqlSession().selectList("quality.selectQualtiyTestRealtionChart", param);
	}

	@Override
	public List<QualityTest> getQualtiyTestRealtionHistChart(QualityTest param) {
		return getSqlSession().selectList("quality.selectQualtiyTestRealtionHistChart", param);
	}

	@Override
	public List<QualityTest> getQualityTestRelationChangeChart(QualityTest param) {
		return getSqlSession().selectList("quality.selectQualityTestRelationChangeChart", param);
	}

	@Override
	public List<InterfaceSummary> getQualityInterfaceSummaryBySystem(InterfaceSummary param) {
		return getSqlSession().selectList("quality.selectQualityInterfaceSummaryBySystem", param);
	}

}
