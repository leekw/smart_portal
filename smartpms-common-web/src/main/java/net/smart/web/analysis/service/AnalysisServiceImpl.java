package net.smart.web.analysis.service;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import net.smart.common.domain.AnalysisPriority;
import net.smart.common.exception.BizException;
import net.smart.common.support.s3.S3Client;
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

	@Autowired
	private S3Client s3Client;

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
		List<AnalysisSourceResult> resultList = analysisDao.getAnalysisSourceResultList(param);

		for(AnalysisSourceResult result : resultList){
			int lastIndex = result.getAssetName().lastIndexOf(".");
			result.setAssetNameView(result.getAssetName().substring(lastIndex+1));
		}

		return resultList;
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

	@Override
	public AnalysisSourceResult getAnalysisSourceCode(AnalysisSourceResult param) {
		return analysisDao.getAnalysisSourceCode(param);
	}

	@Override
	public List<AnalysisRaw> getAnalysisPmdDataList(AnalysisSourceResult param) throws IOException{

		//TO_DO 진단대상 등록 파일의 파일순번을 키로 분석된 파일의 정보를 읽어옴
		InputStream is = s3Client.getS3ObjectInputStream("analysis/pmd_report.csv");

		InputStreamReader isr = new InputStreamReader(is);

		BufferedReader reader = new BufferedReader(isr);

		List<AnalysisRaw> insDataList = new ArrayList<AnalysisRaw>();

		int lineNum = 0;
		while(true){

			String line = reader.readLine();

			if(line == null) break;
			String[] colmns = line.split(",",-1);

			if(lineNum !=0) {

				AnalysisRaw insData = new AnalysisRaw();
				int colNum = 0;
				for (String data : colmns) {
					data = data.replaceAll("\"","");
					colNum++;
					if (colNum == 3) {
						insData.setFullLocation(data);

						String fileName[] = data.split("/");
						insData.setFile(fileName[fileName.length-1]);

					}
					if (colNum == 4) {
						if("1".equals(data)){
							data = AnalysisPriority.Critical.name();
						}else if("2".equals(data)){
							data = AnalysisPriority.High.name();
						}else if("3".equals(data)){
							data = AnalysisPriority.Nomal.name();
						}

						insData.setSeverity(data);
					}
					if (colNum == 5) {
						insData.setSource(data);
					}
					if (colNum == 6) {
						insData.setResultMessage(data);
					}
					if (colNum == 7) {
						insData.setVulnerability(data);
					}
					if (colNum == 8) {

						insData.setSecurityRule(data);
					}
				}

				insData.setServiceName("Google");
				insData.setRepoName("AI-TF");
				insData.setTool("PMD");
				insData.setAnalysisDate(DateUtil.getNow());
				insDataList.add(insData);
			}
			lineNum++;
		}

		return insDataList;
	}

	@Override
	public void addAnalysisResultList(List<AnalysisRaw> param){
		analysisDao.addAnalysisRaw(param);
	}

	@Override
	public List<AnalysisMobile> getAnalysisMobileDataList(AnalysisMobile param)  throws IOException {
		InputStream is = s3Client.getS3ObjectInputStream("mobile/4_result_all.txt");

		InputStreamReader isr = new InputStreamReader(is);

		BufferedReader reader = new BufferedReader(isr);

		List<AnalysisMobile> parseDataList = new ArrayList<AnalysisMobile>();

		long fileNo    = param.getAnalysisFileNo();
		int parentId   = 0;
		String summary = null;
		while(true){
			AnalysisMobile paseData = new AnalysisMobile();
			String line = reader.readLine();

			if(line == null) break;

			if(line.startsWith(":ST")){
				summary = line.substring(4);
				paseData.setAnalysisFileNo(fileNo);
				paseData.setAnalysisSummary(summary);
				paseData.setAnalysisContents(summary);
				paseData.setAnalysisParentId(0);
				parentId = analysisDao.getAnalysisMobileSeq();
				paseData.setAnalysisId(parentId);
				parseDataList.add(paseData);
				continue;
 			}else if(line.startsWith(":EN")){
				continue;
			}

			String[] colmns = line.split(",",-1);

			int colNum = 0;
			for (String data : colmns) {
				if(colNum == 0){
					paseData.setAnalysisContents(data.trim());

				}

				if(colNum == 1){
					paseData.setAnalysisExported(data.trim());
				}

				paseData.setAnalysisFileNo(fileNo);
				paseData.setAnalysisSummary(summary);
				paseData.setAnalysisParentId(parentId);
				parseDataList.add(paseData);
				colNum++;
			}

		}


		return parseDataList;
	}

	@Override
	public void addAnalysisResultMobileList(List<AnalysisMobile> mobileDataList) {
		analysisDao.addAnalysisMoblie(mobileDataList);
	}

	@Override
	public List<AnalysisMobile> getAnalysisMobileList(AnalysisMobile param) {
		return analysisDao.getAnalysisMobileList(param);
	}
}
