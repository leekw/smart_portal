package net.smart.web.changerequest.service;

import net.smart.common.exception.BizException;
import net.smart.common.service.SmartCommonService;
import net.smart.common.support.util.DateUtil;
import net.smart.web.changerequest.dao.ChangeRequestDao;
import net.smart.web.changerequest.dao.IntegrationChangeRequestDao;
import net.smart.web.changerequest.dao.SourceChangeRequestDao;
import net.smart.web.changerequest.validator.ProgramValidator;
import net.smart.web.code.service.CodeService;
import net.smart.web.domain.changerequest.*;
import net.smart.web.resource.service.OrgService;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;

@Service("changeRequestService")
public class ChangeRequestServiceImpl implements ChangeRequestService {

	@Autowired
	private ChangeRequestDao changeRequestDao;

	@Autowired
	private IntegrationChangeRequestDao integrationChangeRequestDao;


	@Autowired
	private SmartCommonService integrationCommonService;

	@Autowired
	private CodeService codeService;

	@Autowired
	private OrgService orgService;


	private List<ProgramValidator> validators;

	@Autowired
	private SourceChangeRequestDao sourceChageRequestDao;

	@Autowired
	public void setValidators(List<ProgramValidator> validators) {
		this.validators = validators;
	}

	@Override
	public List<ChangeRequestItem> getChangeRequestTartgetList(
			ChangeRequestItem param) {
		if (param.isFilterUser()) {
			param.setCommitAuthor(integrationCommonService.getSessionUserId());
		}
		return changeRequestDao.getChangeRequestTartgetList(param);
	}

	@Override
	public List<ChangeRequestComboInfo> getRepositoryComboList(
			ChangeRequestComboInfo param) {
		return changeRequestDao.getRepositoryComboList(param);
	}

	@Override
	public List<ChangeRequestComboInfo> getJiraComboList(
			ChangeRequestComboInfo param) {
		return null;
	}

	@Override
	public void modifyChangeRequestJira(List<ChangeRequestItem> params) {
		String sessionUserId = integrationCommonService.getSessionUserId();
		changeRequestDao.modifyChangeRequestJira(params, sessionUserId);
	}

	@Override
	public String getSvnValidationCheckYn() {
		return changeRequestDao.getSvnValidationCheckYn();
	}

	@Override
	public void updateSvnValidationCheckYn(String svnCheckYn) {
		changeRequestDao.updateSvnValidationCheckYn(svnCheckYn);
	}

	@Override
	public List<ChangeRequestJira> getChangeRequestJiraList(
			ChangeRequestJira param) {
		return null;
	}

	@Override
	public List<ChangeRequestTarget> getProgramListByJiraId(
			ChangeRequestTarget param) {
		return integrationChangeRequestDao.getProgramListByJiraId(param);
	}

	@Override
	public List<ChangeRequestTarget> getSourceProgramList(
			ChangeRequestTarget param) {
		if (param.getTeam() != null)
			param.setTeam(orgService.getOrgName(param.getTeam()));
		if (param.getModule() != null)
			param.setModule(orgService.getOrgName(param.getModule()));
		if (param.getIteration() != null)
			param.setIteration(codeService.getCodeName("ITER",
					param.getIteration()));
		if (param.getPhase() != null)
			param.setPhase(codeService.getCodeName("PA_TYPE", param.getPhase()));
		return sourceChageRequestDao.getSourceProgramList(param);
	}

	@Override
	@Transactional
	public void addChangeRequest(ChangeRequestJira param) {
		if (param.getJiraId() != null && !"".equals(param.getJiraId())) {
			this.updateChangeRequestJira(param);
		} else {
			this.createChangeRequestJira(param);
		}
		String excelFilePath = this.saveProgramListExcel(param);
		boolean isVaildAttach = this.addAttchmentToIssue(param.getJiraId(),
				excelFilePath);
		if (!isVaildAttach) {
			throw new BizException("ERROR.0001",
					"WBS-CR요청 중 오류가 발생되었습니다.(파일첨부 오류)\n관리자에게 문의하시기 바랍니다.");
		}
		integrationChangeRequestDao.mergeChangeRequestJira(param);
		integrationChangeRequestDao.removeChangeProgram(param);
		integrationChangeRequestDao.addChangeProgram(param);
	}

	private String saveProgramListExcel(ChangeRequestJira param) {
		HSSFCellStyle titleStyle = null;
		HSSFFont titleFont = null;
		HSSFCellStyle contentStyle = null;
		HSSFFont contentFont = null;
		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFSheet sheet = workbook.createSheet();
		titleStyle = workbook.createCellStyle();
		titleStyle.setFillForegroundColor(HSSFColor.PALE_BLUE.index);
		titleStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		titleStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);

		titleFont = workbook.createFont();
		titleFont.setFontName(HSSFFont.FONT_ARIAL);
		titleStyle.setFont(titleFont);

		contentStyle = workbook.createCellStyle();
		contentStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);

		contentFont = workbook.createFont();
		contentFont.setFontName(HSSFFont.FONT_ARIAL);
		contentStyle.setFont(contentFont);

		int rowIndex = 0;
		int no = 0;
		HSSFRow row = null;
		HSSFCell cell = null;
		row = sheet.createRow(rowIndex++);

		this.setExcelTitle(row, cell, titleStyle);

		for (ChangeRequestTarget obj : param.getTargets()) {
			row = sheet.createRow(rowIndex++);
			this.translateProgramInfo(obj);
			this.setExcelContent(obj, sheet, row, cell, contentStyle, ++no);
		}

		String filePath = null;
		return filePath;
	}

	private void translateProgramInfo(ChangeRequestTarget obj) {
		String temp;
		obj.setMode(obj.getMode().equals("M") ? "변경" : obj.getMode()
				.equals("I") ? "신규" : "삭제");
		temp = codeService.getCodeName("PG_TYPE", obj.getProgramType());
		obj.setProgramType(temp == null ? obj.getProgramType() : temp);
		temp = codeService.getCodeName("PG_SM_TYPE", obj.getProgramSmallType());
		obj.setProgramSmallType(temp == null ? obj.getProgramSmallType() : temp);

		temp = codeService.getCodeName("ITER", obj.getIteration());
		obj.setIteration(temp == null ? obj.getIteration() : temp);

		temp = codeService.getCodeName("PA_TYPE", obj.getPhase());
		obj.setPhase(temp == null ? obj.getPhase() : temp);

		temp = codeService.getCodeName("SR_FLAG", obj.getSrFlag());
		obj.setSrFlag(temp == null ? obj.getSrFlag() : temp);

		temp = orgService.getOrgName(obj.getTeam());
		obj.setTeam(temp == null ? obj.getTeam() : temp);

		temp = orgService.getOrgName(obj.getModule());
		obj.setModule(temp == null ? obj.getModule() : temp);

		if (obj.getIssueId() == 0) {
			obj.setIssueId(integrationChangeRequestDao.getProgramNextIssueId());
		}

	}

	private void setExcelContent(ChangeRequestTarget obj, HSSFSheet sheet,
			HSSFRow row, HSSFCell cell, HSSFCellStyle contentStyle, int rowIndex) {
		int index = 0;
		cell = row.createCell(index++);
		cell.setCellValue(rowIndex);
		cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
		cell.setCellValue(obj.getMode());
		cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
		cell.setCellValue(obj.getTask());
		cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
		cell.setCellValue(obj.getTaskDetail());
		cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
		cell.setCellValue(obj.getProgramId());
		cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
		cell.setCellValue(obj.getProgramName());
		cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
		cell.setCellValue(obj.getInterfaceId());
		cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
		cell.setCellValue(obj.getProgramType());
		cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
		cell.setCellValue(obj.getProgramSmallType());
		cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
		cell.setCellValue(obj.getDeveloper());
		cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
		cell.setCellValue(obj.getStartDateStr());
		cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
		cell.setCellValue(obj.getDueDateStr());
		cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
		cell.setCellValue(obj.getPhase());
		cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
		cell.setCellValue(obj.getIteration());
		cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
		cell.setCellValue(obj.getSrFlag());
		cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
		cell.setCellValue(obj.getSrNo());
		cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
		cell.setCellValue(obj.getTeam());
		cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
		cell.setCellValue(obj.getModule());
		cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
		cell.setCellValue(obj.getSubModule());
		cell.setCellStyle(contentStyle);
		cell = row.createCell(index++);
		cell.setCellValue(obj.getCrReason());
		cell.setCellStyle(contentStyle);
		this.setAutSize(sheet, index);
	}

	private void setAutSize(HSSFSheet sheet, int index) {
		for (int i = 0; i < index; i++) {
			sheet.autoSizeColumn(i);
		}
	}

	private void setExcelTitle(HSSFRow row, HSSFCell cell,
			HSSFCellStyle titleStyle) {
		int index = 0;
		cell = row.createCell(index++);
		cell.setCellValue("No");
		cell.setCellStyle(titleStyle);
		cell = row.createCell(index++);
		cell.setCellValue("요청유형");
		cell.setCellStyle(titleStyle);
		cell = row.createCell(index++);
		cell.setCellValue("Task");
		cell.setCellStyle(titleStyle);
		cell = row.createCell(index++);
		cell.setCellValue("업무명");
		cell.setCellStyle(titleStyle);
		cell = row.createCell(index++);
		cell.setCellValue("프로그램명(영문)");
		cell.setCellStyle(titleStyle);
		cell = row.createCell(index++);
		cell.setCellValue("프로그램명(한글)");
		cell.setCellStyle(titleStyle);
		cell = row.createCell(index++);
		cell.setCellValue("인터페이스ID");
		cell.setCellStyle(titleStyle);
		cell = row.createCell(index++);
		cell.setCellValue("대분류");
		cell.setCellStyle(titleStyle);
		cell = row.createCell(index++);
		cell.setCellValue("소분류");
		cell.setCellStyle(titleStyle);
		cell = row.createCell(index++);
		cell.setCellValue("개발자");
		cell.setCellStyle(titleStyle);
		cell = row.createCell(index++);
		cell.setCellValue("시작일자");
		cell.setCellStyle(titleStyle);
		cell = row.createCell(index++);
		cell.setCellValue("완료일자");
		cell.setCellStyle(titleStyle);
		cell = row.createCell(index++);
		cell.setCellValue("Phase");
		cell.setCellStyle(titleStyle);
		cell = row.createCell(index++);
		cell.setCellValue("Iteration");
		cell.setCellStyle(titleStyle);
		cell = row.createCell(index++);
		cell.setCellValue("SR여부");
		cell.setCellStyle(titleStyle);
		cell = row.createCell(index++);
		cell.setCellValue("SR번호");
		cell.setCellStyle(titleStyle);
		cell = row.createCell(index++);
		cell.setCellValue("팀");
		cell.setCellStyle(titleStyle);
		cell = row.createCell(index++);
		cell.setCellValue("모듈");
		cell.setCellStyle(titleStyle);
		cell = row.createCell(index++);
		cell.setCellValue("서브모듈");
		cell.setCellStyle(titleStyle);
		cell = row.createCell(index++);
		cell.setCellValue("요청사유");
		cell.setCellStyle(titleStyle);
	}

	private boolean addAttchmentToIssue(String issueKey, String filePath) {
		return false;
	}

	private void updateChangeRequestJira(ChangeRequestJira param) {

	}

	private void createChangeRequestJira(ChangeRequestJira param) {

	}

	@Override
	@Transactional
	public void validateChangeRequestJiraFile(ChangeRequestJira param) {
		FileInputStream fis = null;
		XSSFWorkbook workbook = null;
		try {
			fis = new FileInputStream(param.getTargetFilePath());
		} catch (FileNotFoundException e) {
			throw new BizException("ERROR.0001", "파일이 존재하지 않습니다.");
		}
		try {
			workbook = new XSSFWorkbook(fis);
		} catch (IOException e) {
			throw new BizException("ERROR.0001",
					"엑셀 Parsing 중 오류가 발샐되었습니다.");
		}
		List<XSSFSheet> sheets = new ArrayList<XSSFSheet>();
		sheets.add(workbook.getSheet("신규"));
		sheets.add(workbook.getSheet("변경(후)"));
		sheets.add(workbook.getSheet("삭제"));

		List<ChangeRequestTarget> targets = new ArrayList<ChangeRequestTarget>();
		List<ChangeRequestLog> logs = new ArrayList<ChangeRequestLog>();
		Map<String, ChangeRequestTarget> sources = new HashMap<String, ChangeRequestTarget>();

		for (XSSFSheet sheet : sheets) {
			int rows = sheet.getPhysicalNumberOfRows();
			for (int rowIndex = 3; rowIndex < rows; rowIndex++) {
				XSSFRow row = sheet.getRow(rowIndex);
				if (row != null) {
					ChangeRequestTarget target = new ChangeRequestTarget();
					target.setMode(this.getChangeRequestMode(row));
					this.setChangeRequestTargetByExcel(target, row);
					if (target.getTeam() == null && target.getModule() == null
							&& target.getProgramType() == null
							&& target.getProgramSmallType() == null
							&& target.getProgramName() == null
							&& target.getFileName() == null
							&& target.getStartDateStr() == null
							&& target.getDueDateStr() == null)
						continue;
					targets.add(target);
					this.setChangeRequestSource(target, sources);
					this.setChangeRequestLog(param, target, logs, sources);
				}
			}
		}
		String author = integrationCommonService.getSessionUserId();
		param.setJiraReporter(author);
		param.setJiraCreateDate(DateUtil
				.getNowByFormat(DateUtil.Format.YYYY_MM_DD_HH_MI_SS.getValue()));
		param.setTargets(targets);

		integrationChangeRequestDao.removeChangeProgram(param);
		integrationChangeRequestDao.removeChangeRequestLog(param);
		integrationChangeRequestDao.addChangeProgram(param);
		integrationChangeRequestDao.addChangeRequestLog(logs);
	}

	private void setChangeRequestSource(ChangeRequestTarget target,
			Map<String, ChangeRequestTarget> sources) {
		if (sources == null || sources.isEmpty()) {
			ChangeRequestTarget param = new ChangeRequestTarget();
			param.setTeam(target.getTeam());
			param.setModule(target.getModule());
			param.setMaxRowSize(-1);
			List<ChangeRequestTarget> temps = this
					.getOriginalProgramList(param);
			for (ChangeRequestTarget obj : temps) {
				sources.put(String.valueOf(obj.getIssueId()), obj);
				sources.put(obj.getFileName(), obj);
			}
		}
	}

	private void setChangeRequestLog(ChangeRequestJira jira,
			ChangeRequestTarget target, List<ChangeRequestLog> logs,
			Map<String, ChangeRequestTarget> sources) {
		for (ProgramValidator validator : validators) {
			validator.validate(jira, target, logs, sources);
		}
	}

	private void setChangeRequestTargetByExcel(ChangeRequestTarget target,
			XSSFRow row) {
		int columnIndex = 0;
		XSSFCell cell = null;
		String temp = null;
		if (!"I".equals(target.getMode())) {
			cell = row.getCell(columnIndex++);
			temp = this.getCellValue(cell);
			target.setIssueId(temp != null ? new BigDecimal(temp).intValue()
					: 0);
		} else {
			target.setIssueId(UUID.randomUUID().hashCode());
		}
		target.setTeam(this.getCellValue(row.getCell(columnIndex++)));
		target.setModule(this.getCellValue(row.getCell(columnIndex++)));
		target.setSubModule(this.getCellValue(row.getCell(columnIndex++)));
		target.setTask(this.getCellValue(row.getCell(columnIndex++)));
		target.setTaskDetail(this.getCellValue(row.getCell(columnIndex++)));
		target.setProgramType(this.getCellValue(row.getCell(columnIndex++)));
		target.setProgramSmallType(this.getCellValue(row.getCell(columnIndex++)));
		target.setProgramName(this.getCellValue(row.getCell(columnIndex++)));
		target.setFileName(this.getCellValue(row.getCell(columnIndex++)));
		target.setInterfaceId(this.getCellValue(row.getCell(columnIndex++)));
		target.setDesigner(this.getCellValue(row.getCell(columnIndex++)));
		target.setDeveloper(this.getCellValue(row.getCell(columnIndex++)));
		target.setStartDateStr(this.getCellValue(row.getCell(columnIndex++)));
		target.setDueDateStr(this.getCellValue(row.getCell(columnIndex++)));
		if (!"I".equals(target.getMode())) {
			cell = row.getCell(columnIndex++);
			temp = this.getCellValue(cell);
			target.setDoneRatio(temp != null ? new BigDecimal(temp.replaceAll(
					"%", "")).intValue() : 0);

			target.setUseFlag(this.getCellValue(row.getCell(columnIndex++)));
			target.setCrReason(this.getCellValue(row.getCell(columnIndex++)));
		}
		target.setWbsNumber(this.getCellValue(row.getCell(columnIndex++)));
		target.setPhase(this.getCellValue(row.getCell(columnIndex++)));
		target.setIteration(this.getCellValue(row.getCell(columnIndex++)));

		target.setSrFlag(this.getCellValue(row.getCell(columnIndex++)));
		target.setSrNo(this.getCellValue(row.getCell(columnIndex++)));

		if (target.getFileName() != null && !"".equals(target.getFileName())) {
			String sTemp = target.getFileName().replaceAll("\\.", "/");
			int index = sTemp.lastIndexOf("/");
			target.setProgramId(target.getFileName().substring(index + 1));
		}

		if (target.getStartDateStr() != null
				&& !"".equals(target.getStartDateStr())) {
			Date dTemp = DateUtil.getDateByString(target.getStartDateStr(),
					DateUtil.Format.YYYY_MM_DD.getValue());
			if (dTemp != null) {
				target.setStartDate(dTemp);
			}
		}

		if (target.getDueDateStr() != null
				&& !"".equals(target.getDueDateStr())) {
			Date dTemp = DateUtil.getDateByString(target.getDueDateStr(),
					DateUtil.Format.YYYY_MM_DD.getValue());
			if (dTemp != null) {
				target.setDueDate(dTemp);
			}
		}
	}

	private String getChangeRequestMode(XSSFRow row) {
		String result = null;
		if ("신규".equals(row.getSheet().getSheetName())) {
			result = "I";
		} else if ("변경(후)".equals(row.getSheet().getSheetName())) {
			result = "M";
		} else if ("삭제".equals(row.getSheet().getSheetName())) {
			result = "D";
		}
		return result;
	}

	private String getCellValue(XSSFCell cell) {
		String result = null;
		if (cell != null) {
			switch (cell.getCellType()) {
			case XSSFCell.CELL_TYPE_FORMULA:
				result = cell.getCellFormula();
				break;
			case XSSFCell.CELL_TYPE_NUMERIC:
				if (HSSFDateUtil.isCellDateFormatted(cell)) {
					Date temp = HSSFDateUtil.getJavaDate(cell
							.getNumericCellValue());
					if (temp != null)
						result = DateUtil.getDateByFormat(temp,
								DateUtil.Format.YYYY_MM_DD.getValue());
				} else {
					result = cell.getNumericCellValue() + "";
				}
				break;
			case XSSFCell.CELL_TYPE_STRING:
				result = cell.getStringCellValue();
				break;
			case XSSFCell.CELL_TYPE_BLANK:
				result = null;
				break;
			case XSSFCell.CELL_TYPE_BOOLEAN:
				result = cell.getBooleanCellValue() + "";
				break;
			case XSSFCell.CELL_TYPE_ERROR:
				result = cell.getErrorCellString();
				break;
			default:
				result = null;
			}
		}
		return result != null ? result.trim() : null;
	}

	@Override
	public List<ChangeRequestLog> getChangeRequestLogSummary(
			ChangeRequestLog param) {
		return integrationChangeRequestDao.getChangeRequestLogSummary(param);
	}

	@Override
	public List<ChangeRequestTarget> getOriginalProgramList(
			ChangeRequestTarget param) {
		return sourceChageRequestDao.getSourceProgramList(param);
	}

	@Override
	public List<ChangeRequestLimit> getChangeRequestLimit(
			ChangeRequestLimit param) {
		return integrationChangeRequestDao.getChangeRequestLimit(param);
	}

	@Override
	public List<String> getSvnFileList(String programId) {
		return sourceChageRequestDao.getSvnFileList(programId);
	}

	@Override
	public List<ChangeRequestLog> getChangeRequestSummary(ChangeRequestLog param) {
		return integrationChangeRequestDao.getChangeRequestSummary(param);
	}

	private String getDeveloper(String developer) {
		String result = developer;
		if (developer != null && !"".equals(developer)) {
			int index = developer.indexOf(",");
			if (index != -1) {
				result = developer.substring(0, index);
			}
		}
		return result;
	}

	private void setChangeRequestVolumeValue(ChangeRequestVolume volume,
			ChangeRequestVolume source) {
		String nowMonth = DateUtil.getNowByFormat(DateUtil.Format.YYYYMM
				.getValue());
		String oldMonth3 = DateUtil.addMonth(nowMonth, -3);
		String oldMonth2 = DateUtil.addMonth(nowMonth, -2);
		String oldMonth1 = DateUtil.addMonth(nowMonth, -1);
		try {
			String targerMonth = source.getWeekOfMonth().replaceAll("-", "")
					.substring(0, 6);
			if (oldMonth3.equals(targerMonth)) {
				volume.setOldMonth3(volume.getOldMonth3() + source.getCount());
			} else if (oldMonth2.equals(targerMonth)) {
				volume.setOldMonth2(volume.getOldMonth2() + source.getCount());
			} else if (oldMonth1.equals(targerMonth)) {
				volume.setOldMonth1(volume.getOldMonth1() + source.getCount());
			}
			this.setChangeRequestVolumeValueByWeek(volume, source);
		} catch (Exception ex) {
			System.out.print("aaaa");
		}
	}

	private void setChangeRequestVolumeValueByWeek(ChangeRequestVolume volume,
			ChangeRequestVolume source) {
		String nowMonth = DateUtil.getNowByFormat(DateUtil.Format.YYYYMM
				.getValue());
		String nextMonth = DateUtil.addMonth(nowMonth, 1);
		volume.setCurWeek1(volume.getCurWeek1()
				+ this.getCurrentWeekValue(source, nowMonth, 1));
		volume.setCurWeek2(volume.getCurWeek2()
				+ this.getCurrentWeekValue(source, nowMonth, 2));
		volume.setCurWeek3(volume.getCurWeek3()
				+ this.getCurrentWeekValue(source, nowMonth, 3));
		volume.setCurWeek4(volume.getCurWeek4()
				+ this.getCurrentWeekValue(source, nowMonth, 4));
		volume.setCurWeek5(volume.getCurWeek5()
				+ this.getCurrentWeekValue(source, nowMonth, 5));
		volume.setCurWeek6(volume.getCurWeek6()
				+ this.getCurrentWeekValue(source, nextMonth, 1));
		volume.setCurWeek7(volume.getCurWeek7()
				+ this.getCurrentWeekValue(source, nextMonth, 2));
		volume.setCurWeek8(volume.getCurWeek8()
				+ this.getCurrentWeekValue(source, nextMonth, 3));
		volume.setCurWeek9(volume.getCurWeek9()
				+ this.getCurrentWeekValue(source, nextMonth, 4));
		volume.setCurWeek10(volume.getCurWeek10()
				+ this.getCurrentWeekValue(source, nextMonth, 5));
	}

	private int getCurrentWeekValue(ChangeRequestVolume source, String month,
			int index) {
		String weekOfMonth = source.getWeekOfMonth().replaceAll("-", "");
		String checkWeek = month + index;
		if (weekOfMonth.equals(checkWeek)) {
			return source.getCount();
		}
		return 0;
	}

	private void setChangeRequestParamByTeamInfo(ChangeRequestVolume param,
			List<ChangeRequestVolume> teams) {
		Map<String, String> team = new HashMap<String, String>();
		List<String> module = new ArrayList<String>();
		for (ChangeRequestVolume obj : teams) {
			if (!team.containsKey(obj.getTeam())) {
				team.put(obj.getTeam(), obj.getTeam());
			}
			module.add(obj.getModule());
		}
		param.setTeamList(new ArrayList<String>(team.values()));
		param.setModuleList(module);
	}

	@Override
	public List<ChangeRequestVolume> getChangeRequestVolumeList(
			ChangeRequestVolume param) {
		List<ChangeRequestVolume> teams = integrationChangeRequestDao
				.getTargerProgramByTeamInfo(param);
		this.setChangeRequestParamByTeamInfo(param, teams);
		List<ChangeRequestVolume> result = null;
		if (teams != null && !teams.isEmpty()) {
			List<ChangeRequestVolume> sources = sourceChageRequestDao
					.getSourceProgramByDeveloper(param);
			List<ChangeRequestVolume> targets = integrationChangeRequestDao
					.getTargetProgramByDeveloper(param);
			List<ChangeRequestVolume> subscribes = integrationChangeRequestDao
					.getSourceProgramByDeveloperSubscribe(param);

			Map<String, ChangeRequestVolume> temps = new HashMap<String, ChangeRequestVolume>();
			;
			if (sources != null && !sources.isEmpty()) {
				if (targets != null && !targets.isEmpty())
					sources.addAll(targets);
				if (subscribes != null && !subscribes.isEmpty())
					sources.addAll(subscribes);
				for (ChangeRequestVolume source : sources) {
					String developer = this.getDeveloper(source.getDeveloper());
					String key = source.getType() + "/" + developer;
					ChangeRequestVolume volume = temps.get(key);
					if (volume == null) {
						volume = new ChangeRequestVolume();
						volume.setDeveloper(developer);
						volume.setType(source.getType());
						temps.put(key, volume);
					}
					this.setChangeRequestVolumeValue(volume, source);
				}
			}
			result = new ArrayList<ChangeRequestVolume>(temps.values());
			// Collections.sort(result, new ChangeRequestDeveloperComparator());
		}
		return result;
	}
}
