package net.smart.web.sample.service;

import java.util.List;

import net.smart.web.domain.CodeCategory;
import net.smart.web.domain.Sample;
import net.smart.web.domain.SampleTree;

public interface SampleService {
	
	public void addSample(Sample param);
	
	public void addSample(List<Sample> params);
	
	public void modifySample(Sample param);
	
	public void modifySample(List<Sample> params);
	
	public void removeSample(Sample param);
	
	public void removeSample(List<Sample> params);
	
	public List<Sample> getSampleList(Sample param);
	
	public Sample getSample(Sample param);
	
	public List<SampleTree> getCommonCodeChildList(SampleTree param);
	
	public List<CodeCategory> getCommonCodeCategoryList(CodeCategory param);

}
