package net.smart.web.quality.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.annotation.IntegrationResponse;
import net.smart.web.domain.quality.InterfaceDetail;
import net.smart.web.domain.quality.InterfaceSummary;
import net.smart.web.domain.quality.QualityDetail;
import net.smart.web.domain.quality.QualityHistoryChart;
import net.smart.web.domain.quality.QualityHistorySummary;
import net.smart.web.domain.quality.QualityProgramType;
import net.smart.web.domain.quality.QualitySummary;
import net.smart.web.domain.quality.QualityTest;
import net.smart.web.domain.quality.QualtiyTestChart;
import net.smart.web.quality.service.QualityService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class QualityController {
	
	@Autowired
	private QualityService qualityService;
	
	@RequestMapping(value = "/quality/summary/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="summarys")
	public List<QualitySummary> getQualitySummaryList(@IntegrationRequest QualitySummary param) {
		return qualityService.getQualitySummaryList(param);
	}
	
	@RequestMapping(value = "/quality/function/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="summarys")
	public List<QualitySummary> getQualityFunctionList(@IntegrationRequest QualitySummary param) {
		param.setMode("function");
		return qualityService.getQualitySummaryList(param);
	}
	
	@RequestMapping(value = "/quality/developer/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="developers")
	public List<QualitySummary> getQualityDeveloperList(@IntegrationRequest QualitySummary param) {
		return qualityService.getQualityDeveloperList(param);
	}
	
	@RequestMapping(value = "/quality/detail/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="details")
	public List<QualityProgramType> getQualityDetailList(@IntegrationRequest QualityProgramType param) {
		return qualityService.getQualityProgramTypeList(param);
	}
	
	@RequestMapping(value = "/quality/data/add.{metadataType}", method = RequestMethod.POST)
	public void addQualityData() {
		qualityService.addQualityData();
	}
	
	@RequestMapping(value = "/quality/developer/top/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="developers")
	public List<QualitySummary> getQualityDeveloperTopList(@IntegrationRequest QualitySummary param) {
		return qualityService.getQualityDeveloperTopList(param);
	}
	
	@RequestMapping(value = "/quality/detail/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="data")
	public Map<String, Object> getQualityDetailList(@IntegrationRequest QualityDetail param) {
		Map<String, Object> result = new HashMap<String, Object>();
		List<QualityDetail> details = qualityService.getQualityDetailList(param);
		Map<String, QualitySummary> summarys = qualityService.getQaulityDetailListByProgramType(param);
		if (details != null && !details.isEmpty()) {
			result.put("details", details);
			result.put("total", details.get(0).getTotal());
			result.put("UI", !summarys.containsKey("UI") ? 0 : summarys.get("UI").getPgTotal());
			result.put("ESB", !summarys.containsKey("ESB") ? 0 : summarys.get("ESB").getPgTotal());
			result.put("SO", !summarys.containsKey("SO") ? 0 : summarys.get("SO").getPgTotal());
			result.put("JO", !summarys.containsKey("JO") ? 0 : summarys.get("JO").getPgTotal());
			result.put("BO", !summarys.containsKey("BO") ? 0 : summarys.get("BO").getPgTotal());
			result.put("BOC", !summarys.containsKey("BOC") ? 0 : summarys.get("BOC").getPgTotal());
			result.put("DO", !summarys.containsKey("DO") ? 0 : summarys.get("DO").getPgTotal());
			result.put("DTO", !summarys.containsKey("DTO") ? 0 : summarys.get("DTO").getPgTotal());
			result.put("ETC", !summarys.containsKey("ETC") ? 0 : summarys.get("ETC").getPgTotal());
		}
		return result;
	}
	
	@RequestMapping(value = "/quality/history/summary/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="summarys")
	public List<QualityHistorySummary> getQualityHistorySummary(@IntegrationRequest QualityHistorySummary param) {
		return qualityService.getQualityHistorySummary(param);
	}
	
	@RequestMapping(value = "/quality/history/chart/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="datas")
	public List<QualityHistoryChart> getQualityHistoryChart(@IntegrationRequest QualityHistorySummary param) {
		return qualityService.getQualityHistoryChart(param);
	}
	
	@RequestMapping(value = "/svn/file/view.do", method = RequestMethod.GET)
	public ModelAndView viewSvnFile(@RequestParam  String svnFilePath, 
			HttpServletRequest request, HttpServletResponse response) throws IOException {		
		ModelAndView modelAndView  = new ModelAndView();
		String svnFileInfo = null;
		String type = null;
		if (svnFilePath == null || "".equals(svnFilePath)) {
			svnFileInfo = "파일이 존재하지 않습니다.";
		} else {
			svnFileInfo = qualityService.getSvnFileInfo(svnFilePath);
			int index = svnFilePath.lastIndexOf(".");
			if (index != -1) {
				type = svnFilePath.substring(index + 1);
			}
			svnFileInfo = svnFileInfo.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
		}
		modelAndView.addObject("hlType", "java".equals(type) ? "java" : "html");
		modelAndView.addObject("svnFileInfo", svnFileInfo);
		modelAndView.setViewName("svnFileView");
		return modelAndView;
	}
	
	@RequestMapping(value = "/quality/interface/summary/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="summarys")
	public List<InterfaceSummary> getQualityInterfaceSummary(@IntegrationRequest InterfaceSummary param) {
		return qualityService.getQualityInterfaceSummary(param);
	}
	
	@RequestMapping(value = "/quality/interface/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="data")
	public Map<String, Object> getQualityInterfaceDetail(@IntegrationRequest InterfaceDetail param) {
		Map<String, Object> result = new HashMap<String, Object>();
		List<InterfaceDetail> details = qualityService.getQualityInterfaceList(param);
		if (details != null && !details.isEmpty()) {
			result.put("details", details);
			result.put("total", details.get(0).getTotal());
		}
		return result;
	}
	
	@RequestMapping(value = "/quality/test/summary/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="data")
	public List<QualityTest> getQualityTestSummary(@IntegrationRequest QualityTest param) {
		return qualityService.getQualityTestProgramCount(param);
	}
	
	@RequestMapping(value = "/quality/test/summary/chart/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="data")
	public List<QualityTest> getQualityTestSummaryChart(@IntegrationRequest QualityTest param) {
		return qualityService.getQualityTestProgramCountChart(param);
	}
	
	@RequestMapping(value = "/quality/test/module/chart/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="data")
	public List<QualityTest> getQualityTestModuleChart(@IntegrationRequest QualityTest param) {
		return qualityService.getQualtiyTestRealtionChart(param);
	}
	
	@RequestMapping(value = "/quality/test/tree/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="rels")
	public List<QualityTest> getQualityTestTree(@IntegrationRequest QualityTest param) {
		return qualityService.getQualtiyTestRealtion(param);
	}
	
	@RequestMapping(value = "/quality/test/hist/chart/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="data")
	public List<QualityTest> getQualityTestHistoryChart(@IntegrationRequest QualityTest param) {
		return qualityService.getQualtiyTestRealtionHistChart(param);
	}
	
	@RequestMapping(value = "/quality/test/change/chart/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="data")
	public List<QualtiyTestChart> getQualityTestChangeChart(@IntegrationRequest QualityTest param) {
		return qualityService.getQualityTestRelationChangeChart(param);
	}
}
