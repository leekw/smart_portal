package net.smart.web.jira.accumulator;

import net.smart.common.support.util.DateUtil;
import net.smart.web.domain.jira.Cutover;
import net.smart.web.domain.jira.CutoverDashboard;

import org.springframework.stereotype.Service;

@Service("assignReadyAccumulator")
public class AssignReadyAccumulator extends AbstratAccumulator {

	@Override
	public boolean isVaild(Cutover param) {
		super.setTaskDateRange(param);
		if (param.getJiraStatus() != null 
				&& !"".equals(param.getJiraStatus()) 
				&& param.getJiraStatus().equals("할당대기")) {
			if (param.getStartDate().compareTo(DateUtil.getNow()) != -1) {
				return true;
			}
		}
		
		return false;
	}

	@Override
	public void accumulate(Cutover param, CutoverDashboard data) {
		data.setAssignReadyCount(data.getAssignReadyCount()+1);
	}

	@Override
	public boolean isValidFilter(Cutover param, CutoverDashboard data) {
		super.setTaskDateRange(param);
		if (param.getJiraStatus() != null 
				&& !"".equals(param.getJiraStatus()) 
				&& param.getJiraStatus().equals("할당대기")
				&& (data.getMode() != null && "할당대기".equals(data.getMode()))) {
			if (param.getStartDate().compareTo(DateUtil.getNow()) != -1) {
				return true;
			}
		}
		return false;
	}

}
