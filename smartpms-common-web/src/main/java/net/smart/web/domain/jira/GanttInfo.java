package net.smart.web.domain.jira;

import java.util.List;

public class GanttInfo {
	
	private List<TaskLink> links;
	private List<Task> data;
	private String taskType;
	private String startDate;
	private String endDate;
	private String searchValue;
	private String selectedTask;
	private String searchTask;
	private String exposureType;
	
	public String getExposureType() {
		return exposureType;
	}
	public void setExposureType(String exposureType) {
		this.exposureType = exposureType;
	}
	public String getSearchTask() {
		return searchTask;
	}
	public void setSearchTask(String searchTask) {
		this.searchTask = searchTask;
	}
	public String getSelectedTask() {
		return selectedTask;
	}
	public void setSelectedTask(String selectedTask) {
		this.selectedTask = selectedTask;
	}
	public String getSearchValue() {
		return searchValue;
	}
	public void setSearchValue(String searchValue) {
		this.searchValue = searchValue;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getTaskType() {
		return taskType;
	}
	public void setTaskType(String taskType) {
		this.taskType = taskType;
	}
	public List<TaskLink> getLinks() {
		return links;
	}
	public void setLinks(List<TaskLink> links) {
		this.links = links;
	}
	public List<Task> getData() {
		return data;
	}
	public void setData(List<Task> data) {
		this.data = data;
	}

	
}
