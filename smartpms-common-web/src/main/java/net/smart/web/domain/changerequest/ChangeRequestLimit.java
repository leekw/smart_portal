package net.smart.web.domain.changerequest;

import net.smart.common.domain.Common;

public class ChangeRequestLimit extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 5488329721539806417L;
	private String team;
	private String module;
	private String limitDate;
	private String iteration;
	private String phase;
	
	
	public String getPhase() {
		return phase;
	}
	public void setPhase(String phase) {
		this.phase = phase;
	}
	public String getIteration() {
		return iteration;
	}
	public void setIteration(String iteration) {
		this.iteration = iteration;
	}
	public String getTeam() {
		return team;
	}
	public void setTeam(String team) {
		this.team = team;
	}
	public String getModule() {
		return module;
	}
	public void setModule(String module) {
		this.module = module;
	}
	public String getLimitDate() {
		return limitDate;
	}
	public void setLimitDate(String limitDate) {
		this.limitDate = limitDate;
	}

	
}
