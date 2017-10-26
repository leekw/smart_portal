package net.smart.web.task.service;

import net.smart.web.domain.jira.GanttInfo;
import net.smart.web.domain.jira.Task;
import net.smart.web.domain.jira.TaskLink;

public interface TaskService {
	
	public GanttInfo getTaskGantt(GanttInfo param);
	
	public void addTask(Task param);
	
	public void modifyTask(Task param);
	
	public void removeTask(Task param);
	
	public void addTaskLink(TaskLink param);
	
	public void removeTaskLink(TaskLink param);
	
	public boolean getVaildModifyTask(String taskType);
	
	public void modifyCompleteTask(String taskType);

}
