package net.smart.web.quality.dao;

import java.util.List;

import net.smart.web.domain.quality.QualityCoverage;

public interface QualityCoverageDao {
	
	public List<QualityCoverage> getCodeCoverageDataAll(QualityCoverage param);

}
