package net.smart.web.portal.service;

import java.util.List;

import net.smart.web.domain.portal.PortalData;
import net.smart.web.domain.portal.PortalInfo;

public interface PortalService {
	
	public List<PortalData> getConnectionUserList(PortalData param);
	
	public List<PortalData> getBizProcessList(PortalData param);
	
	public List<PortalData> getQuestionList(PortalData param);
	
	public List<PortalData> getWfmList(PortalData param);
	
	public List<PortalData> getItsmList(PortalData param);
	
	public List<PortalData> getHelfList(PortalData param);
	
	public List<PortalData> getConnectionUserChartData(PortalData param);
	
	public void saveConnectionUser(List<PortalData> params);
	
	public void saveBizProcess(List<PortalData> params);
	
	public void saveQuestion(List<PortalData> params);
	
	public void saveWfm(List<PortalData> params);
	
	public void saveItsm(List<PortalData> params);
	
	public void saveHelf(List<PortalData> params);
	
	public List<PortalData> getBizProcessChartData(PortalData param);
	
	public List<PortalData> getOpenIssueChartData(PortalData param);
	
	public List<PortalData> getQuestionChartData(PortalData param);
	
	public PortalInfo getPortalProjectStatus();
	
	public void modifyPortalProjectStatus(PortalInfo param);
	
	public List<PortalData> getPortalOpenIssueLevel(PortalInfo param);
	
	public List<PortalData> getPortalOpenIssueLevelByDaily(PortalInfo param);
	
	public List<PortalData> getPortalOpenIssueChannel(PortalInfo param);
	
	public void modifyPortalProjectStatusByMainResource(PortalInfo param);
	
	public List<PortalData> getOpenJiraOriginationChart();
	
	public List<PortalData> getPortalStatisticChartDataByDaily(PortalData param);
	
	public List<PortalData> getJiraChartByDaily(PortalData param);

}
