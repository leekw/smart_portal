package net.smart.web.analysis.dao;

import java.util.List;

import net.smart.common.support.dao.BasedSqlSessionDaoSupport;
import net.smart.web.domain.analysis.*;

import org.springframework.stereotype.Repository;

@Repository
public class AnalysisDaoImpl extends BasedSqlSessionDaoSupport implements AnalysisDao {

	@Override
	public List<AnalysisRaw> getAnalysisRawList(AnalysisRaw param) {
		return getSqlSession().selectList("analysis.selectAnalysisRawList", param);
	}

	@Override
	public List<AnalysisTop> getAnalysisTopList(AnalysisTop param) {
		return getSqlSession().selectList("analysis.selectAnalysisTopList", param);
	}

	@Override
	public List<AnalysisSummary> getAnalysisSummaryList(AnalysisSummary param) {
		return getSqlSession().selectList("analysis.selectAnalysisSummaryList", param);
	}

	@Override
	public Integer getAnalysisMaxOrderNo(AnalysisRaw param) {
		return getSqlSession().selectOne("analysis.selectAnalysisMaxOrderNo", param);
	}

	@Override
	public void addAnalysisRaw(List<AnalysisRaw> params) {
		for (AnalysisRaw param : params) {
			getSqlSession().insert("analysis.insertAnalysisRaw", param);
		}
	}

	@Override
	public List<AnalysisResult> getAnalysisResultList(AnalysisRaw param) {
		return getSqlSession().selectList("analysis.selectAnalysisResultList", param);
	}

	@Override
	public void addAnalysisResult(AnalysisResult param) {
		getSqlSession().insert("analysis.insertAnalysisResult", param);
	}

	@Override
	public void modifyAnalysisResult(AnalysisResult param) {
		getSqlSession().update("analysis.updateAnalysisResult", param);
	}

	@Override
	public void removeAnalysisSummary(AnalysisSummary param) {
		getSqlSession().delete("analysis.deleteAnalysisSummary", param);
	}

	@Override
	public void addAnalysisSummary(AnalysisSummary param) {
		getSqlSession().insert("analysis.insertAnalysisSummary", param);
	}

	@Override
	public List<AnalysisSummary> getAnalysisSummaryByWorkTarget(AnalysisSummary param) {
		return getSqlSession().selectList("analysis.selectAnalysisSummaryByWorkTarget", param);
	}

	@Override
	public void removeAnalysisTop(AnalysisSummary param) {
		getSqlSession().delete("analysis.deleteAnalysisTop", param);
	}

	@Override
	public void addAnalysisTop(AnalysisSummary param) {
		getSqlSession().insert("analysis.insertAnalysisTop", param);
	}

	@Override
	public void saveAnalysisSummary(AnalysisSummary param) {
		getSqlSession().update("analysis.updateAnalysisSummary", param);
	}

	@Override
	public void saveAnalysisSource(AnalysisSource param) {
		getSqlSession().insert("analysis.insertAnalysisSource", param);
	}

	@Override
	public List<AnalysisSource> getAnalysisSourceList(AnalysisSource param) {
		return getSqlSession().selectList("analysis.selectAnalysisSourceList",param);
	}

}
