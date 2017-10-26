package net.smart.web.changerequest.validator;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import net.smart.common.support.util.DateUtil;
import net.smart.web.domain.changerequest.ChangeRequestJira;
import net.smart.web.domain.changerequest.ChangeRequestLog;
import net.smart.web.domain.changerequest.ChangeRequestTarget;

import org.springframework.stereotype.Service;

@Service("codeValueValidator")
public class CodeValueValidator extends AbstractProgramValidator {
	
	private Map<String, Map<String, String>> teams;
	private Map<String, String> phases;
	private Map<String, String> iterations;
	private Map<String, String> programSmallType;
	
//	@PostConstruct
	private void initValid() {
		teams = new HashMap<String, Map<String, String>>();
		phases = new HashMap<String, String>(4);
		iterations = new HashMap<String, String>(3);
		programSmallType = new HashMap<String, String>();
		
		Map<String, String> module = null;
		
		module  = new HashMap<String, String>();
		module.put("ANY", "ANY");
		teams.put("CDM", module);
		
		module  = new HashMap<String, String>();
		module.put("ANY", "ANY");
		teams.put("AUTH", module);

		module  = new HashMap<String, String>();
		module.put("청구", "청구");
		module.put("AR", "AR");
		module.put("BCOL", "BCOL");
		teams.put("Billing", module);		
		
		module  = new HashMap<String, String>();
		module.put("결합", "결합");
		module.put("계약", "계약");
		module.put("기기", "기기");
		module.put("상품", "상품");
		module.put("신규", "신규");
		module.put("인터넷", "인터넷");
		module.put("무선상품", "무선상품");
		module.put("유선공통", "유선공통");
		module.put("IPTV", "IPTV");
		module.put("PSTN/WiFi UI 웹화", "PSTN/WiFi UI 웹화");
		module.put("SOIP", "SOIP");
		module.put("WiBro", "WiBro");
		teams.put("Order", module);
		
		module  = new HashMap<String, String>();
		module.put("ANY", "ANY");
		teams.put("DIH", module);
		
		module  = new HashMap<String, String>();
		module.put("ANY", "ANY");
		teams.put("SA", module);
		
		
		phases.put("PA1-1", "PA1-1");
		phases.put("PA1-2", "PA1-2");
		phases.put("PA2", "PA2");
		phases.put("PA3", "PA3");
		
		iterations.put("I1", "I1");
		iterations.put("I2", "I2");
		iterations.put("I3", "I3");
		
		programSmallType.put("BO", "BO");
		programSmallType.put("BOC", "BOC");
		programSmallType.put("SO", "SO");
		programSmallType.put("JO", "JO");
		programSmallType.put("DO", "DO");
	}

	@Override
	public void validate(ChangeRequestJira jira, ChangeRequestTarget target, List<ChangeRequestLog> logs, Map<String, ChangeRequestTarget> sources) {
		StringBuffer sb = new StringBuffer();
		String temp = null;
		if (target.getTeam() != null && !teams.containsKey(target.getTeam())) {
			sb.append("팀").append("/");
		} else {
			temp = teams.get(target.getTeam()).get("ANY");
			if (target.getModule() != null 
					&& temp == null && !teams.get(target.getTeam()).containsKey(target.getModule())) {
				sb.append("모듈").append("/");
			}
		}		
		if (target.getPhase() != null && !phases.containsKey(target.getPhase())) {
			sb.append("Phase").append("/");
		}
		
		if (target.getIteration() != null && !iterations.containsKey(target.getIteration())) {
			sb.append("Iteration").append("/");
		}
		
		if (target.getProgramSmallType() != null 
				&& target.getProgramId() != null && programSmallType.containsKey(target.getProgramSmallType())) {
			if (!target.getProgramId().endsWith(target.getProgramSmallType())) {
				sb.append("프로그램명(영문)").append("/");
			}
		}
		
		if (target.getStartDateStr() != null) {
			Date dateTemp = DateUtil.getDateByString(target.getStartDateStr(), DateUtil.Format.YYYY_MM_DD.getValue());
			if (dateTemp == null) {
				sb.append("시작일자 (YYYY-MM-DD)").append("/");
			}
		}
		
		if (target.getDueDateStr() != null) {
			Date dateTemp = DateUtil.getDateByString(target.getDueDateStr(), DateUtil.Format.YYYY_MM_DD.getValue());
			if (dateTemp == null) {
				sb.append("완료기한 (YYYY-MM-DD)").append("/");
			}
		}
		
		if (sb.length() > 1) {
			sb.append("이 표준 입력 형식과 다릅니다.");
			super.setChangeRequestLog("FORMAT", sb.toString(), jira, target, logs);
		}
		
		
		
	}

}
