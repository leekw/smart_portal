package net.smart.web.task.dao;

import java.util.List;

import net.smart.web.domain.jira.GanttInfo;
import net.smart.web.domain.jira.Task;
import net.smart.web.domain.jira.TaskLink;

public interface TaskDao {
	
	public List<Task> getTaskList(GanttInfo param);
	
	public List<TaskLink> getTaskLinkList(GanttInfo param);
	
	public void addTask(Task param);
	
	public void modifyTask(Task param);
	
	public void removeTask(Task param);
	
	public void addTaskLink(TaskLink param);
	
	public void removeTaskLink(TaskLink param);

}
