package net.smart.web.quality.dao;

import java.util.List;

import net.smart.web.domain.quality.NotUsedStat;
import net.smart.web.domain.quality.QualityDetail;
import net.smart.web.domain.quality.QualityInterface;
import net.smart.web.domain.quality.QualityRel;
import net.smart.web.domain.quality.QualitySummary;
import net.smart.web.domain.quality.QualityTestProgram;

public interface QuailtyBatchDao {
	
	public void addQualityDetail(List<QualityDetail> params);
	
	public void removeQualityDetail(QualityDetail param);
	
	public void addQualityInfo(List<QualitySummary> param);
	
	public void addQuailtyInfo(QualityDetail param);
	
	public void removeQualityInfo(QualityDetail param);
	
	public void addNotUsedStat(List<NotUsedStat> params);
	
	public void removeQualityRelation(QualityDetail param);
	
	public void addQualityRelation(List<QualityRel> param);
	
	public void modifyQualityRelation(QualityDetail param);
	
	public void removeProgramRelation(QualityDetail param);
	
	public void addProgramRelation(List<QualityRel> param);
	
	public void removeQualityInterface(QualityDetail param);
	
	public void addQualityInterface(List<QualityInterface> param);
	
	public void removeQualityTestProgram(QualityDetail param);
	
	public void addQualityTestProgram(List<QualityTestProgram> params);
}
