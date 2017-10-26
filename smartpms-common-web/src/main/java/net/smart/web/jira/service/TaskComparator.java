package net.smart.web.jira.service;

import java.util.Comparator;

import net.smart.web.domain.jira.Task;

public class TaskComparator implements Comparator<Task> {

	@Override
	public int compare(Task o1, Task o2) {
		return o1.getText().compareTo(o2.getText());
	}

}
