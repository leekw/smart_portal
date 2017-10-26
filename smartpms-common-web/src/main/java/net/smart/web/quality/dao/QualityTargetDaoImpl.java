package net.smart.web.quality.dao;

import java.util.List;

import net.smart.common.support.dao.PmssRealSqlSessionDaoSupport;
import net.smart.web.domain.quality.QualityCoverage;
import net.smart.web.domain.quality.QualityDetail;
import net.smart.web.domain.quality.QualityRelation;
import net.smart.web.domain.quality.QualitySvnFile;
import net.smart.web.domain.quality.QualityTestcase;

import org.springframework.stereotype.Repository;

@Repository
public class QualityTargetDaoImpl extends PmssRealSqlSessionDaoSupport implements QualityTargetDao  {

	@Override
	public List<QualityDetail> getQualityTargetByProgramList(QualityDetail param) {
		return getSqlSession().selectList("quality.selectQualityTargetByProgramList", param);
	}

	@Override
	public List<QualityCoverage> getQualityTargetByCoverageList(QualityCoverage param) {
		return getSqlSession().selectList("quality.selectQualityTargetByCoverageList", param);
	}

	@Override
	public List<QualityTestcase> getTestcaseList(QualityTestcase param) {
		return getSqlSession().selectList("quality.selectTestcaseList", param);
	}

	@Override
	public List<QualitySvnFile> getSvnFileList(QualitySvnFile param) {
		return getSqlSession().selectList("quality.selectSvnFileList", param);
	}

	@Override
	public List<QualityRelation> getProgramRelationList(QualityRelation param) {
		return getSqlSession().selectList("quality.selectProgramRelationList", param);
	}

	@Override
	public List<QualityRelation> getProgramRelationListByData(QualityRelation param) {
		return getSqlSession().selectList("quality.selectProgramRelationListByData", param);
	}

	@Override
	public List<QualityCoverage> getQualityCheckTargetExcludeClass(QualityCoverage param) {
		return getSqlSession().selectList("quality.selectQualityCheckTargetExcludeClass", param);
	}

	@Override
	public List<QualityCoverage> getQualityServiceTestHistory(QualityCoverage param) {
		return getSqlSession().selectList("quality.selectQualityServiceTestHistory", param);
	}


}
