package net.smart.web.jira.accumulator;

import java.util.Date;

import net.smart.common.support.util.DateUtil;
import net.smart.web.domain.jira.Cutover;
import net.smart.web.domain.jira.CutoverDashboard;

import org.springframework.stereotype.Service;

@Service("beforeWorkCompletedAccumulator")
public class BeforeWorkCompletedAccumulator extends AbstratAccumulator {

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
				&& (data.getMode() != null && "작업종료20".equals(data.getMode()))) {
			if (param.getEndDate().compareTo(DateUtil.getNow()) != -1) {
				Date checkDate = DateUtil.addMinute(param.getEndDate(), -20);
				if (DateUtil.isBetweenDate(checkDate, param.getEndDate(), DateUtil.getNow())) {
					return true;
				}
			}
		}
		return false;
	}

}
