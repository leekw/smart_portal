package net.smart.web.changerequest.validator;

import java.util.List;
import java.util.Map;

import net.smart.web.domain.changerequest.ChangeRequestJira;
import net.smart.web.domain.changerequest.ChangeRequestLog;
import net.smart.web.domain.changerequest.ChangeRequestTarget;

import org.springframework.stereotype.Service;

@Service("duplicateVaildator")
public class DuplicateVaildator extends AbstractProgramValidator {

	@Override
	public void validate(ChangeRequestJira jira, ChangeRequestTarget target, List<ChangeRequestLog> logs, Map<String, ChangeRequestTarget> sources) {
		ChangeRequestTarget source = sources.get(target.getFileName());
		if (source != null && "I".equals(target.getMode())) {
			String temp = "중복 프로그램 존재";
			if (source.getUseFlag() != null && "미사용".equals(source.getUseFlag())) {
				temp = "삭제 프로그램 재 등록";
			}
			super.setChangeRequestLog("DUP", temp, jira, target, logs);
		}
	}

}
