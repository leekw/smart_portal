package net.smart.web.quality.dao;

import java.util.List;

import net.smart.common.support.dao.SmartBatchSqlSessionDaoSupport;
import net.smart.web.domain.quality.NotUsedStat;
import net.smart.web.domain.quality.QualityDetail;
import net.smart.web.domain.quality.QualityInterface;
import net.smart.web.domain.quality.QualityRel;
import net.smart.web.domain.quality.QualitySummary;
import net.smart.web.domain.quality.QualityTestProgram;

import org.springframework.stereotype.Repository;

@Repository
public class QuailtyBatchDaoImpl extends SmartBatchSqlSessionDaoSupport implements QuailtyBatchDao  {

	@Override
	public void addQualityDetail(List<QualityDetail> params) {
		for (QualityDetail param : params) {
			getSqlSession().insert("quality.insertQualityDetail", param);
		}
	}

	@Override
	public void removeQualityDetail(QualityDetail param) {
		getSqlSession().delete("quality.deleteQualityDetail", param);
	}

	@Override
	public void addQualityInfo(List<QualitySummary> param) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addQuailtyInfo(QualityDetail param) {
		getSqlSession().insert("quality.insertQualityInfo", param);
	}

	@Override
	public void removeQualityInfo(QualityDetail param) {
		getSqlSession().delete("quality.deleteQualityInfo", param);
	}
	
	@Override
	public void addNotUsedStat(List<NotUsedStat> params) {
//		for (NotUsedStat param : params) {
//			getSqlSession().insert("quality.insertNotUsedStat", param);
//		}
	}

	@Override
	public void removeQualityRelation(QualityDetail param) {
		getSqlSession().delete("quality.deleteQualtiyRelation", param);
	}

	@Override
	public void addQualityRelation(List<QualityRel> params) {
		for (QualityRel param : params) {
			getSqlSession().insert("quality.insertQualityRelation", param);
		}
	}

	@Override
	public void modifyQualityRelation(QualityDetail param) {
		getSqlSession().update("quality.updateQualtiyRelation", param);
	}

	@Override
	public void removeProgramRelation(QualityDetail param) {
		getSqlSession().delete("quality.deleteProgramRelation", param);
	}

	@Override
	public void addProgramRelation(List<QualityRel> params) {
		for (QualityRel param : params) {
			getSqlSession().insert("quality.insertProgramRelation", param);
		}
	}

	@Override
	public void removeQualityInterface(QualityDetail param) {
		getSqlSession().delete("quality.deleteQualityInterface", param);
	}

	@Override
	public void addQualityInterface(List<QualityInterface> params) {
		for (QualityInterface param : params) {
			getSqlSession().insert("quality.insertQualityInterface", param);
		}
	}

	@Override
	public void removeQualityTestProgram(QualityDetail param) {
		getSqlSession().delete("quality.deleteQualityTestProgram", param);
	}

	@Override
	public void addQualityTestProgram(List<QualityTestProgram> params) {
		for (QualityTestProgram param : params) {
			getSqlSession().insert("quality.insertQualityTestProgram", param);
		}
	}

}
