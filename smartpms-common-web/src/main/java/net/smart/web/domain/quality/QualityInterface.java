package net.smart.web.domain.quality;

import net.smart.common.domain.Common;

public class QualityInterface extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -330740456236621286L;
	
	private String statDate;
	private String interfaceId;
	private String interfacePattern;
	private String ownTeam;
	private String ownModule;
	private String sourceSystem;
	private String targetSystem;
	private String runYn;
	private String interfaceType;
	
	public String getStatDate() {
		return statDate;
	}
	public void setStatDate(String statDate) {
		this.statDate = statDate;
	}
	public String getInterfaceId() {
		return interfaceId;
	}
	public void setInterfaceId(String interfaceId) {
		this.interfaceId = interfaceId;
	}
	public String getInterfacePattern() {
		return interfacePattern;
	}
	public void setInterfacePattern(String interfacePattern) {
		this.interfacePattern = interfacePattern;
	}
	public String getOwnTeam() {
		return ownTeam;
	}
	public void setOwnTeam(String ownTeam) {
		this.ownTeam = ownTeam;
	}
	public String getOwnModule() {
		return ownModule;
	}
	public void setOwnModule(String ownModule) {
		this.ownModule = ownModule;
	}
	public String getSourceSystem() {
		return sourceSystem;
	}
	public void setSourceSystem(String sourceSystem) {
		this.sourceSystem = sourceSystem;
	}
	public String getTargetSystem() {
		return targetSystem;
	}
	public void setTargetSystem(String targetSystem) {
		this.targetSystem = targetSystem;
	}
	public String getRunYn() {
		return runYn;
	}
	public void setRunYn(String runYn) {
		this.runYn = runYn;
	}
	public String getInterfaceType() {
		return interfaceType;
	}
	public void setInterfaceType(String interfaceType) {
		this.interfaceType = interfaceType;
	}

}
