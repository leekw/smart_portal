package net.smart.web.portal.dao;

import java.util.List;

import net.smart.web.domain.portal.PortalData;
import net.smart.web.domain.portal.PortalInfo;

public interface PortalDao {
	
	public List<PortalData> getPortalStatisticList(PortalData param);
	
	public List<PortalData> getPortalStatisticChart(PortalData param);
	
	public List<PortalData> getQuestionChartData(PortalData param);
	
	public void addConnectionUser(List<PortalData> params);
	
	public void modifyConnectionUser(List<PortalData> params);
	
	public void removeConnectionUser(List<PortalData> params);
	
	public PortalInfo getPortalProjectStatus();
	
	public void modifyPortalProjectStatus(PortalInfo param);
	
	public List<PortalData> getPortalOpenIssueLevel(PortalInfo param);
	
	public List<PortalData> getPortalOpenIssueLevelByDaily(PortalInfo param);
	
	public List<PortalData> getPortalOpenIssueChannel(PortalInfo param);
	
	public void initPortalStatisticData();
	
	public void addOpenJiraHistoryData();
	
	public void addOpenJiraLevelHitoryData();
	
	public void modifyPortalProjectStatusByMainResource(PortalInfo param);
	
	public List<PortalData> getOpenJiraOriginationChart();
	
	public List<PortalData> getOpenJiraAccumChart();
	
	public List<PortalData> getPortalStatisticChartByDaily(PortalData param);
	
	public List<PortalData> getJiraChartByDaily(PortalData param);

}
