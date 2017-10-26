package net.smart.web.changerequest.validator;

import java.util.Date;
import java.util.List;
import java.util.Map;

import net.smart.common.support.util.DateUtil;
import net.smart.web.domain.changerequest.ChangeRequestJira;
import net.smart.web.domain.changerequest.ChangeRequestLog;
import net.smart.web.domain.changerequest.ChangeRequestTarget;

import org.springframework.stereotype.Service;

@Service("dateValidator")
public class DateValidator extends AbstractProgramValidator {
	
	private final static String MAX_DEV_LIMIT = "2017-04-01";
	
	private void setChangeRequestDefaultalue(ChangeRequestTarget target, Map<String, ChangeRequestTarget> sources) {
		if ("I".equals(target.getMode())) {
			target.setApplyValue(1);
		} else if ("M".equals(target.getMode())) {
			ChangeRequestTarget source = sources.get(target.getIssueId());
			if (source != null) {
				if ((!source.getStartDateStr().equals(target.getStartDateStr()) || !source.getDueDateStr().equals(target.getDueDateStr()))) {
					target.setApplyValue(1);
				}
				target.setDoneRatio(source.getDoneRatio());
				target.setOldStartDate(source.getOldStartDate());
				target.setOldDueDate(source.getOldDueDate());
			}
		} else if ("D".equals(target.getMode())) {
			ChangeRequestTarget source = sources.get(target.getIssueId());
			if (source != null) {
				target.setDoneRatio(source.getDoneRatio());
				target.setOldStartDate(source.getOldStartDate());
				target.setOldDueDate(source.getOldDueDate());
			}
			target.setApplyValue(-1);
		}
	}

	@Override
	public void validate(ChangeRequestJira jira, ChangeRequestTarget target, List<ChangeRequestLog> logs, Map<String, ChangeRequestTarget> sources) {
		this.setChangeRequestDefaultalue(target, sources);
		String limitDate = super.getLimitDate(target.getTeam(), target.getModule(), target.getPhase(), target.getIteration());
		Date max = DateUtil.getDateByString(MAX_DEV_LIMIT, DateUtil.Format.YYYY_MM_DD.getValue());
		Date check = DateUtil.getDateByString(limitDate, DateUtil.Format.YYYY_MM_DD.getValue());
		Date nowWeekFirst = DateUtil.getNowByWeekFirstDay();
		Date nowWeekLast = DateUtil.getNowByWeekLastDay();
		if (target.getStartDate() != null && target.getDueDate() != null) {
			if (!"D".equals(target.getMode())) {
				if (check.compareTo(target.getDueDate()) == -1) {
					super.setChangeRequestLog("DATE", "개발 허용범위 초과.소위원회대상", jira, target, logs);
				}
				
				if (target.getDueDate().compareTo(target.getStartDate()) == -1) {
					super.setChangeRequestLog("DATE", "기간입력오류-완료기한이 시작일자 보다 과거임", jira, target, logs);
				}
				
				Date rangeDate = DateUtil.addDate(target.getStartDate() , 14);
				if (rangeDate.compareTo(target.getDueDate()) == -1) {
					super.setChangeRequestLog("DATE", "개발기간확인-개발일수가 14일 초과함", jira, target, logs);
				}				
				
				if (max.compareTo(target.getDueDate()) == -1) {
					super.setChangeRequestLog("DATE", "개발기간확인-최대개발기간 초과(2017.4.1)", jira, target, logs);
				}
			}
			
			if ("M".equals(target.getMode()) || "D".equals(target.getMode())) {
				if (DateUtil.isBetweenDate(nowWeekFirst, nowWeekLast, target.getStartDate())
						|| DateUtil.isBetweenDate(nowWeekFirst, nowWeekLast, target.getDueDate())) {
					super.setChangeRequestLog("DATE", "개발기간확인-금주 개발 대상 건", jira, target, logs);
				}
			}
			
			if ("I".equals(target.getMode())) {
				if (target.getDueDate().compareTo(nowWeekFirst) == -1 ) {
					List<String> temp = super.getChangeRequestService().getSvnFileList(target.getProgramId());
					if (temp != null && !temp.isEmpty()) {
						super.setChangeRequestLog("ETC", "과거 개발기간-SVN미존재 ", jira, target, logs);
					}
				}
				
			} else if ("M".equals(target.getMode())) {
				ChangeRequestTarget source = sources.get(target.getIssueId());
				if (source != null) {
					if (source.getDoneRatio() == 100
							&& (!source.getStartDateStr().equals(target.getStartDateStr()) || !source.getDueDateStr().equals(target.getDueDateStr()))
							) {
						super.setChangeRequestLog("DATE", "개발기간확인-진척도가 100%인 프로그램 기간 변경", jira, target, logs);
					}
					
					if ((!source.getStartDateStr().equals(target.getStartDateStr()) || !source.getDueDateStr().equals(target.getDueDateStr()))
							&& nowWeekFirst.compareTo(target.getDueDate()) == -1) {
						super.setChangeRequestLog("DATE", "개발기간확인-개발기간이 과거 일정임", jira, target, logs);
					}
				}
				
			} else if ("D".equals(target.getMode())) {
				ChangeRequestTarget source = sources.get(target.getIssueId());
				if (source != null) {
					if (source.getDoneRatio() == 100) {
						target.setUseFlag("미사용");
						super.setChangeRequestLog("ETC", "개발 완료건 삭제", jira, target, logs);
					} else {
						super.setChangeRequestLog("ETC", "PMSS 폐기 대상", jira, target, logs);
					}
				}
			}
		}
		
		
	}

}
