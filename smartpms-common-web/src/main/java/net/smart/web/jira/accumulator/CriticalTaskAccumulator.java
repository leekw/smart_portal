package net.smart.web.jira.accumulator;

import net.smart.common.support.util.DateUtil;
import net.smart.web.domain.jira.Cutover;
import net.smart.web.domain.jira.CutoverDashboard;

import org.springframework.stereotype.Service;

@Service("criticalTaskAccumulator")
public class CriticalTaskAccumulator extends AbstratAccumulator {

	@Override
	public boolean isVaild(Cutover param) {
		return false;
	}

	@Override
	public void accumulate(Cutover param, CutoverDashboard data) {
	}

	@Override
	public boolean isValidFilter(Cutover param, CutoverDashboard data) {
		super.setTaskDateRange(param);
		if (param.getJiraStatus() != null 
				&& !"".equals(param.getJiraStatus()) 
				&& param.getJiraStatus().equals("작업진행중")
				&& (data.getMode() != null && "중요작업".equals(data.getMode()))) {
			if (param.getEndDate().compareTo(DateUtil.getNow()) != -1
					&& param.getCaution() != null && param.getCaution().equals("O")) {
					return true;
			}
		}
		return false;
	}

}
