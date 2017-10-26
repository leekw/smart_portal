package net.smart.web.portal.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.smart.common.service.SmartCommonService;
import net.smart.common.support.util.DateUtil;
import net.smart.web.changerequest.service.ChangeRequestService;
import net.smart.web.domain.portal.ParentPortal;
import net.smart.web.domain.portal.PortalData;
import net.smart.web.domain.portal.PortalInfo;
import net.smart.web.portal.dao.PortalDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("portalService")
public class PortalServiceImpl implements PortalService {
	
	@Autowired
	private SmartCommonService integrationCommonService;
	
	@Autowired
	private ChangeRequestService changeRequestService;
	
	@Autowired
	private PortalDao portalDao;

	@Override
	public List<PortalData> getConnectionUserList(PortalData param) {
		param.setType("conn");
		return portalDao.getPortalStatisticList(param);
	}
	
	private void setDivisionPortalData(List<PortalData> source, ParentPortal target) {
		List<PortalData> inserts = new ArrayList<PortalData>();
		List<PortalData> deletes = new ArrayList<PortalData>();
		for (PortalData obj : source) {
			obj.setType(target.getProcessType());
			if ("I".equals(obj.getMode()) || "M".equals(obj.getMode())) {
				obj.setDay(target.getProcessDay());
				inserts.add(obj);
			}  else if ("D".equals(obj.getMode())) {
				obj.setOwnDay(obj.getOwnDay().substring(0, 8));
				deletes.add(obj);
			}
		}
		target.setInsertList(inserts);
		target.setDeleteList(deletes);
	}
	
	@Transactional
	private void savePortalData(ParentPortal target) {
		portalDao.addConnectionUser(target.getInsertList());
		portalDao.removeConnectionUser(target.getDeleteList());
	}
	
	private void setProcessDay(ParentPortal data, String targetHours) {
		if (targetHours == null || "".equals(targetHours)) {
			data.setProcessDay(DateUtil.getNowByFormat(DateUtil.Format.YYYYMMDDHHMISS.getValue()));
		} else {
			String day = DateUtil.getNowByFormat(DateUtil.Format.YYYYMMDD.getValue());
			String etc = DateUtil.getNowByFormat(DateUtil.Format.MI_SS.getValue());
			data.setProcessDay(day + targetHours + etc);
		}
	}

	@Override
	public void saveConnectionUser(List<PortalData> params) {
		ParentPortal data = new ParentPortal();
		data.setProcessType("conn");
		String targetHours = params.get(0).getTargetHours();
		this.setProcessDay(data, targetHours);
		this.setDivisionPortalData(params, data);
		this.savePortalData(data);
	}

	@Override
	public List<PortalData> getConnectionUserChartData(PortalData param) {
		param.setType("conn");
		param.setDay(DateUtil.getNowByFormat(DateUtil.Format.YYYYMMDD.getValue()));
		List<PortalData> todays = portalDao.getPortalStatisticChart(param);
		Map<String, PortalData> yestdays = this.getYestdayPortalStatistic(param);
		for (PortalData data : todays) {
			PortalData temp = yestdays.get(data.getStrDay());
			if (temp != null) {
				this.setPortalDataYestday(data, temp);
			} else {
				String minType = data.getStrDay().substring(3);
				minType = minType.equals("0") ? "1" : "0";
				String nextDay = data.getStrDay().substring(0, 2) + minType;
				temp = yestdays.get(nextDay);
				if (temp != null) {
					this.setPortalDataYestday(data, temp);
				}
			}
		}
		return todays;
	}
	
	private void setPortalDataYestday(PortalData today, PortalData yestday) {
		today.setData11(yestday.getData1());
		today.setData22(yestday.getData2());
		today.setData33(yestday.getData3());
		today.setData44(yestday.getData4());
		today.setData55(yestday.getData5());
		today.setData66(yestday.getData6());
	}
	
	private Map<String, PortalData> getYestdayPortalStatistic(PortalData param) {
		param.setDay(DateUtil.getDateByFormat(DateUtil.getYesterday(), DateUtil.Format.YYYYMMDD.getValue()));
		List<PortalData> yestdays = portalDao.getPortalStatisticChart(param);
		Map<String, PortalData> result = new HashMap<String, PortalData>();
		for (PortalData data : yestdays) {
			result.put(data.getStrDay(), data);
		}
		return result;
	}

	@Override
	public List<PortalData> getBizProcessList(PortalData param) {
		param.setType("biz");
		return portalDao.getPortalStatisticList(param);
	}

	@Override
	public void saveBizProcess(List<PortalData> params) {
		ParentPortal data = new ParentPortal();
		data.setProcessType("biz");
		String targetHours = params.get(0).getTargetHours();
		this.setProcessDay(data, targetHours);
		this.setDivisionPortalData(params, data);
		this.savePortalData(data);
	}

	@Override
	public List<PortalData> getBizProcessChartData(PortalData param) {
		param.setType("biz");
		param.setDay(DateUtil.getNowByFormat(DateUtil.Format.YYYYMMDD.getValue()));
		List<PortalData> todays = portalDao.getPortalStatisticChart(param);
		Map<String, PortalData> yestdays = this.getYestdayPortalStatistic(param);
		for (PortalData data : todays) {
			PortalData temp = yestdays.get(data.getStrDay());
			if (temp != null) {
				this.setPortalDataYestday(data, temp);
			} else {
				String minType = data.getStrDay().substring(3);
				minType = minType.equals("0") ? "1" : "0";
				String nextDay = data.getStrDay().substring(0, 2) + minType;
				temp = yestdays.get(nextDay);
				if (temp != null) {
					this.setPortalDataYestday(data, temp);
				}
			}
		}
		return todays;
	}

	@Override
	public List<PortalData> getQuestionList(PortalData param) {
		param.setType("que");
		return portalDao.getPortalStatisticList(param);
	}

	@Override
	public void saveQuestion(List<PortalData> params) {
		ParentPortal data = new ParentPortal();
		data.setProcessType("que");
		data.setProcessDay(DateUtil.getNowByFormat(DateUtil.Format.YYYYMMDDHHMISS.getValue()));
		this.setDivisionPortalData(params, data);
		this.savePortalData(data);
	}

	@Override
	public void saveWfm(List<PortalData> params) {
		ParentPortal data = new ParentPortal();
		data.setProcessType("wfm");
		data.setProcessDay(DateUtil.getNowByFormat(DateUtil.Format.YYYYMMDDHHMISS.getValue()));
		this.setDivisionPortalData(params, data);
		this.savePortalData(data);
	}

	@Override
	public List<PortalData> getWfmList(PortalData param) {
		param.setType("wfm");
		return portalDao.getPortalStatisticList(param);
	}

	@Override
	public List<PortalData> getItsmList(PortalData param) {
		param.setType("itsm");
		return portalDao.getPortalStatisticList(param);
	}

	@Override
	public List<PortalData> getHelfList(PortalData param) {
		param.setType("helf");
		return portalDao.getPortalStatisticList(param);
	}

	@Override
	public void saveItsm(List<PortalData> params) {
		ParentPortal data = new ParentPortal();
		data.setProcessType("itsm");
		data.setProcessDay(DateUtil.getNowByFormat(DateUtil.Format.YYYYMMDDHHMISS.getValue()));
		this.setDivisionPortalData(params, data);
		this.savePortalData(data);
	}

	@Override
	public void saveHelf(List<PortalData> params) {
		ParentPortal data = new ParentPortal();
		data.setProcessType("helf");
		data.setProcessDay(DateUtil.getNowByFormat(DateUtil.Format.YYYYMMDDHHMISS.getValue()));
		this.setDivisionPortalData(params, data);
		this.savePortalData(data);
	}

	@Override
	public List<PortalData> getQuestionChartData(PortalData param) {
		return portalDao.getQuestionChartData(param);
	}

	@Override
	public PortalInfo getPortalProjectStatus() {
		PortalInfo result =  portalDao.getPortalProjectStatus();
//		String svnCheckYn = changeRequestService.getSvnValidationCheckYn();
		String svnCheckYn = "N";
		result.setSvnCheckYn(svnCheckYn);
		return result;
	}

	@Override
	public void modifyPortalProjectStatus(PortalInfo param) {
		portalDao.modifyPortalProjectStatus(param);
		changeRequestService.updateSvnValidationCheckYn(param.getSvnCheckYn());
	}

	@Override
	public List<PortalData> getPortalOpenIssueLevel(PortalInfo param) {
		List<PortalData> results = portalDao.getPortalOpenIssueLevel(param);
		List<PortalData> temps = portalDao.getPortalOpenIssueLevelByDaily(param);
		results.addAll(temps);
		return results;
	}

	@Override
	public List<PortalData> getPortalOpenIssueChannel(PortalInfo param) {
		return portalDao.getPortalOpenIssueChannel(param);
	}
	
	@Scheduled(cron="10 20 0 * * ? ")
	private void initPortalStatisticData() {
		final String jiraUnSync = System.getProperty("jiraUnSync");
		if (jiraUnSync == null || jiraUnSync.equals("N")) {
			if (integrationCommonService.isValidInterfaceDate("defect")) {
				this.setPortalStatisticData();
			}
		}
	}
	@Transactional
	private void setPortalStatisticData() {
		portalDao.initPortalStatisticData();
	}
	
	//@Scheduled(cron="0 0/30 * * * ? ")
	private void syncOpenJiraHistoryData() {
		final String jiraUnSync = System.getProperty("jiraUnSync");
		if (jiraUnSync == null || jiraUnSync.equals("N")) {
			this.addOpenJiraHistoryData();
		}
	}
	
	@Transactional
	private void addOpenJiraHistoryData() {
		portalDao.addOpenJiraLevelHitoryData();
		//portalDao.addOpenJiraHistoryData();
	}

	@Override
	public List<PortalData> getOpenIssueChartData(PortalData param) {
		//param.setType("level");
		return portalDao.getOpenJiraAccumChart();
	}

	@Override
	public void modifyPortalProjectStatusByMainResource(PortalInfo param) {
		portalDao.modifyPortalProjectStatusByMainResource(param);
	}

	@Override
	public List<PortalData> getOpenJiraOriginationChart() {
		return portalDao.getOpenJiraOriginationChart();
	}

	@Override
	public List<PortalData> getPortalStatisticChartDataByDaily(PortalData param) {
		List<PortalData> results =  portalDao.getPortalStatisticChartByDaily(param);
		int target = 0;
		for (PortalData obj : results) {
			if (target == 0 && obj.getTarget() != 0) {
				target = obj.getTarget();
			}
			obj.setTarget(target);
		}
		return results;
	}

	@Override
	public List<PortalData> getPortalOpenIssueLevelByDaily(PortalInfo param) {
		return portalDao.getPortalOpenIssueLevelByDaily(param);
	}

	@Override
	public List<PortalData> getJiraChartByDaily(PortalData param) {
		return portalDao.getJiraChartByDaily(param);
	}
}
