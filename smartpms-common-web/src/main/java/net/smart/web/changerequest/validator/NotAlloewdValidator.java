package net.smart.web.changerequest.validator;

import java.util.List;
import java.util.Map;

import net.smart.web.domain.changerequest.ChangeRequestJira;
import net.smart.web.domain.changerequest.ChangeRequestLog;
import net.smart.web.domain.changerequest.ChangeRequestTarget;

import org.springframework.stereotype.Service;

@Service("notAlloewdValidator")
public class NotAlloewdValidator extends AbstractProgramValidator {

	@Override
	public void validate(ChangeRequestJira jira, ChangeRequestTarget target, List<ChangeRequestLog> logs, Map<String, ChangeRequestTarget> sources) {
		ChangeRequestTarget source = sources.get(String.valueOf(target.getIssueId()));
		if ("M".equals(target.getMode())
				|| "D".equals(target.getMode())) {
			if (source == null) {
				super.setChangeRequestLog("FORMAT", "IssueID가 PMSS에 미 존재 ", jira, target, logs);
			} else {
				if (!source.getProgramId().equals(target.getProgramId())) {
					super.setChangeRequestLog("FORMAT", "입력된 IssueID와 ProgramId가 불일치", jira, target, logs);
				}
			}
		}
		
		if ("D".equals(target.getMode())) {
			List<String> temp = super.getChangeRequestService().getSvnFileList(target.getProgramId());
			if (temp != null && !temp.isEmpty()) {
				super.setChangeRequestLog("ETC", "삭제대상-SVN미존재 ", jira, target, logs);
			}
		}
		
		if ("M".equals(target.getMode())) {
			if (source != null) {
				if (target.getTeam() != null && !source.getTeam().equals(target.getTeam())) {
					super.setChangeRequestLog("FORMAT", "팀 정보가 변경됨.(변경불가)", jira, target, logs);
				}
				
				if (target.getTeam() != null && target.getModule() != null && !"Order".equals(target.getTeam())
						&& !source.getModule().equals(target.getModule())) {
					super.setChangeRequestLog("FORMAT", "모듈 정보가 변경됨.(Order만 가능)", jira, target, logs);
				}
				
			}
		}
	}
	
}
