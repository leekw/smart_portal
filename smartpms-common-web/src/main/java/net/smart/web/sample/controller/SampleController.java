package net.smart.web.sample.controller;

import java.util.List;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.annotation.IntegrationResponse;
import net.smart.web.domain.CodeCategory;
import net.smart.web.domain.Sample;
import net.smart.web.domain.SampleTree;
import net.smart.web.sample.service.SampleService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@RequestMapping("/sample/**")
public class SampleController {
	
	private static Logger logger = LoggerFactory.getLogger(SampleController.class);
	
	@Autowired
	private SampleService sampleService;
	
	@RequestMapping(value = "/add.{metadataType}", method = RequestMethod.POST)
	public void addSample(@IntegrationRequest List<Sample> params) {
		sampleService.addSample(params);
	}
	
	@RequestMapping(value = "/modify.{metadataType}", method = RequestMethod.POST)
	public void modifySample(@IntegrationRequest List<Sample> params) {
		sampleService.modifySample(params);
	}
	
	@RequestMapping(value = "/remove.{metadataType}", method = RequestMethod.POST)
	public void removeSample(@IntegrationRequest List<Sample> params) {
		sampleService.removeSample(params);
	}
	
	@RequestMapping(value = "/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="samples")
	public List<Sample> getSampleList(@IntegrationRequest Sample sample) {
		return sampleService.getSampleList(sample);
	}
	
	@RequestMapping(value = "/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="sample")
	public Sample getSample(@IntegrationRequest Sample sample) {
		return sampleService.getSample(sample);
	}
	
	@RequestMapping(value = "/tree/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="samples")
	public List<SampleTree> getSampleTreeList(@IntegrationRequest SampleTree sampleTree) {
		return sampleService.getCommonCodeChildList(sampleTree);
	}
	
	@RequestMapping(value = "/code/category/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="samples")
	public List<CodeCategory> getCommonCodeCategoryList(@IntegrationRequest CodeCategory codeCategory) {
		return sampleService.getCommonCodeCategoryList(codeCategory);
	}
}
