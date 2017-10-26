package net.smart.web.changerequest.validator;

import java.util.List;
import java.util.Map;

import net.smart.web.domain.changerequest.ChangeRequestJira;
import net.smart.web.domain.changerequest.ChangeRequestLog;
import net.smart.web.domain.changerequest.ChangeRequestTarget;

public interface ProgramValidator {
	
	public void validate(ChangeRequestJira jira, ChangeRequestTarget target, List<ChangeRequestLog> logs, Map<String, ChangeRequestTarget> sources);

}
