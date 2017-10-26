package net.smart.web.domain.jira;

import net.smart.common.domain.Common;

public class JiraDefaultData extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4705357743379343619L;
	
	private String cutoverScenario;
	private String cutoverTransition;
	private String cutoverTransitionDetail;
	private String defectProjectId;
	private String defectIssueTypeId;
	private String defectQueChannelId;
	private String defectBizTypeId;
	private String changeRequestProjectId;
	private String changeRequestIssueTypeId;
	
	
	public String getChangeRequestProjectId() {
		return changeRequestProjectId;
	}
	public void setChangeRequestProjectId(String changeRequestProjectId) {
		this.changeRequestProjectId = changeRequestProjectId;
	}
	public String getChangeRequestIssueTypeId() {
		return changeRequestIssueTypeId;
	}
	public void setChangeRequestIssueTypeId(String changeRequestIssueTypeId) {
		this.changeRequestIssueTypeId = changeRequestIssueTypeId;
	}
	public String getDefectProjectId() {
		return defectProjectId;
	}
	public void setDefectProjectId(String defectProjectId) {
		this.defectProjectId = defectProjectId;
	}
	public String getDefectIssueTypeId() {
		return defectIssueTypeId;
	}
	public void setDefectIssueTypeId(String defectIssueTypeId) {
		this.defectIssueTypeId = defectIssueTypeId;
	}
	public String getDefectQueChannelId() {
		return defectQueChannelId;
	}
	public void setDefectQueChannelId(String defectQueChannelId) {
		this.defectQueChannelId = defectQueChannelId;
	}
	public String getDefectBizTypeId() {
		return defectBizTypeId;
	}
	public void setDefectBizTypeId(String defectBizTypeId) {
		this.defectBizTypeId = defectBizTypeId;
	}
	public String getCutoverScenario() {
		return cutoverScenario;
	}
	public void setCutoverScenario(String cutoverScenario) {
		this.cutoverScenario = cutoverScenario;
	}
	public String getCutoverTransition() {
		return cutoverTransition;
	}
	public void setCutoverTransition(String cutoverTransition) {
		this.cutoverTransition = cutoverTransition;
	}
	public String getCutoverTransitionDetail() {
		return cutoverTransitionDetail;
	}
	public void setCutoverTransitionDetail(String cutoverTransitionDetail) {
		this.cutoverTransitionDetail = cutoverTransitionDetail;
	}	

}
