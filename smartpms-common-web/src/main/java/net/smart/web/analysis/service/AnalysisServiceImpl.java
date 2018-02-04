package net.smart.web.analysis.service;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import net.smart.common.exception.BizException;
import net.smart.common.support.util.DateUtil;
import net.smart.web.analysis.dao.AnalysisDao;
import net.smart.web.code.service.CodeService;
import net.smart.web.domain.CommonCode;
import net.smart.web.domain.CommonCodeType;
import net.smart.web.domain.analysis.*;


import org.apache.commons.beanutils.BeanUtilsBean;
import org.apache.commons.beanutils.PropertyUtilsBean;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

@Service("analysisService")
public class AnalysisServiceImpl implements AnalysisService {

	@Autowired
	private AnalysisDao analysisDao;
	
	@Autowired
	private CodeService codeService;

	@Override
	public List<AnalysisRaw> getAnalysisRawList(AnalysisRaw param) {
		return analysisDao.getAnalysisRawList(param);
	}

	@Override
	public List<AnalysisResult> getAnalysisResultList(AnalysisResult param) {
		List<AnalysisResult> results = Lists.newArrayList();
		List<AnalysisRaw> temps = this.getAnalysisRawList(param);
		Map<Long, AnalysisResult> resultData = this.getAnalysisResultData(param);
		PropertyUtilsBean bean = BeanUtilsBean.getInstance().getPropertyUtils();
		for (AnalysisRaw raw : temps) {
			AnalysisResult result = resultData.get(raw.getAnalysisResultId());
			if (result == null) {
				result = new AnalysisResult();
			}
			try {
				bean.copyProperties(result, raw);
			} catch (Exception e) {
				throw new BizException("Converting Error");
			}
			results.add(result);
		}
		return results;
	}
	
	private Map<Long, AnalysisResult> getAnalysisResultData(AnalysisResult param) {
		Map<Long, AnalysisResult> result = Maps.newHashMap();
		List<AnalysisResult> temps = analysisDao.getAnalysisResultList(param);
		for (AnalysisResult temp : temps) {
			result.put(temp.getAnalysisResultId(), temp);
		}
		return result;
	}

	@Override
	public List<AnalysisTop> getAnalysisTopList(AnalysisTop param) {
		return analysisDao.getAnalysisTopList(param);
	}

	@Override
	public List<AnalysisSummary> getAnalysisSummaryList(AnalysisSummary param) {
		return analysisDao.getAnalysisSummaryList(param);
	}
	
	@Override
	@Transactional
	public void parseExcelByRawData(AnalysisRaw param) {
		FileInputStream fileInputStream = null;
		Map<String, CommonCode> addCodes = new HashMap<String, CommonCode>();
		try {
			fileInputStream = new FileInputStream(param.getFilePath());
			HSSFWorkbook workbook = new HSSFWorkbook(fileInputStream);
			HSSFSheet worksheet = workbook.getSheetAt(0);
			HSSFRow rowTemp = worksheet.getRow(2);
			param.setServiceName(rowTemp.getCell(1).getStringCellValue());
			param.setRepoName(rowTemp.getCell(2).getStringCellValue());
			param.setAnalysisDateByString(rowTemp.getCell(3).getStringCellValue());
			int nextOrderNo = 1;
			try {
				nextOrderNo = analysisDao.getAnalysisMaxOrderNo(param) + 1;
			} catch(Exception e) {
			}
			param.setOrderNo(nextOrderNo);
			addCodes.put(CommonCodeType.ORDERNO.name() + String.valueOf(nextOrderNo), new CommonCode(String.valueOf(nextOrderNo), String.valueOf(nextOrderNo) + "차", CommonCodeType.ORDERNO.name()));
			List<AnalysisRaw> temps = new ArrayList<AnalysisRaw>();
			for (int i=0;i< worksheet.getPhysicalNumberOfRows();i++) {
				HSSFRow row = worksheet.getRow(i);
				if (i == 0 || i == 1) continue;
				AnalysisRaw temp = new AnalysisRaw();
				temp.setServiceName(row.getCell(1).getStringCellValue());
				temp.setRepoName(row.getCell(2).getStringCellValue());
				temp.setAnalysisDateByString(row.getCell(3).getStringCellValue());
				temp.setAnalysisDate(DateUtil.getDateByString(temp.getAnalysisDateByString(), DateUtil.Format.YYYY_MM_DD.getValue()));
				temp.setVulnerability(row.getCell(4).getStringCellValue());
				temp.setCwe(row.getCell(5).getStringCellValue());
				temp.setSecurityRule(row.getCell(6).getStringCellValue());
				temp.setSeverity(row.getCell(7).getStringCellValue());
				temp.setFullLocation(row.getCell(8).getStringCellValue());
				temp.setFile(row.getCell(9).getStringCellValue());
				temp.setSource(String.valueOf(row.getCell(10).getNumericCellValue()));
				temp.setResultMessage(row.getCell(11).getStringCellValue());
				temp.setArea(param.getArea());
				temp.setTool(param.getTool());
				temp.setOrderNo(nextOrderNo);
				temps.add(temp);
				addCodes.put(CommonCodeType.SERVICE.name()+temp.getServiceName().hashCode(), new CommonCode(String.valueOf(temp.getServiceName().hashCode()), temp.getServiceName(), CommonCodeType.SERVICE.name()));
				addCodes.put(CommonCodeType.REPO.name()+temp.getRepoName().hashCode(), new CommonCode(String.valueOf(temp.getRepoName().hashCode()), temp.getRepoName(), CommonCodeType.REPO.name()));
				addCodes.put(CommonCodeType.DAY.name()+temp.getAnalysisDateByString(), new CommonCode(temp.getAnalysisDateByString(), temp.getAnalysisDateByString(), CommonCodeType.DAY.name()));
				addCodes.put(CommonCodeType.SEVERITY.name()+temp.getSeverity(), new CommonCode(temp.getSeverity(), temp.getSeverity(), CommonCodeType.SEVERITY.name()));
			}
			analysisDao.addAnalysisRaw(temps);
			addCommonCodes(addCodes);
			addAnalysisInfo(param);
		} catch (Exception e) {
			if (fileInputStream != null) {
				try {
					fileInputStream.close();
				} catch (IOException e1) {
					throw new BizException("FileInputStream Close Error.", e1);
				}
			}
			throw new BizException("Excel Parasing Close Error.", e);
		} finally {
			if (fileInputStream != null) {
				try {
					fileInputStream.close();
				} catch (IOException e1) {
					throw new BizException("FileInputStream Close Error.", e1);
				}
			}
		}
	}
	
	private void addAnalysisInfo(AnalysisRaw param) {
		AnalysisSummary summary = new AnalysisSummary();
		summary.setServiceName(param.getServiceName());
		summary.setRepoName(param.getRepoName());
		summary.setAnalysisDateByString(param.getAnalysisDateByString());
		summary.setOrderNo(param.getOrderNo());
		summary.setVeeringCheck1("N/A");
		summary.setVeeringCheck2("N/A");
		summary.setFinalStatus("N/A");
		analysisDao.addAnalysisSummary(summary);
		analysisDao.addAnalysisTop(summary);
	}
	
	private void addCommonCodes(Map<String, CommonCode> addCodes) {
		Iterator<Entry<String, CommonCode>> ie = addCodes.entrySet().iterator();
		while (ie.hasNext()) {
			Entry<String, CommonCode> e = ie.next();
			codeService.addCode(e.getValue());
		}
	}

	@Override
	public void addAnalysisResult(AnalysisResult param) {
		List<AnalysisResult> temps = analysisDao.getAnalysisResultList(param);
		if (temps != null && !temps.isEmpty()) {
			analysisDao.modifyAnalysisResult(param);
		} else {
			analysisDao.addAnalysisResult(param);
		}
	}

	@Override
	//@Scheduled(cron="0 0/1 * * * ? ")
	@Transactional
	public void addAnalysisSummary() {
		List<AnalysisSummary> targets = analysisDao.getAnalysisSummaryByWorkTarget(new AnalysisSummary());
		for (AnalysisSummary target : targets) {
			analysisDao.removeAnalysisSummary(target);
			analysisDao.addAnalysisSummary(target);
			analysisDao.removeAnalysisTop(target);
			analysisDao.addAnalysisTop(target);
		}
	}

	@Override
	public void saveAnalysisSummary(AnalysisSummary param) {
		analysisDao.saveAnalysisSummary(param);
	}


	@Override
	public void saveAnalysisSource(AnalysisSource param) {
		analysisDao.saveAnalysisSource(param);
	}

	@Override
	public List<AnalysisSource> getAnalysisSourceList(AnalysisSource param) {
		return analysisDao.getAnalysisSourceList(param);
	}

	@Override
	public List<AnalysisSourceResult> getAnalysisSourceResultList(AnalysisSourceResult param) {
		return analysisDao.getAnalysisSourceResultList(param);
	}

	@Override
	public List<AnalysisSourceOperation> getAnalysisSourceOperationList(AnalysisSourceOperation param) {
		return analysisDao.getAnalysisSourceOperationList(param);
	}

	@Override
	public List<AnalysisSourceResult> getAnalysisSourceRowRankList(AnalysisSourceResult param) {
		return analysisDao.getAnalysisSourceRowRankList(param);
	}
	@Override
	public List<AnalysisSourceResult> getAnalysisSourceHighRankList(AnalysisSourceResult param) {
		return analysisDao.getAnalysisSourceHighRankList(param);
	}
}
