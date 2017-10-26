package net.smart.web.jira.accumulator;

import java.util.List;

import net.smart.web.domain.jira.Cutover;
import net.smart.web.domain.jira.CutoverDashboard;
import net.smart.web.domain.jira.CutoverMain;

public interface Accumulator {
	
	public boolean isVaild(Cutover param);
	
	public boolean isValidFilter(Cutover param, CutoverDashboard data);
	
	public void accumulate(Cutover param, CutoverDashboard data);

	public void setFilterTask(Cutover param, CutoverDashboard data, List<CutoverMain> results);
}
