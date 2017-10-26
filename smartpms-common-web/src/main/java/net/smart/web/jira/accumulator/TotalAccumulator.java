package net.smart.web.jira.accumulator;

import net.smart.web.domain.jira.Cutover;
import net.smart.web.domain.jira.CutoverDashboard;

import org.springframework.stereotype.Service;

@Service("totalAccumulator")
public class TotalAccumulator extends AbstratAccumulator {

	@Override
	public boolean isVaild(Cutover param) {
		if (param.getJiraStatus() != null && !"".equals(param.getJiraStatus())) {
			return true;
		}
		return false;
	}

	@Override
	public void accumulate(Cutover param, CutoverDashboard data) {
		data.setTotalCount(data.getTotalCount()+1);
	}

	@Override
	public boolean isValidFilter(Cutover param, CutoverDashboard data) {
		if (param.getJiraStatus() != null && !"".equals(param.getJiraStatus())) {
			if (data.getMode() == null || "작업대상".equals(data.getMode())) {
				super.setAllDataStatus(param, data);
				return true;
			}
		}
		return false;
	}
	
	

}
