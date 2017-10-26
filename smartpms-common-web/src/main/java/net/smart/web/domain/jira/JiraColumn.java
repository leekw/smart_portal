package net.smart.web.domain.jira;

import net.smart.common.domain.Common;

public class JiraColumn extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -9200466214928507163L;
	
	private String project;
	private long issueTypeId;
	private String issueTypeName;
	private String columnKey;
	private String columnName;
	private String columnType;
	
	public String getProject() {
		return project;
	}
	public void setProject(String project) {
		this.project = project;
	}
	public long getIssueTypeId() {
		return issueTypeId;
	}
	public void setIssueTypeId(long issueTypeId) {
		this.issueTypeId = issueTypeId;
	}
	public String getIssueTypeName() {
		return issueTypeName;
	}
	public void setIssueTypeName(String issueTypeName) {
		this.issueTypeName = issueTypeName;
	}
	public String getColumnKey() {
		return columnKey;
	}
	public void setColumnKey(String columnKey) {
		this.columnKey = columnKey;
	}
	public String getColumnName() {
		return columnName;
	}
	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}
	public String getColumnType() {
		return columnType;
	}
	public void setColumnType(String columnType) {
		this.columnType = columnType;
	}
}
