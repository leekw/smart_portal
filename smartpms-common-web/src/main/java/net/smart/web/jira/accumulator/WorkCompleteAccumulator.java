package net.smart.web.jira.accumulator;

import net.smart.web.domain.jira.Cutover;
import net.smart.web.domain.jira.CutoverDashboard;

import org.springframework.stereotype.Service;

@Service("workCompleteAccumulator")
public class WorkCompleteAccumulator extends AbstratAccumulator {

	@Override
	public boolean isVaild(Cutover param) {
		super.setTaskDateRange(param);
		if (param.getJiraStatus() != null 
				&& !"".equals(param.getJiraStatus()) 
				&& param.getJiraStatus().equals("Closed")) {
			return true;
		}
		return false;
	}

	@Override
	public void accumulate(Cutover param, CutoverDashboard data) {
		data.setWorkCompleteCount(data.getWorkCompleteCount() + 1);
	}

	@Override
	public boolean isValidFilter(Cutover param, CutoverDashboard data) {
		super.setTaskDateRange(param);
		if (param.getJiraStatus() != null 
				&& !"".equals(param.getJiraStatus()) 
				&& param.getJiraStatus().equals("Closed")
				&& (data.getMode() != null && "작업완료".equals(data.getMode()))) {
			super.setStatus(param, data, "작업완료");
			return true;
		}
		return false;
	}

}
