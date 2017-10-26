package net.smart.web.domain.jira;

import net.smart.common.domain.Common;

public class SourceJiraLink extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = 344012784318413957L;
	
	private String source;
	private String target;
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getTarget() {
		return target;
	}
	public void setTarget(String target) {
		this.target = target;
	}


}
