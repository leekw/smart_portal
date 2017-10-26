package net.smart.web.task.controller;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.annotation.IntegrationResponse;
import net.smart.web.domain.jira.GanttInfo;
import net.smart.web.domain.jira.Task;
import net.smart.web.domain.jira.TaskLink;
import net.smart.web.task.service.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class TaskController {
	
	@Autowired
	private TaskService taskService;
	
	@RequestMapping(value = "/task/gantt/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="gantt")
	public GanttInfo getTaskGantt(@IntegrationRequest GanttInfo param) {
		return taskService.getTaskGantt(param);
	}
	
	@RequestMapping(value = "/task/gantt/add.{metadataType}", method = RequestMethod.POST)
	public void addTask(@IntegrationRequest Task param) {
		taskService.addTask(param);
	}
	
	@RequestMapping(value = "/task/gantt/modify.{metadataType}", method = RequestMethod.POST)
	public void modifyTask(@IntegrationRequest Task param) {
		taskService.modifyTask(param);
	}
	
	@RequestMapping(value = "/task/gantt/remove.{metadataType}", method = RequestMethod.POST)
	public void removeTask(@IntegrationRequest Task param) {
		taskService.removeTask(param);
	}
	
	@RequestMapping(value = "/task/link/add.{metadataType}", method = RequestMethod.POST)
	public void addTaskLink(@IntegrationRequest TaskLink param) {
		taskService.addTaskLink(param);
	}
	
	@RequestMapping(value = "/task/link/remove.{metadataType}", method = RequestMethod.POST)
	public void removeTaskLink(@IntegrationRequest TaskLink param) {
		taskService.removeTaskLink(param);
	}
	
	@RequestMapping(value = "/task/edit.{metadataType}", method = RequestMethod.POST)
	public void editTaskActive(@IntegrationRequest Task param) {
		
	}

}
