package net.smart.web.sample.dao;

import java.util.List;

import net.smart.common.support.dao.SmartSqlSessionDaoSupport;
import net.smart.web.domain.CodeCategory;
import net.smart.web.domain.Sample;
import net.smart.web.domain.SampleTree;

import org.springframework.stereotype.Repository;

@Repository
public class SampleDaoImpl extends SmartSqlSessionDaoSupport implements SampleDao {

	@Override
	public void addSample(Sample param) {
		getSqlSession().insert("sample.insertSample", param);
	}

	@Override
	public void modifySample(Sample param) {
		getSqlSession().update("sample.updateSample", param);
	}

	@Override
	public void removeSample(Sample param) {
		getSqlSession().delete("sample.deleteSample", param);
	}

	@Override
	public List<Sample> getSampleList(Sample param) {
		return getSqlSession().selectList("sample.selectSampleList", param);
	}

	@Override
	public void addSample(List<Sample> params) {
		for (Sample param : params) {
			this.addSample(param);
		}
	}

	@Override
	public void modifySample(List<Sample> params) {
		for (Sample param : params) {
			this.modifySample(param);
		}
	}

	@Override
	public void removeSample(List<Sample> params) {
		for (Sample param : params) {
			this.removeSample(param);
		}
	}

	@Override
	public List<SampleTree> getCommonCodeChildList(SampleTree param) {
		return getSqlSession().selectList("sample.selectCommonCodeChildList", param);
	}

	@Override
	public List<CodeCategory> getCommonCodeCategoryList(CodeCategory param) {
		return getSqlSession().selectList("sample.selectCommonCodeCategoryList", param);
	}

}
