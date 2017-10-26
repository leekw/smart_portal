package net.smart.web.jira.accumulator;

import java.util.Date;

import net.smart.common.support.util.DateUtil;
import net.smart.web.domain.jira.Cutover;
import net.smart.web.domain.jira.CutoverDashboard;

import org.springframework.stereotype.Service;

@Service("assignTargetAccumulator")
public class AssignTargetAccumulator extends AbstratAccumulator {

	@Override
	public boolean isVaild(Cutover param) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isValidFilter(Cutover param, CutoverDashboard data) {
		super.setTaskDateRange(param);
		if (param.getJiraStatus() != null 
				&& !"".equals(param.getJiraStatus()) 
				&& param.getJiraStatus().equals("할당대기")
				&& (data.getMode() != null && "할당10".equals(data.getMode()))) {
			Date checkDate = DateUtil.addMinute(param.getStartDate(), -10);
			if (DateUtil.isBetweenDate(checkDate, param.getStartDate(), DateUtil.getNow())
					|| param.getStartDate().compareTo(DateUtil.getNow()) == -1) {
				super.setAllDataStatus(param, data);
				return true;
			}
		}
		return false;
	}

	@Override
	public void accumulate(Cutover param, CutoverDashboard data) {
		// TODO Auto-generated method stub
		
	}

}
