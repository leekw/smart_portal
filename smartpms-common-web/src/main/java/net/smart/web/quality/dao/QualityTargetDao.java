package net.smart.web.quality.dao;

import java.util.List;

import net.smart.web.domain.quality.QualityCoverage;
import net.smart.web.domain.quality.QualityDetail;
import net.smart.web.domain.quality.QualityRelation;
import net.smart.web.domain.quality.QualitySvnFile;
import net.smart.web.domain.quality.QualityTestcase;

public interface QualityTargetDao {
	
	public List<QualityDetail> getQualityTargetByProgramList(QualityDetail param);
	
	public List<QualityCoverage> getQualityTargetByCoverageList(QualityCoverage param);
	
	public List<QualityTestcase> getTestcaseList(QualityTestcase param);
	
	public List<QualitySvnFile> getSvnFileList(QualitySvnFile param);
	
	public List<QualityRelation> getProgramRelationList(QualityRelation param);
	
	public List<QualityRelation> getProgramRelationListByData(QualityRelation param);
	
	public List<QualityCoverage> getQualityCheckTargetExcludeClass(QualityCoverage param);
	
	public List<QualityCoverage> getQualityServiceTestHistory(QualityCoverage param);

}
