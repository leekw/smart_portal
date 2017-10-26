package net.smart.web.task.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import javax.annotation.PostConstruct;

import net.smart.web.domain.jira.GanttInfo;
import net.smart.web.domain.jira.Task;
import net.smart.web.domain.jira.TaskLink;
import net.smart.web.task.dao.TaskDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("taskService")
public class TaskServiceImpl implements TaskService {
	
	@Autowired
	private TaskDao taskDao;
	
	private AtomicInteger sync = new AtomicInteger(0);
	
	private Map<String, String> contextData;
	
	@PostConstruct
	private void init() {
		contextData = new HashMap<String, String>();
	}

	@Override
	public GanttInfo getTaskGantt(GanttInfo param) {
		GanttInfo result = new GanttInfo();
		Map<String, String> closeData = new HashMap<String, String>();
		Map<String, List<TaskLink>> linkData = new HashMap<String, List<TaskLink>>();
		Map<String, String> searchTarget = new HashMap<String, String>();
		List<Task> tasks = taskDao.getTaskList(param);
		List<TaskLink> links = taskDao.getTaskLinkList(param);
		if (param.getSearchValue() != null && !"".equals(param.getSearchValue())) {
			for (TaskLink link : links) {
				List<TaskLink> temps = linkData.get(link.getSource());
				if (temps == null) {
					temps = new ArrayList<TaskLink>();
					linkData.put(link.getSource(), temps);
				}
				temps.add(link);
			}
		}
		
		for (Task task : tasks) {
			if (param.getTaskType() != null
					&& !"PROJECT".equals(param.getTaskType())) {
				if(!closeData.containsKey(task.getCloseId())) {
					closeData.put(task.getCloseId(), task.getCloseId());
				}
			}
			if (param.getSearchValue() != null && !"".equals(param.getSearchValue())) {
				if (task.getText().indexOf(param.getSearchValue()) != -1) {
					searchTarget.put(task.getId(), task.getId());
					if (linkData.get(task.getId()) != null && !linkData.get(task.getId()).isEmpty()) {
						for (TaskLink link : linkData.get(task.getId())) {
							searchTarget.put(link.getTarget(), link.getTarget());
						}
					}
				}
			}
		}
		for (Task task :  tasks) {
			if (task.getColor() != null 
					&& !task.getColor().equals("")
					&& (task.getColor().equals("#FFFFF0")
							|| task.getColor().equals("#EBEBEB")
							|| task.getColor().equals("#B0C4DE")
							|| task.getColor().equals("#F0E68C")
							|| task.getColor().equals("#F2F2F2")
							|| task.getColor().equals("#F0E68C")
							|| task.getColor().equals("#E6B9B8")
							|| task.getColor().equals("#cacaca")
							|| task.getColor().equals("#7D7D7D"))) {
				task.setTextColor("#000000");
			}
			if (param.getSearchValue() != null && !"".equals(param.getSearchValue())) {
				if (!searchTarget.containsKey(task.getId())) {
					task.setColor("#c0c0c0");
				} else {
					if (!task.isLeaf()) {
						if (result.getSelectedTask() == null) result.setSelectedTask(task.getId());
					}
				}
			}
			if (closeData.containsKey(task.getId())) {
				task.setOpen(false);
			}
			if (param.getSearchTask() == null 
					&& task.getCloseYn() != null && "Y".equals(task.getCloseYn())) {
				task.setOpen(false);
			}
		}
		
		result.setData(tasks);
		result.setLinks(links);
		return result;
	}

	@Override
	public void addTask(Task param) {
		taskDao.addTask(param);
	}

	@Override
	public void modifyTask(Task param) {
		taskDao.modifyTask(param);
	}

	@Override
	public void removeTask(Task param) {
		taskDao.removeTask(param);
	}

	@Override
	public void addTaskLink(TaskLink param) {
		taskDao.addTaskLink(param);
	}

	@Override
	public void removeTaskLink(TaskLink param) {
		taskDao.removeTaskLink(param);
	}

	@Override
	public boolean getVaildModifyTask(String taskType) {
		if (contextData.containsKey(taskType)) 
			return false;
		synchronized(sync) {
			contextData.put(taskType, taskType);
		}
		return true;
	}

	@Override
	public void modifyCompleteTask(String taskType) {
		synchronized(sync) {
			contextData.remove(taskType);
		}
	}

}
