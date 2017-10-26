package net.smart.web.sample.service;

import java.util.List;

import net.smart.web.domain.CodeCategory;
import net.smart.web.domain.Sample;
import net.smart.web.domain.SampleTree;
import net.smart.web.sample.dao.SampleDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("sampleService")
public class SampleServiceImpl implements SampleService {
	
	@Autowired
	private SampleDao sampleDao;

	@Override
	@Transactional
	public void addSample(Sample param) {
		sampleDao.addSample(param);
	}

	@Override
	@Transactional
	public void modifySample(Sample param) {
		sampleDao.modifySample(param);
	}

	@Override
	@Transactional
	public void removeSample(Sample param) {
		sampleDao.removeSample(param);
	}

	@Override
	public List<Sample> getSampleList(Sample param) {
		return sampleDao.getSampleList(param);
	}

	@Override
	public Sample getSample(Sample param) {
		List<Sample> result = this.getSampleList(param);
		return result != null && !result.isEmpty() ? result.get(0) : null;
	}

	@Override
	public void addSample(List<Sample> params) {
		sampleDao.addSample(params);
	}

	@Override
	public void modifySample(List<Sample> params) {
		sampleDao.modifySample(params);
	}

	@Override
	public void removeSample(List<Sample> params) {
		sampleDao.removeSample(params);
	}

	@Override
	public List<SampleTree> getCommonCodeChildList(SampleTree param) {
		return sampleDao.getCommonCodeChildList(param);
	}

	@Override
	public List<CodeCategory> getCommonCodeCategoryList(CodeCategory param) {
		return sampleDao.getCommonCodeCategoryList(param);
	}

}
