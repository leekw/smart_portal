package net.smart.web.jira.accumulator;

import net.smart.common.support.util.DateUtil;
import net.smart.web.domain.jira.Cutover;
import net.smart.web.domain.jira.CutoverDashboard;

import org.springframework.stereotype.Service;

@Service("workDelayAccumulator")
public class WorkDelayAccumulator extends AbstratAccumulator {

	@Override
	public boolean isVaild(Cutover param) {
		super.setTaskDateRange(param);
		if (param.getJiraStatus() != null 
				&& !"".equals(param.getJiraStatus())) {
			if (param.getJiraStatus().equals("할당대기")
					|| param.getJiraStatus().equals("작업대기")) {
				if (param.getStartDate().compareTo(DateUtil.getNow()) == -1) {
					return true;
				}
			}
			if (param.getJiraStatus().equals("작업진행중")) {
				if (param.getEndDate().compareTo(DateUtil.getNow()) == -1) {
					return true;
				}
			}
		}
		return false;
	}

	@Override
	public void accumulate(Cutover param, CutoverDashboard data) {
		data.setWorkDelayCount(data.getWorkDelayCount() + 1);
	}

	@Override
	public boolean isValidFilter(Cutover param, CutoverDashboard data) {
		return false;
	}

}
