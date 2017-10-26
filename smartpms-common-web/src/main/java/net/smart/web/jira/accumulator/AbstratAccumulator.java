package net.smart.web.jira.accumulator;

import java.util.Date;
import java.util.List;

import net.smart.common.support.util.DateUtil;
import net.smart.web.domain.jira.Cutover;
import net.smart.web.domain.jira.CutoverDashboard;
import net.smart.web.domain.jira.CutoverMain;

public abstract class AbstratAccumulator implements Accumulator  {
	
	protected void setTaskDateRange(Cutover param) {
		if (param.getStartExpectDate() != null && !"".equals(param.getStartExpectDate())
				&& param.getEndExpectDate() != null && !"".equals(param.getEndExpectDate())) {
			try {
				Date start = DateUtil.getDateByString(param.getStartExpectDate() + " " + param.getStartExpectTime() + ":00", DateUtil.Format.YYYY_MM_DD_HH_MI_SS.getValue());
				Date end = DateUtil.getDateByString(param.getEndExpectDate() + " " + param.getEndExpectTime() + ":00", DateUtil.Format.YYYY_MM_DD_HH_MI_SS.getValue());
				param.setStartDate(start);
				param.setEndDate(end);
			} catch (Exception ex) {
				param.setStartDate(null);
				param.setEndDate(null);
			}
		}
	}
	
	protected void setStatus(Cutover param, CutoverDashboard data, String status) {
		param.setJiraStatus(status);
	}
	
	protected void setAllDataStatus(Cutover param, CutoverDashboard data) {
		this.setTaskDateRange(param);
		if (param.getJiraStatus() != null && !"".equals(param.getJiraStatus()))
		if (param.getJiraStatus().equals("할당대기")
				&& param.getStartDate().compareTo(DateUtil.getNow()) != -1) {
			this.setStatus(param, data, "할당대기");
		} else if (param.getJiraStatus().equals("작업대기")
				&& param.getStartDate().compareTo(DateUtil.getNow()) != -1) {
			this.setStatus(param, data, "작업대기");
		} else if (param.getJiraStatus().equals("작업진행중")
				&& param.getEndDate().compareTo(DateUtil.getNow()) != -1) {
			this.setStatus(param, data, "작업진행중");
		} else if ((param.getJiraStatus().equals("할당대기") 
				|| param.getJiraStatus().equals("작업대기")) 
				&& param.getStartDate().compareTo(DateUtil.getNow()) == -1) {
			this.setStatus(param, data, "시작지연");
		} else if (param.getJiraStatus().equals("작업진행중") 
				&& param.getEndDate().compareTo(DateUtil.getNow()) == -1) {
			this.setStatus(param, data, "종료지연");
		} else if (param.getJiraStatus().equals("Closed")) {
			this.setStatus(param, data, "작업완료");
		}
	}
	
	public void setFilterTask(Cutover param, CutoverDashboard data, List<CutoverMain> results) {
		CutoverMain result = new CutoverMain();
		result.setJobExecutionTeam(param.getTeamName());
		result.setJobId(param.getJobId());
		result.setJiraId(param.getJiraId());
		result.setJiraStatus(param.getJiraStatus());
		result.setTask(param.getTask());
		result.setResolution(param.getResolution());
		result.setJobExecutor(param.getJobExecutorId());
		result.setCaution(param.getCaution());
		if (param.getStartExpectDate() != null 
				&& !"".equals(param.getStartExpectDate())
				&& param.getEndExpectDate() != null
				&& !"".equals(param.getEndExpectDate())) {
			result.setTaskDate(param.getStartExpectDate() + " " + param.getStartExpectTime() + " ~ " + param.getEndExpectDate() + " " + param.getEndExpectTime());
		}
		results.add(result);
	}
}
