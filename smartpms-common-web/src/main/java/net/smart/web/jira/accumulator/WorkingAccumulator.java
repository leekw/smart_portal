package net.smart.web.jira.accumulator;

import net.smart.common.support.util.DateUtil;
import net.smart.web.domain.jira.Cutover;
import net.smart.web.domain.jira.CutoverDashboard;

import org.springframework.stereotype.Service;

@Service("workingAccumulator")
public class WorkingAccumulator extends AbstratAccumulator {

	@Override
	public boolean isVaild(Cutover param) {
		super.setTaskDateRange(param);
		if (param.getJiraStatus() != null 
				&& !"".equals(param.getJiraStatus()) 
				&& param.getJiraStatus().equals("작업진행중")) {
			if (param.getEndDate().compareTo(DateUtil.getNow()) != -1) {
				return true;
			}
		}
		return false;
	}

	@Override
	public void accumulate(Cutover param, CutoverDashboard data) {
		data.setWorkingCount(data.getWorkingCount() + 1);
	}

	@Override
	public boolean isValidFilter(Cutover param, CutoverDashboard data) {
		super.setTaskDateRange(param);
		if (param.getJiraStatus() != null 
				&& !"".equals(param.getJiraStatus()) 
				&& param.getJiraStatus().equals("작업진행중")
				&& (data.getMode() != null && "작업진행중".equals(data.getMode()))) {
			if (param.getEndDate().compareTo(DateUtil.getNow()) != -1) {
				return true;
			}
		}
		return false;
	}

}
