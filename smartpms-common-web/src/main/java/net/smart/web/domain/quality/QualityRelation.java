package net.smart.web.domain.quality;

import net.smart.common.domain.Common;

public class QualityRelation extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2534696721527921217L;
	
	private String source;
	private String sourceFile;
	private String target;
	private String targetFile;
	private String relationName;
	private String targetExistYn;
	private String targetKey;
	private String jiraId;
	private String jiraProgramId;
	private String e2eAsset;
	private String sourceKey;
	private String sourceSubKey;
	private String targetSubKey;
	private String sourceWork;
	private String targetWork;
	
	
	public String getSourceWork() {
		return sourceWork;
	}
	public void setSourceWork(String sourceWork) {
		this.sourceWork = sourceWork;
	}
	public String getTargetWork() {
		return targetWork;
	}
	public void setTargetWork(String targetWork) {
		this.targetWork = targetWork;
	}
	public String getSourceSubKey() {
		return sourceSubKey;
	}
	public void setSourceSubKey(String sourceSubKey) {
		this.sourceSubKey = sourceSubKey;
	}
	public String getTargetSubKey() {
		return targetSubKey;
	}
	public void setTargetSubKey(String targetSubKey) {
		this.targetSubKey = targetSubKey;
	}
	public String getSourceKey() {
		return sourceKey;
	}
	public void setSourceKey(String sourceKey) {
		this.sourceKey = sourceKey;
	}
	public String getJiraId() {
		return jiraId;
	}
	public void setJiraId(String jiraId) {
		this.jiraId = jiraId;
	}
	public String getJiraProgramId() {
		return jiraProgramId;
	}
	public void setJiraProgramId(String jiraProgramId) {
		this.jiraProgramId = jiraProgramId;
	}
	public String getE2eAsset() {
		return e2eAsset;
	}
	public void setE2eAsset(String e2eAsset) {
		this.e2eAsset = e2eAsset;
	}
	public String getTargetKey() {
		return targetKey;
	}
	public void setTargetKey(String targetKey) {
		this.targetKey = targetKey;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getSourceFile() {
		return sourceFile;
	}
	public void setSourceFile(String sourceFile) {
		this.sourceFile = sourceFile;
	}
	public String getTarget() {
		return target;
	}
	public void setTarget(String target) {
		this.target = target;
	}
	public String getTargetFile() {
		return targetFile;
	}
	public void setTargetFile(String targetFile) {
		this.targetFile = targetFile;
	}
	public String getRelationName() {
		return relationName;
	}
	public void setRelationName(String relationName) {
		this.relationName = relationName;
	}
	public String getTargetExistYn() {
		return targetExistYn;
	}
	public void setTargetExistYn(String targetExistYn) {
		this.targetExistYn = targetExistYn;
	}
}
