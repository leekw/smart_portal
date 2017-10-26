package net.smart.common.domain.based;

import net.smart.common.domain.Common;

public class BasedOrgRel extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3792483247800603924L;
	private String sourceOrgId;
	private String targetOrgId;
	private String relationType;
	
	public String getSourceOrgId() {
		return sourceOrgId;
	}
	public void setSourceOrgId(String sourceOrgId) {
		this.sourceOrgId = sourceOrgId;
	}
	public String getTargetOrgId() {
		return targetOrgId;
	}
	public void setTargetOrgId(String targetOrgId) {
		this.targetOrgId = targetOrgId;
	}
	public String getRelationType() {
		return relationType;
	}
	public void setRelationType(String relationType) {
		this.relationType = relationType;
	}
	
	

}
