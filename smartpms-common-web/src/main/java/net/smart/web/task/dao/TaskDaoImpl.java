package net.smart.web.task.dao;

import java.util.List;

import net.smart.common.support.dao.SmartSqlSessionDaoSupport;
import net.smart.web.domain.jira.GanttInfo;
import net.smart.web.domain.jira.Task;
import net.smart.web.domain.jira.TaskLink;

import org.springframework.stereotype.Repository;

@Repository
public class TaskDaoImpl extends SmartSqlSessionDaoSupport implements TaskDao {

	@Override
	public List<Task> getTaskList(GanttInfo param) {
		return getSqlSession().selectList("task.selectTaskList", param);
	}

	@Override
	public List<TaskLink> getTaskLinkList(GanttInfo param) {
		return getSqlSession().selectList("task.selectTaskLinkList", param);
	}

	@Override
	public void addTask(Task param) {
		getSqlSession().insert("task.insertTask", param);
	}

	@Override
	public void modifyTask(Task param) {
		getSqlSession().update("task.updateTask", param);
	}

	@Override
	public void removeTask(Task param) {
		getSqlSession().delete("task.deleteTask", param);
	}

	@Override
	public void addTaskLink(TaskLink param) {
		getSqlSession().insert("task.insertTaskLink", param);
	}

	@Override
	public void removeTaskLink(TaskLink param) {
		getSqlSession().delete("task.deleteTaskLink", param);
	}

}
