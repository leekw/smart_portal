package net.smart.web.domain.portal;

import java.util.List;

import net.smart.common.domain.Common;

public class ParentPortal extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -623258182968712646L;
	private List<PortalData> insertList;
	private List<PortalData> updateList;
	private List<PortalData> deleteList;
	private String processDay;
	private String processType;
	
	
	public String getProcessType() {
		return processType;
	}
	public void setProcessType(String processType) {
		this.processType = processType;
	}
	public String getProcessDay() {
		return processDay;
	}
	public void setProcessDay(String processDay) {
		this.processDay = processDay;
	}
	public List<PortalData> getInsertList() {
		return insertList;
	}
	public void setInsertList(List<PortalData> insertList) {
		this.insertList = insertList;
	}
	public List<PortalData> getUpdateList() {
		return updateList;
	}
	public void setUpdateList(List<PortalData> updateList) {
		this.updateList = updateList;
	}
	public List<PortalData> getDeleteList() {
		return deleteList;
	}
	public void setDeleteList(List<PortalData> deleteList) {
		this.deleteList = deleteList;
	}
	

}
