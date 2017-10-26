package net.smart.web.jira.accumulator;

import net.smart.common.support.util.DateUtil;
import net.smart.web.domain.jira.Cutover;
import net.smart.web.domain.jira.CutoverDashboard;

import org.springframework.stereotype.Service;

@Service("startDelayAccumulator")
public class StartDelayAccumulator extends AbstratAccumulator {

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
		}
		return false;
	}

	@Override
	public void accumulate(Cutover param, CutoverDashboard data) {
		data.setStartDelayCount(data.getStartDelayCount() + 1);
	}

	@Override
	public boolean isValidFilter(Cutover param, CutoverDashboard data) {
		super.setTaskDateRange(param);
		if (param.getJiraStatus() != null 
				&& !"".equals(param.getJiraStatus())
				&& (data.getMode() != null && "작업지연".equals(data.getMode()))) {
			if (param.getJiraStatus().equals("할당대기")
					|| param.getJiraStatus().equals("작업대기")) {
				if (param.getStartDate().compareTo(DateUtil.getNow()) == -1) {
					super.setStatus(param, data, "시작지연");
					return true;
				}
			}
		}
		return false;
	}

}
