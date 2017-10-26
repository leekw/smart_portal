package net.smart.web.quality.dao;

import java.util.List;

import net.smart.common.support.dao.CoverageSqlSessionDaoSupport;
import net.smart.web.domain.quality.QualityCoverage;

import org.springframework.stereotype.Repository;

@Repository
public class QualityCoverageDaoImpl extends CoverageSqlSessionDaoSupport implements QualityCoverageDao  {

	@Override
	public List<QualityCoverage> getCodeCoverageDataAll(QualityCoverage param) {
		return getSqlSession().selectList("quality.selectQulaityOperationCoverageList", param);
	}

}
