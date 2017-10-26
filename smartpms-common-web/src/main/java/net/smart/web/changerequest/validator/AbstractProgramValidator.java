package net.smart.web.changerequest.validator;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import net.smart.web.changerequest.service.ChangeRequestService;
import net.smart.web.domain.changerequest.ChangeRequestJira;
import net.smart.web.domain.changerequest.ChangeRequestLimit;
import net.smart.web.domain.changerequest.ChangeRequestLog;
import net.smart.web.domain.changerequest.ChangeRequestTarget;

import org.springframework.beans.factory.annotation.Autowired;

public abstract class AbstractProgramValidator implements ProgramValidator {
	
	@Autowired
	private ChangeRequestService changeRequestService;
	
	private Map<String, Map<String, ChangeRequestLimit>> limits;
	
	private final static String DEFAULT_LIMIT_DATE = "2016-01-31";
	
//	@PostConstruct
	public final void init() {
		
		limits = new HashMap<String, Map<String, ChangeRequestLimit>>();
		List<ChangeRequestLimit> temps = changeRequestService.getChangeRequestLimit(new ChangeRequestLimit());
		
		for (ChangeRequestLimit obj : temps) {
			Map<String, ChangeRequestLimit> data = limits.get(obj.getTeam());
			if (data == null) {
				data = new HashMap<String, ChangeRequestLimit>();
			}
			data.put(obj.getModule() + "/" + obj.getPhase() + "/" + obj.getIteration(), obj);
			if (!limits.containsKey(obj.getTeam())) limits.put(obj.getTeam(), data);
		}
	}
	
	protected final String getLimitDate(String team, String module, String phase, String iteration) {
		String result = null;
		Map<String, ChangeRequestLimit> data = limits.get(team);
		if (data == null) result = DEFAULT_LIMIT_DATE;
		if ("Order".equals(team)) {
			if (data != null) {
				ChangeRequestLimit temp = data.get("ANY" + "/" + phase + "/" + iteration);
				if (temp != null)
					result = data.get("ANY" + "/" + phase + "/" + iteration).getLimitDate();
			}
		} else {
			if (data != null) {
				ChangeRequestLimit temp = data.get(module + "/" + phase + "/" + iteration);
				if (temp != null)
					result = temp.getLimitDate();
			}
		}
		return result == null ? DEFAULT_LIMIT_DATE : result;
	}
	
	protected final ChangeRequestService getChangeRequestService() {
		return this.changeRequestService;
	}
	
	protected final void setChangeRequestLog(String type, String message, ChangeRequestJira jira, ChangeRequestTarget target, List<ChangeRequestLog> logs) {
		ChangeRequestLog log = new ChangeRequestLog();
		log.setJiraId(jira.getJiraId());
		log.setIssueId(target.getIssueId());
		log.setTeam(target.getTeam());
		log.setLogMessage(message);
		log.setLogType(type);
		logs.add(log);
	}
	
}
