package net.smart.web.changerequest.validator;

import java.util.List;
import java.util.Map;

import net.smart.web.domain.changerequest.ChangeRequestJira;
import net.smart.web.domain.changerequest.ChangeRequestLog;
import net.smart.web.domain.changerequest.ChangeRequestTarget;

import org.springframework.stereotype.Service;

@Service("requiredValueProgramValidator")
public class RequiredValueProgramValidator extends AbstractProgramValidator {

	@Override
	public void validate(ChangeRequestJira jira, ChangeRequestTarget target, List<ChangeRequestLog> logs, Map<String, ChangeRequestTarget> sources) {
		String field = "";
		if ("I".equals(target.getMode())) {
			
			if (target.getTeam() == null)  field = "팀";
			if (target.getModule() == null)  field += "/모듈";
			if (target.getSubModule() == null)  field += "/서브모듈";
			if (target.getProgramType() == null)  field = "/대분류";
			if (target.getProgramSmallType() == null)  field += "/소분류";
			if (target.getProgramName() == null)  field += "/프로그램명(한글)";
			if (target.getProgramId() == null)  field += "/프로그램명(영문)";
			if (target.getDeveloper() == null)  field += "/개발자";
			if (target.getStartDateStr() == null)  field += "/시작일자";
			if (target.getDueDateStr() == null)  field += "/완료기한";
			if (target.getPhase()  == null)  field += "/Phase";
			if (target.getIteration() == null)  field += "/Iteration";
			if (target.getSrFlag() != null && target.getSrNo() == null)  field += "/SR NO.";
			
			if ((("CDM".equals(target.getTeam())  && "대외연동".equals(target.getModule()))
					|| "DIH".equals(target.getTeam()))
					&& target.getInterfaceId() == null) {
				field += "/Interface ID";
			}
			
		} else {
			if (target.getIssueId() == 0) field += "/IssueId";
			if (target.getCrReason() == null) field += "/미사용 사유";
		}
		
		
		if (!"".equals(field)) {
			super.setChangeRequestLog("REQUIRED", field + " 컬럼 값 없음", jira, target, logs);
		}
	}

}
