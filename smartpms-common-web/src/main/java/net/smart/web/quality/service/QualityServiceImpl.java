package net.smart.web.quality.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.net.Authenticator;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import net.smart.common.exception.IntegrationException;
import net.smart.common.support.util.DateUtil;
import net.smart.web.domain.quality.InterfaceDetail;
import net.smart.web.domain.quality.InterfaceSummary;
import net.smart.web.domain.quality.NotUsedStat;
import net.smart.web.domain.quality.QualityCoverage;
import net.smart.web.domain.quality.QualityDetail;
import net.smart.web.domain.quality.QualityHistoryChart;
import net.smart.web.domain.quality.QualityHistorySummary;
import net.smart.web.domain.quality.QualityInterface;
import net.smart.web.domain.quality.QualityProgramType;
import net.smart.web.domain.quality.QualityRel;
import net.smart.web.domain.quality.QualityRelation;
import net.smart.web.domain.quality.QualitySummary;
import net.smart.web.domain.quality.QualitySvnFile;
import net.smart.web.domain.quality.QualityTest;
import net.smart.web.domain.quality.QualityTestProgram;
import net.smart.web.domain.quality.QualityTestcase;
import net.smart.web.domain.quality.QualtiyTestChart;
import net.smart.web.quality.dao.QuailtyBatchDao;
import net.smart.web.quality.dao.QualityCoverageDao;
import net.smart.web.quality.dao.QualityDao;
import net.smart.web.quality.dao.QualityE2EGovDao;
import net.smart.web.quality.dao.QualityTargetDao;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("qualityService")
public class QualityServiceImpl implements QualityService {
	
	private static Logger logger = LoggerFactory.getLogger(QualityServiceImpl.class);
	
	private final static String SVN_BASE_URL = "http://10.217.136.103:8080/svn/";
	private final static String SVN_BASE_URL_ETC = "http://10.217.136.242:8080/svn/";
	
	@Autowired
	private QualityDao qualityDao;
	
	@Autowired
	private QualityTargetDao qualityTargetDao;
	
	@Autowired
	private QuailtyBatchDao quailtyBatchDao;
	
	@Autowired
	private QualityE2EGovDao qualityE2EGovDao;
	
	@Autowired
	private QualityCoverageDao qualityCoverage;

	@Override
	public List<QualitySummary> getQualitySummaryList(QualitySummary param) {
		return qualityDao.getQualitySummaryList(param);
	}

	@Override
	public List<QualitySummary> getQualityDeveloperList(QualitySummary param) {
		return qualityDao.getQualityDeveloperList(param);
	}
	
	private String getQualityProgramKey(QualitySummary param, String verifyType) {
		StringBuffer sb = new StringBuffer();
		sb.append(param.getTeam()).append("/")
		  .append(param.getModule()).append("/")
		  .append(param.getFunction()).append("/")
		  .append(verifyType);
		return sb.toString();
	}
	
	private BigDecimal getValue(QualitySummary obj, BigDecimal value, String programType) {
		if (programType.equals(obj.getProgramType())) return value == null ? new BigDecimal(0) : value;
		else return new BigDecimal(0);
	}
	
	private void setQualityProgramTypeData(QualitySummary obj, Map<String, QualityProgramType> result, String verifyType, BigDecimal value) {
		String key = null;
		key = this.getQualityProgramKey(obj, verifyType);
		QualityProgramType data = result.get(key);
		if (data == null) {
			data = new QualityProgramType();
			data.setTeam(obj.getTeam());
			data.setModule(obj.getModule());
			data.setFunction(obj.getFunction());
			data.setVerifyType(verifyType);
			data.setUiCount( new BigDecimal(0) );
			data.setEsbCount( new BigDecimal(0) );
			data.setSjCount( new BigDecimal(0) );
			data.setSjCount( new BigDecimal(0) );
			data.setBocCount( new BigDecimal(0) );
			data.setBoCount( new BigDecimal(0) );
			data.setDoCount( new BigDecimal(0) );
			data.setDtoCount( new BigDecimal(0) );
			data.setEtcCount( new BigDecimal(0) );
			data.setTotCount(new BigDecimal(0));
			result.put(key, data);
		}
		data.setUiCount( data.getUiCount().add(this.getValue(obj, value, "UI")) );
		data.setEsbCount( data.getEsbCount().add(this.getValue(obj, value, "ESB")) );
		data.setSjCount( data.getSjCount().add(this.getValue(obj, value, "SO")) );
		data.setSjCount( data.getSjCount().add(this.getValue(obj, value, "JO")) );
		data.setBocCount( data.getBocCount().add(this.getValue(obj, value, "BOC")) );
		data.setBoCount( data.getBoCount().add(this.getValue(obj, value, "BO")) );
		data.setDoCount( data.getDoCount().add(this.getValue(obj, value, "DO")) );
		data.setDtoCount( data.getDoCount().add(this.getValue(obj, value, "DTO")) );
		data.setEtcCount( data.getEtcCount().add(this.getValue(obj, value, "ETC")) );
		data.setTotCount( data.getUiCount().add(data.getEsbCount()).add(data.getSjCount()).
				add(data.getBocCount()).add(data.getBoCount()).add(data.getDoCount()).add(data.getDtoCount()).add(data.getEtcCount())  );
	}

	@Override
	public List<QualityProgramType> getQualityProgramTypeList(QualityProgramType param) {
		Map<String, QualityProgramType> data = new HashMap<String, QualityProgramType>();
		List<QualitySummary> temps = qualityDao.getQualityProgramTypeList(param);
		for (QualitySummary obj : temps) {
			this.setQualityProgramTypeData(obj, data, "00.loc", new BigDecimal(obj.getLoc()));
			this.setQualityProgramTypeData(obj, data, "01.개발지연", new BigDecimal(obj.getPgDelay()));
			this.setQualityProgramTypeData(obj, data, "02.UT 미수행", new BigDecimal(obj.getUtNotest()));
			this.setQualityProgramTypeData(obj, data, "03.SIT 미수행", new BigDecimal(obj.getSitNotest()));
			this.setQualityProgramTypeData(obj, data, "04.구문 10미만", new BigDecimal(obj.getUnderStatement()));
			this.setQualityProgramTypeData(obj, data, "05.호출관계누락", new BigDecimal(obj.getUnUsedSource()));
			this.setQualityProgramTypeData(obj, data, "06.Run 미수행", new BigDecimal(obj.getNotRun()));
			this.setQualityProgramTypeData(obj, data, "07.커버리지 65%미만 -UT", new BigDecimal(obj.getUtCoverage()));
			this.setQualityProgramTypeData(obj, data, "08.커버리지 65%미만 -SIT", new BigDecimal(obj.getUnderSitCoverage()));
		}
		List<QualityProgramType> result = new ArrayList<QualityProgramType>(data.values());
		Collections.sort(result, new QualityDetailComparator());
		return result;
	}

	private void setProgramRelationData(Map<String, List<QualityRelation>> relData, 
			Map<String, QualityRel> relationData, Map<String, QualityRel> programRelation) {
		List<QualityRelation> relation = qualityTargetDao.getProgramRelationList(new QualityRelation());
		for (QualityRelation obj : relation) {
			String key = obj.getTargetFile();
			
			int index = key.lastIndexOf(".");
			if (index != -1) {
				key = key.substring(0, index);
			}
			List<QualityRelation> temps = relData.get(key);
			if (temps == null) {
				temps = new ArrayList<QualityRelation>();
				relData.put(key, temps);
			}
			temps.add(obj);
			List<QualityRelation> temps2 = relData.get(obj.getTargetFile());
			if (temps2 == null) {
				temps2 = new ArrayList<QualityRelation>();
				relData.put(obj.getTargetFile(), temps2);
			}
			temps2.add(obj);
			
			boolean isServiceRel = false;
			if (obj.getSourceWork() != null && obj.getTargetWork() != null
					&& !obj.getSourceWork().equals(obj.getTargetWork())) {
				this.setLinkProgramTargetByService(obj);
				isServiceRel = true;
			} else {
				this.setLinkProgramTarget(obj);
			}
			
			if (obj.getSourceKey() != null && obj.getTargetKey() != null) {
				String relKey = obj.getSourceKey() + "." + obj.getSourceSubKey() + "." + obj.getTargetKey() + "." + obj.getTargetSubKey();
				if (!relationData.containsKey(relKey)) {
					QualityRel rel = new QualityRel();
					rel.setRelationType("CLASS");
					if (isServiceRel) {
						rel.setTeam(obj.getSourceWork());
						rel.setModule(obj.getSourceWork());
						rel.setTargetTeam(obj.getTargetWork());
						rel.setTargetModule(obj.getTargetWork());
						rel.setRelationType("SERVICE");
					}
					rel.setServiceRel(isServiceRel);
					rel.setStatDate(DateUtil.getNowByFormat(DateUtil.Format.YYYY_MM_DD.getValue()));
					rel.setSourceFilePath(obj.getSourceKey());
					rel.setTargetFilePath(obj.getTargetKey());
					rel.setSourceOperation(obj.getSourceSubKey());
					rel.setTargetOperation(obj.getTargetSubKey());
					rel.setRelationName(obj.getRelationName());
					relationData.put(relKey, rel);
				}
			}
		}
	}
	
	private String getCompareProgramInfo(String path) {
		String result = null;
		int index = path.lastIndexOf("/nbss/ord/");
		if (index != -1) {
			result = path.substring(index + 1).replaceAll("nbss/ord/", "");
		} else {
			index = path.lastIndexOf("/nbss/");
			if (index != -1) {
				result = path.substring(index + 1).replaceAll("nbss/", "");
			}
		}
		if (result != null) {
			index = result.indexOf("/");
			if (index != -1) {
				result = result.substring(0, index);
			}
		}
		return result != null && result.equals("fwc") ? null : result;
	}
	
	private void setProgramKey(QualityRelation obj) {
		int lastIndex = 0;
		int index = obj.getSource().lastIndexOf("/nbss");
		if (index != -1) {
			lastIndex = obj.getSource().lastIndexOf(".");
			if (lastIndex != -1) {
				obj.setSourceSubKey(obj.getSource().substring(lastIndex + 1));
			} else obj.setSourceSubKey("ALL");
			obj.setSourceKey(obj.getSource().substring(index + 1, (lastIndex == -1 ? obj.getSource().length() : lastIndex)));
		}
		index = obj.getTarget().lastIndexOf("/nbss");
		if (index != -1) {
			lastIndex = obj.getTarget().lastIndexOf(".");
			if (lastIndex != -1) {
				obj.setTargetSubKey(obj.getTarget().substring(lastIndex + 1));
			} else obj.setTargetSubKey("ALL");
			obj.setTargetKey(obj.getTarget().substring(index + 1, (lastIndex == -1 ? obj.getTarget().length() : lastIndex)));
		}
	}
	
	private void setLinkProgramTargetByService(QualityRelation obj) {
		int index = obj.getSourceFile().lastIndexOf(".");
		if (index != -1) {
			obj.setSourceSubKey(obj.getSourceFile().substring(index + 1));
		} else obj.setSourceSubKey("ALL");
		obj.setSourceKey(obj.getSourceFile().substring(0, (index == -1 ? obj.getSourceFile().length() : index)));
		
		index = obj.getTargetFile().lastIndexOf(".");
		if (index != -1) {
			obj.setTargetSubKey(obj.getTargetFile().substring(index + 1));
		} else obj.setTargetSubKey("ALL");
		obj.setTargetKey(obj.getTargetFile().substring(0, (index == -1 ? obj.getTargetFile().length() : index)));
	}
	
	private void setLinkProgramTarget(QualityRelation obj) {
		String source = this.getCompareProgramInfo(obj.getSource());
		String target = this.getCompareProgramInfo(obj.getTarget());
		if (source != null && target != null
				&& !source.equals(target)) {
			this.setProgramKey(obj);
			
		}
	}
	

	private void setQualtiyRealtion(Map<String, QualityDetail> detailData, 
			Map<String, QualityCoverage> opCoverage, 
			Map<String, QualityRel> relationData,
			Map<String, List<QualityCoverage>> historys) {
		Iterator<Entry<String, QualityRel>> ie = relationData.entrySet().iterator();
		while(ie.hasNext()) {
			Entry<String, QualityRel> e = ie.next();
			QualityRel rel = e.getValue();
			if (rel.isServiceRel()) {
				List<QualityCoverage> sources = historys.get(rel.getSourceFilePath());
				List<QualityCoverage> targets = historys.get(rel.getTargetFilePath());
				rel.setSourceRunYn("N");
				rel.setSourceOperationRunYn("N");
				rel.setTargetRunYn("N");
				rel.setTargetOperationRunYn("N");
				if (sources != null && !sources.isEmpty()) {
					rel.setSourceRunYn("Y");
					for (QualityCoverage source : sources) {
						if (source.getFuncName().equals(rel.getSourceOperation())){
							rel.setSourceOperationRunYn("Y");
							break;
						}
					}
				}
				if (targets != null && !targets.isEmpty()) {
					rel.setTargetRunYn("Y");
					for (QualityCoverage target : targets) {
						if (target.getFuncName().equals(rel.getTargetOperation())){
							rel.setTargetOperationRunYn("Y");
							break;
						}
					}
				}
				
				if ("Y".equals(rel.getSourceRunYn()) && "N".equals(rel.getTargetRunYn())) {
					if (rel.getRelationName().split("-")[1].equals("UI")) {
						rel.setTargetRunYn("Y");
					}
				} else if ("N".equals(rel.getSourceRunYn()) && "Y".equals(rel.getTargetRunYn())) {
					if (rel.getRelationName().split("-")[0].equals("UI")) {
						rel.setSourceRunYn("Y");
					}
				}
				
				if ("Y".equals(rel.getSourceOperationRunYn()) && "N".equals(rel.getTargetOperationRunYn())) {
					if (rel.getRelationName().split("-")[1].equals("UI")) {
						rel.setTargetOperationRunYn("Y");
					}
				} else if ("N".equals(rel.getSourceOperationRunYn()) && "Y".equals(rel.getTargetOperationRunYn())) {
					if (rel.getRelationName().split("-")[0].equals("UI")) {
						rel.setSourceOperationRunYn("Y");
					}
				}
				QualityDetail source = detailData.get(rel.getSourceFilePath());
				if (source != null) {
					rel.setTeam(source.getTeam());
					rel.setModule(source.getModule());
				}
				QualityDetail target = detailData.get(rel.getTargetFilePath());
				if (target != null) {
					rel.setTargetTeam(target.getTeam());
					rel.setTargetModule(target.getModule());
				}
				
				if ("BCC".equals(rel.getModule())) {
					rel.setTeam("Billing");
					rel.setModule("BCOL");
				}
				if ("COM".equals(rel.getModule())) rel.setModule("공통");
				if ("RDS".equals(rel.getModule())) {
					rel.setTeam("B-RDS");
					rel.setModule(" ");
				}
				if ("BCC".equals(rel.getTargetModule())) {
					rel.setTargetTeam("Billing");
					rel.setTargetModule("BCOL");
				}
				if ("RDS".equals(rel.getTargetModule())) {
					rel.setTargetTeam("B-RDS");
					rel.setTargetModule(" ");
				}
				if ("COM".equals(rel.getTargetModule())) rel.setTargetModule("공통");
				
			} else {
				QualityDetail source = detailData.get(rel.getSourceFilePath());
				QualityDetail target = detailData.get(rel.getTargetFilePath());
				if (source != null) {
					rel.setTeam(source.getTeam());
					rel.setModule(source.getModule());
					rel.setSourceRunYn(source.getSitRunYn());
					rel.setSourceFileStatement(source.getSitStatement());
					QualityCoverage coverage = opCoverage.get(rel.getSourceFilePath() + "." + rel.getSourceOperation());
					if (coverage != null) {
						rel.setSourceOperationStatement(coverage.getStatement());
						rel.setSourceOperationTotal(coverage.getTotalStatement());
						rel.setSourceOperationRun(coverage.getRunStatement());
						rel.setSourceOperationRunYn(coverage.getRunStatement() > 0 ? "Y" : "N");
					}
				} else {
					rel.setTeam("구분없음");
					rel.setModule("-");
					rel.setSourceRunYn("-");
					rel.setSourceOperationRunYn("-");
				}
				if (target != null) {
					rel.setTargetTeam(target.getTeam());
					rel.setTargetModule(target.getModule());
					rel.setTargetRunYn(target.getSitRunYn());
					rel.setTargetFileStatement(target.getSitStatement());
					QualityCoverage coverage = opCoverage.get(rel.getTargetFilePath() + "." + rel.getTargetOperation());
					if (coverage != null) {
						rel.setTargetOperationStatement(coverage.getStatement());
						rel.setTargetOperationTotal(coverage.getTotalStatement());
						rel.setTargetOperationRun(coverage.getRunStatement());
						rel.setTargetOperationRunYn(coverage.getRunStatement() > 0 ? "Y" : "N");
					}
				} else {
					rel.setTargetTeam("구분없음");
					rel.setTargetModule("-");
					rel.setTargetRunYn("-");
					rel.setTargetOperationRunYn("-");
				}
				this.setChangeTeamModuleInfo(rel);
			}
		}
	}
	
	private void setChangeTeamModuleInfo(QualityRel rel) {
		if ("CLASS".equals(rel.getRelationType())) {
			if ("구분없음".equals(rel.getTeam())) {
				if (rel.getSourceFilePath().startsWith("nbss/arc")) {
					rel.setTeam("Billing");
					rel.setModule("AR");
				} else if (rel.getSourceFilePath().startsWith("nbss/bil")) {
					rel.setTeam("Billing");
					rel.setModule("청구");
				} else if (rel.getSourceFilePath().startsWith("nbss/aro")) {
					rel.setTeam("Billing");
					rel.setModule("BCOL");
				} else if (rel.getSourceFilePath().startsWith("nbss/ord/comn")) {
					rel.setTeam("Order");
					rel.setModule("유선공통");
				} else if (rel.getSourceFilePath().startsWith("nbss/ord/mobile")) {
					rel.setTeam("Order");
					rel.setModule("신규");
				} else if (rel.getSourceFilePath().startsWith("nbss/ord/wibro")) {
					rel.setTeam("Order");
					rel.setModule("WiBro");
				} else if (rel.getSourceFilePath().startsWith("nbss/ord/cmb")) {
					rel.setTeam("Order");
					rel.setModule("결합");
				} else if (rel.getSourceFilePath().startsWith("nbss/ord/dc/rule")) {
					rel.setTeam("Order");
					rel.setModule("무선상품");
				} else if (rel.getSourceFilePath().startsWith("nbss/ord/tv")) {
					rel.setTeam("Order");
					rel.setModule("IPTV");
				} else if (rel.getSourceFilePath().startsWith("nbss/ord/soip")) {
					rel.setTeam("Order");
					rel.setModule("SOIP");
				} else if (rel.getSourceFilePath().startsWith("nbss/ord/internet")) {
					rel.setTeam("Order");
					rel.setModule("인터넷");
				}
			}
			if ("구분없음".equals(rel.getTargetTeam())) {
				if (rel.getTargetFilePath().startsWith("nbss/arc")) {
					rel.setTargetTeam("Billing");
					rel.setTargetModule("AR");
				} else if (rel.getTargetFilePath().startsWith("nbss/bil")) {
					rel.setTargetTeam("Billing");
					rel.setTargetModule("청구");
				} else if (rel.getTargetFilePath().startsWith("nbss/aro")) {
					rel.setTargetTeam("Billing");
					rel.setTargetModule("BCOL");
				} else if (rel.getTargetFilePath().startsWith("nbss/ord/comn")) {
					rel.setTargetTeam("Order");
					rel.setTargetModule("유선공통");
				} else if (rel.getTargetFilePath().startsWith("nbss/ord/mobile")) {
					rel.setTargetTeam("Order");
					rel.setTargetModule("신규");
				} else if (rel.getTargetFilePath().startsWith("nbss/ord/wibro")) {
					rel.setTargetTeam("Order");
					rel.setTargetModule("WiBro");
				} else if (rel.getTargetFilePath().startsWith("nbss/ord/cmb")) {
					rel.setTargetTeam("Order");
					rel.setTargetModule("결합");
				} else if (rel.getTargetFilePath().startsWith("nbss/ord/dc/rule")) {
					rel.setTargetTeam("Order");
					rel.setTargetModule("무선상품");
				} else if (rel.getTargetFilePath().startsWith("nbss/ord/tv")) {
					rel.setTargetTeam("Order");
					rel.setTargetModule("IPTV");
				} else if (rel.getTargetFilePath().startsWith("nbss/ord/soip")) {
					rel.setTargetTeam("Order");
					rel.setTargetModule("SOIP");
				} else if (rel.getTargetFilePath().startsWith("nbss/ord/internet")) {
					rel.setTargetTeam("Order");
					rel.setTargetModule("인터넷");
				}
			}
		}
	}
	
	private void setCoverageByOperation(Map<String, QualityCoverage> opCoverage) {
		List<QualityCoverage> coverages = qualityCoverage.getCodeCoverageDataAll(new QualityCoverage());
		for (QualityCoverage obj : coverages) {
			String key = null;
			int index = obj.getFilename().lastIndexOf("/nbss");
			if (index != - 1) {
				key = obj.getFilename().substring(index + 1).replaceAll(".java", "");
				key = key + "." + obj.getFuncName();
			}
			if (key != null && !opCoverage.containsKey(key)) {
				opCoverage.put(key, obj);
			} else {
				QualityCoverage temp = opCoverage.get(key);
				if (temp != null && obj.getRunStatement() > 0 && obj.getRunStatement() > temp.getRunStatement()) {
					temp.setStatement(obj.getStatement());
					temp.setRunStatement(obj.getRunStatement());
					temp.setTotalStatement(obj.getTotalStatement());
				}
			}
		}
	}
	
	private void setCheckTargetExcludeClass(Map<String, QualityCoverage> exclude) {
		List<QualityCoverage> data = qualityTargetDao.getQualityCheckTargetExcludeClass(new QualityCoverage());
		for (QualityCoverage obj : data) {
			exclude.put(obj.getFilename(), obj);
			int index = obj.getFilename().lastIndexOf("/");
			if (index != -1) {
				exclude.put(obj.getFilename().substring(index + 1), obj);
			}
		}
	}
	
	private void setServiceRunHistory(Map<String, List<QualityCoverage>> historys) {
		List<QualityCoverage> hisotys = qualityTargetDao.getQualityServiceTestHistory(new QualityCoverage());
		for (QualityCoverage obj : hisotys) {
			List<QualityCoverage> temps = historys.get(obj.getFilename());
			if (temps == null) {
				temps = new ArrayList<QualityCoverage>();
				historys.put(obj.getFilename(), temps);
			}
			if (obj.getFilename().endsWith("SO") && obj.getFuncName() != null &&  obj.getFuncName().equals("service")) {
				obj.setFuncName("ALL");
			}
			temps.add(obj);
		}
	}

	@Override
	@Transactional
//	@Scheduled(cron="0 30 * * * ? ")
	public void addQualityData() {
		final String jiraUnSync = System.getProperty("jiraUnSync");
		if (jiraUnSync == null || jiraUnSync.equals("N")) {
			List<QualityDetail> detail = qualityTargetDao.getQualityTargetByProgramList(new QualityDetail());
			List<QualityCoverage> coverage = qualityTargetDao.getQualityTargetByCoverageList(new QualityCoverage());
			List<QualityTestcase> testcase = qualityTargetDao.getTestcaseList(new QualityTestcase());
			List<NotUsedStat> noused = qualityE2EGovDao.getNotUsedStat(new NotUsedStat());
			List<QualitySvnFile> svnFiles = qualityTargetDao.getSvnFileList(new QualitySvnFile());
			Map<String, QualityCoverage> corverageData = new HashMap<String, QualityCoverage>();
			Map<String, QualityTestcase> testcaseData = new HashMap<String, QualityTestcase>();
			Map<String, NotUsedStat> notUsedData = new HashMap<String, NotUsedStat>();
			Map<String, QualitySvnFile> svnFileData = new HashMap<String, QualitySvnFile>();
			Map<String, List<QualityRelation>> relData = new HashMap<String, List<QualityRelation>>();
			Map<String, QualityRel> relationData = new HashMap<String, QualityRel>();
			Map<String, QualityDetail> detailData = new HashMap<String, QualityDetail>();
			Map<String, QualityCoverage> opCoverage = new HashMap<String, QualityCoverage>();
			Map<String, QualityCoverage> exclude = new HashMap<String, QualityCoverage>();
			Map<String, List<QualityCoverage>> historys = new HashMap<String, List<QualityCoverage>>();
			Map<String, QualityRel> programRelation = new HashMap<String, QualityRel>();
			Map<String, QualityInterface> interfaces = new HashMap<String, QualityInterface>();
			Map<String, QualityTestProgram> testPrograms = new HashMap<String, QualityTestProgram>();
			this.setCheckTargetExcludeClass(exclude);
			this.setServiceRunHistory(historys);
			this.setCoverageByOperation(opCoverage);
			this.setProgramRelationData(relData, relationData, programRelation);
			for (NotUsedStat obj: noused) {
				int index = obj.getFilePath().lastIndexOf("/");
				if (index != -1) {
					String key = obj.getFilePath().substring(index + 1);
					if (!notUsedData.containsKey(key)) {
						notUsedData.put(key, obj);
					}
				}
			}
			for (QualitySvnFile obj : svnFiles) {
				if (!svnFileData.containsKey(obj.getFilename())) {
					svnFileData.put(obj.getFilename(), obj);
				}
				String halfKey = obj.getHalfPath().replaceAll("/src/PFM_MODULES/", "")
												  .replaceAll("/src/PFM_DBIO/", "")
												  .replaceAll("/src/PFM_IO/", "")
												  .replaceAll("/src/PFM_BATCH/", "")
												  .replaceAll("main/java/", "");
				if (!svnFileData.containsKey(halfKey)) {
					svnFileData.put(halfKey, obj);
				}
			}
			for (QualityCoverage obj : coverage) {
				String key = obj.getDeployEnv() + "/" +  obj.getPhase() + "/" + obj.getTeam().trim() + "/" + obj.getFilename().replaceAll(".java", "");
				if (!corverageData.containsKey(key)) {
					corverageData.put(key, obj);
				}
				int index = obj.getTreeName().lastIndexOf("/nbss/");
				if (index != -1) {
					String fullPath = obj.getTreeName().substring(index).replaceAll(".java", "");
					String fullKey = obj.getDeployEnv() + "/" +  obj.getPhase() + "/" + obj.getTeam().trim() + "/" + fullPath;
					if (!corverageData.containsKey(fullKey)) {
						corverageData.put(fullKey, obj);
					}
				}
				
			}
			for (QualityTestcase obj : testcase) {
				String key = obj.getTestLevel() + "/" +  obj.getProgramId();
				if (!testcaseData.containsKey(key)) {
					testcaseData.put(key, obj);
				}
			}
			for (QualityDetail obj : detail) {
				try {
					this.setInterfaceInfo(obj, interfaces);
					this.setChangeProgramInfo(obj);
					if (this.isCoverageTarget(obj)) {
						this.setQualityCodeCoverage(obj, corverageData, relData, testcaseData);
					}
					if (this.isSupportFindTestProgram(obj)) {
						Map<String, String> dupKey = new HashMap<String, String>();
						this.setTestcaseMappingByFindTestProgram(obj.getProgramId(), obj, relData, testcaseData, dupKey, "UT", testPrograms);
						dupKey = new HashMap<String, String>();
						this.setTestcaseMappingByFindTestProgram(obj.getProgramId(), obj, relData, testcaseData, dupKey, "SIT", testPrograms);
					}
					this.setTestcaseInfo(obj, testcaseData);
					this.setNotUseSource(obj, notUsedData);
					QualitySvnFile file =  svnFileData.get(obj.getFilename().replaceAll("[.]", "/"));
					if (file == null) {
						file = svnFileData.get(obj.getProgramId());
					}
					if (file != null) {
						obj.setFileSize(file.getSize());
						obj.setLastCommitDate(file.getLastCommitDate());
						obj.setSvnFilePath(file.getFilePath());
					}
					this.setCheckedTargetData(obj, exclude);
					String key = obj.getFilename().replaceAll("[.]", "/");
					if (!detailData.containsKey(key)) {
						detailData.put(key, obj);
					}
					if (!detailData.containsKey(obj.getProgramId())) {
						detailData.put(obj.getProgramId(), obj);
					}
				} catch (Exception e) {
					logger.error("############# Error IssueId :" + obj.getIssueId());
					throw new IntegrationException(e);
				}
			}
			
			this.setQualtiyRealtion(detailData, opCoverage, relationData, historys);
//			this.setQualtiyRealtion(detailData, opCoverage, programRelation, historys);
			
			this.addQualityData(detail, relationData, programRelation, interfaces, testPrograms);
		}
	}
	
	private boolean isSupportFindTestProgram(QualityDetail obj) {
		return  obj.getProgramSmallType() != null 
				&& ("SO".equals(obj.getProgramSmallType()) || "BOC".equals(obj.getProgramSmallType())
						|| "BO".equals(obj.getProgramSmallType()) || "DO".equals(obj.getProgramSmallType()));
	}
	
	private void setTestcaseMappingByFindTestProgram(String key, QualityDetail detail, Map<String, List<QualityRelation>> relData, Map<String, QualityTestcase> testcaseData, Map<String, String> procKey, String testType, Map<String, QualityTestProgram> testPrograms) {
		List<QualityRelation> temps = relData.get(key);
		procKey.put(key, key);
		if (temps != null && !temps.isEmpty()) {
			for (QualityRelation obj : temps) {
				detail.setTestProgramId(obj.getSourceFile());
				QualityTestcase temp2 = testcaseData.get(testType + "/" +  obj.getSourceFile());
				if (temp2 != null && detail.getTestProgramId() != null) {
					String programKey = detail.getIssueId() + "/" + detail.getProgramId() + "/" + detail.getTestProgramId() + "/" + testType + "/" + temp2.getUtJiraId();
					if (!testPrograms.containsKey(programKey)) {
						QualityTestProgram tp = new QualityTestProgram(detail.getIssueId(), detail.getProgramId(), detail.getTestProgramId(), testType, temp2.getUtJiraId());
						testPrograms.put(programKey, tp);
					}
				} 
				if (key.equals(obj.getSourceFile()) || procKey.containsKey(obj.getSourceFile())) continue;
				this.setTestcaseMappingByFindTestProgram(obj.getSourceFile(), detail, relData, testcaseData, procKey, testType, testPrograms);
			}
		}
	}
	
	private void setCheckedTargetData(QualityDetail obj, Map<String, QualityCoverage> exclude) {
		obj.setCheckTargetYn("N");
		if (obj.getProgramType() != null && "BO".equals(obj.getProgramType())) {
			if (obj.getTotalFunction()  != 0) {
				BigDecimal temp = new BigDecimal(obj.getTotalStatement()).divide(new BigDecimal(obj.getTotalFunction()), 2, BigDecimal.ROUND_UP); 
				if (temp.intValue() < 20 && obj.getTotalStatement() < 30) {
					String key = obj.getFilename().replaceAll("[.]", "/");
					if (!exclude.containsKey(key) && !exclude.containsKey(obj.getProgramId())) {
						obj.setCheckTargetYn("Y");
						obj.setCheckMessage("개발 미완성 소스");
					}
				}
			} 
		}
		if (obj.getProgramType() != null && !"UI".equals(obj.getProgramType()) && !"ESB".equals(obj.getProgramType())) {
			if ("SO".equals(obj.getProgramType()) || "BOC".equals(obj.getProgramType())
					|| "BO".equals(obj.getProgramType()) || "JO".equals(obj.getProgramType())) {
				if (!obj.getProgramId().endsWith(obj.getProgramType())) {
					obj.setCheckTargetYn("Y");
					obj.setCheckMessage("표준 명명 규칙 위반 또는 프로그램 유형 매핑 오류");
				}
			}
		}
	}
	
	private void setNotUseSource(QualityDetail obj, Map<String, NotUsedStat> notUsedData) {
		Date due = DateUtil.getDateByString(obj.getDueDate(), DateUtil.Format.YYYY_MM_DD.getValue());
		Date now = DateUtil.getNow();
		if ((obj.getDoneRatio() == 100 || due.compareTo(now) == -1)) {
			if (!"Y".equals(obj.getRunYn()) && !"Y".equals(obj.getSitRunYn())) {
				if (notUsedData.containsKey(obj.getProgramId())) {
					obj.setUnusedYn("Y");
				}
			}
		}
	}
	
	private void setTestcaseInfo(QualityDetail obj, Map<String, QualityTestcase> testcaseData) {
		String key = obj.getProgramId();
		if ("EAI".equals(obj.getProgramType()) 
				|| "BIF".equals(obj.getProgramType()) 
				|| "ETT".equals(obj.getProgramType())
				|| "IFL".equals(obj.getProgramType())) {
			key = obj.getInterfaceId();
		}
		if (this.isTestcaseTarget(obj)) {
			QualityTestcase temp = testcaseData.get("UT/" +  key);
			if (temp != null) {
				if ("Closed".equals(temp.getStatus()) || "Resolved".equals(temp.getStatus())) {
					obj.setUtCaseType("COMPLETED");
				} else {
					obj.setUtCaseType("TESTING");
				}
				obj.setUtJiraId(temp.getUtJiraId());
			} else {
				obj.setUtCaseType("NO_TEST");
			}
			
			QualityTestcase temp2 = testcaseData.get("SIT/" +  key);
			if (temp2 != null) {
				if ("Closed".equals(temp2.getStatus()) || "Resolved".equals(temp2.getStatus())) {
					obj.setSitCaseType("COMPLETED");
				} else {
					obj.setSitCaseType("TESTING");
				}
				obj.setSitJiraId(temp2.getUtJiraId());
			} else {
				obj.setSitCaseType("NO_TEST");
			}
			
			
		} else {
			obj.setUtCaseType("NO_TGT");
		}
	}
	
	private void setTestcaseMappingByJira(String key, QualityDetail detail, Map<String, List<QualityRelation>> relData, Map<String, QualityTestcase> testcaseData, Map<String, String> procKey) {
		List<QualityRelation> temps = relData.get(key);
		procKey.put(key, key);
		if (temps != null && !temps.isEmpty()) {
			for (QualityRelation obj : temps) {
				detail.setTestProgramId(obj.getSourceFile());
				QualityTestcase temp2 = testcaseData.get("SIT/" +  obj.getSourceFile());
				if (temp2 != null && detail.getTestProgramId() != null) {
					detail.setSitIncludeYn("Y");
					detail.setSitJiraId(temp2.getUtJiraId());
					break;
				} 
				if (key.equals(obj.getSourceFile()) || procKey.containsKey(obj.getSourceFile())) continue;
				this.setTestcaseMappingByJira(obj.getSourceFile(), detail, relData, testcaseData, procKey);
			}
		}
	}
	
	private boolean isTestcaseTarget(QualityDetail obj) {
		Date due = DateUtil.getDateByString(obj.getDueDate(), DateUtil.Format.YYYY_MM_DD.getValue());
		Date now = DateUtil.getNow();
		return (obj.getDoneRatio() == 100 || due.compareTo(now) == -1) 
				&& ("JO".equals(obj.getProgramType()) || "UI".equals(obj.getProgramType())
					|| "EAI".equals(obj.getProgramType()) || "BIF".equals(obj.getProgramType()) 
					|| "ETT".equals(obj.getProgramType()) || "IFL".equals(obj.getProgramType()));
	}
	
	private void addQualityData(List<QualityDetail> detail, Map<String, QualityRel> relationData, Map<String, QualityRel> programRelation, Map<String, QualityInterface> interfaces, Map<String, QualityTestProgram> testPrograms) {
		QualityDetail param = new QualityDetail();
		param.setStatDate(DateUtil.getNowByFormat(DateUtil.Format.YYYY_MM_DD.getValue()));
		quailtyBatchDao.removeQualityDetail(param);
		quailtyBatchDao.addQualityDetail(detail); 
		quailtyBatchDao.removeQualityInfo(param);
		quailtyBatchDao.addQuailtyInfo(param);		
		quailtyBatchDao.removeQualityRelation(param);
		quailtyBatchDao.addQualityRelation(new ArrayList<QualityRel>(relationData.values()));
		quailtyBatchDao.removeQualityInterface(param);
		quailtyBatchDao.addQualityInterface(new ArrayList<QualityInterface>(interfaces.values()));

		quailtyBatchDao.removeQualityTestProgram(param);
		quailtyBatchDao.addQualityTestProgram(new ArrayList<QualityTestProgram>(testPrograms.values()));
	}
	
	private void setChangeProgramInfo(QualityDetail obj) {
		obj.setUnusedYn("N");
		obj.setRunYn("-");
		obj.setSitIncludeYn("-");
		obj.setStatDate(DateUtil.getNowByFormat(DateUtil.Format.YYYY_MM_DD.getValue()));
		if ("SO".equals(obj.getProgramSmallType()) 
				|| "BOC".equals(obj.getProgramSmallType())
				|| "BO".equals(obj.getProgramSmallType())
				|| "JO".equals(obj.getProgramSmallType())
				|| "DO".equals(obj.getProgramSmallType())
				|| "DTO".equals(obj.getProgramSmallType())) {
			obj.setProgramType(obj.getProgramSmallType());
		} else if ("ESB".equals(obj.getProgramType())) {
			obj.setProgramType("ESB");
		} else if ("UI".equals(obj.getProgramType())
					|| "Nexacro UI".equals(obj.getProgramSmallType())) {
			obj.setProgramType("UI");
		} else if ("IF".equals(obj.getProgramType())) {
			obj.setProgramType(obj.getProgramSmallType());
		} else {
			obj.setProgramType("ETC");
		}
	}
	
	private void setInterfaceInfo(QualityDetail obj, Map<String, QualityInterface> interfaces) {
		if ("IF".equals(obj.getProgramType()) 
				&& obj.getInterfaceId() != null 
				&& !"".equals(obj.getInterfaceId())) {
			if (obj.getSourceSystem() != null && !"".equals(obj.getSourceSystem())
					&& obj.getTargetSystem() != null && !"".equals(obj.getTargetSystem())) {
				String[] targets = obj.getTargetSystem().split(",");
				for (String target : targets) {
					target = target.trim();
					String key = obj.getInterfaceId() + "/" + obj.getSourceSystem() + "/" + target;
					if (!interfaces.containsKey(key)) {
						QualityInterface temp = new QualityInterface();
						temp.setStatDate(DateUtil.getNowByFormat(DateUtil.Format.YYYY_MM_DD.getValue()));
						temp.setInterfaceId(obj.getInterfaceId());
						temp.setInterfacePattern(obj.getInterfacePattern());
						temp.setInterfaceType(obj.getInterfaceType());
						temp.setSourceSystem(obj.getSourceSystem());
						temp.setTargetSystem(target);
						temp.setOwnTeam(obj.getOwnTeam());
						interfaces.put(key, temp);
					}
				}
			}
			
		}
	}
	
	private boolean isCoverageTarget(QualityDetail obj) {
		Date due = DateUtil.getDateByString(obj.getDueDate(), DateUtil.Format.YYYY_MM_DD.getValue());
		Date now = DateUtil.getNow();
		return (obj.getDoneRatio() == 100 || (due != null && due.compareTo(now) == -1)) 
				&& obj.getProgramSmallType() != null 
				&& ("SO".equals(obj.getProgramSmallType()) || "BOC".equals(obj.getProgramSmallType())
						|| "BO".equals(obj.getProgramSmallType()) || "JO".equals(obj.getProgramSmallType()));
	}
	
	private void setQualityCodeCoverage(QualityDetail obj,  Map<String, QualityCoverage> corverageData, Map<String, List<QualityRelation>> relData, Map<String, QualityTestcase> testcaseData) {
		obj.setLoc(0);
		obj.setTotalStatement(0);
		obj.setRunStatement(0);
		obj.setRunFunction(0);
		obj.setTotalFunction(0);
		obj.setRunYn("N");
		obj.setSitStatement(new BigDecimal(0));
		obj.setSitRunYn("N");
		obj.setSitIncludeYn("N");
		String phase = obj.getModule() != null && "BCOL".equals(obj.getModule()) ? obj.getPhase() : "PA3";
		String filename = obj.getFilename() != null && obj.getFilename().substring(0, 1).equals("/") ? obj.getFilename() : "/" + obj.getFilename();
		if (obj.getFilename() == null || obj.getFilename().equals("")) filename = "NULL";
		filename = filename.replaceAll("[.]", "/");
		String key = "UT/" +  phase + "/" + obj.getTeam() + "/" +  filename;
		if ("B-RDS".equals(obj.getTeam())) {
			key = "UT/" +  phase + "/" + obj.getTeam() + "/" + obj.getProgramId();
		}
		QualityCoverage qc = corverageData.get(key);
		if (qc != null) { 
			obj.setLoc(qc.getTotalStatement());
			obj.setTotalStatement(qc.getTotalStatement());
			obj.setRunStatement(qc.getRunStatement());
			obj.setRunFunction(qc.getRunFunc());
			obj.setTotalFunction(qc.getTotalFunc());
			String runYn = "N";
			if (("SO".equals(obj.getProgramSmallType()) && qc.getRunFunc() > 4)
				|| (("BO".equals(obj.getProgramSmallType()) || "BOC".equals(obj.getProgramSmallType())) && qc.getRunFunc() > 1)
				|| ("JO".equals(obj.getProgramSmallType()) && qc.getRunFunc() > 0)) {
				runYn = "Y";
			} 
			if ("Y".equals(runYn)) {
				obj.setStatement(qc.getStatement());
			} else {
				obj.setStatement(new BigDecimal(0));
			}
			obj.setRunYn(runYn);
		}
		
		key = "SIT/" +  phase + "/" + obj.getTeam() + "/" +  filename;
		if ("B-RDS".equals(obj.getTeam())) {
			key = "SIT/" +  phase + "/" + obj.getTeam() + "/" + obj.getProgramId();
		}
		QualityCoverage qc2 = corverageData.get(key);
		if (qc2 != null) {
			obj.setSitStatement(qc2.getStatement());
			String runYn = "N";
			if (("SO".equals(obj.getProgramSmallType()) && qc2.getRunFunc() > 4)
				|| (("BO".equals(obj.getProgramSmallType()) || "BOC".equals(obj.getProgramSmallType())) && qc2.getRunFunc() > 1)
				|| ("JO".equals(obj.getProgramSmallType()) && qc2.getRunFunc() > 0)) {
				runYn = "Y";
			}
			if ("Y".equals(runYn)) {
				obj.setSitStatement(qc2.getStatement());
			} else {
				obj.setSitStatement(new BigDecimal(0));
			}
			obj.setSitRunYn(runYn);
		}
		
		if (!"JO".equals(obj.getProgramType())) {
			Map<String, String> procKey = new HashMap<String, String>();
			this.setTestcaseMappingByJira(obj.getProgramId(), obj, relData, testcaseData, procKey);
		} else {
			obj.setTestProgramId(obj.getProgramId());
		}
		
		if (obj.getSitIncludeYn() != null && !obj.getSitIncludeYn().equals("Y")) {
			QualityTestcase temp2 = testcaseData.get("SIT/" +  obj.getTestProgramId());
			if (temp2 != null && obj.getTestProgramId() != null) {
				obj.setSitIncludeYn("Y");
				obj.setSitJiraId(temp2.getUtJiraId());
			} else {
				if (obj.getSitRunYn() != null && obj.getSitRunYn().equals("Y")) {
					obj.setSitIncludeYn("Y");
				} else {
					obj.setSitIncludeYn("N");
				}
			}
		}
		
		
	}

	@Override
	public List<QualityDetail> getQualityDetailList(QualityDetail param) {
		if (param.getSearchFilter() != null && "qualityTarget".equals(param.getSearchFilter())) {
			param.setStartDate(DateUtil.getDateByFormat(DateUtil.addDate(DateUtil.getNowByWeekFirstDay(), -7), DateUtil.Format.YYYY_MM_DD.getValue()));
			param.setDueDate(DateUtil.getDateByFormat(DateUtil.addDate(DateUtil.getNowByWeekLastDay(), -7), DateUtil.Format.YYYY_MM_DD.getValue()));
		}
		return qualityDao.getQualityDetailList(param);
	}

	@Override
	public List<QualitySummary> getQualityDeveloperTopList(QualitySummary param) {
		Map<String,List<QualitySummary>> dailyData = new LinkedHashMap<String, List<QualitySummary>>();
		List<QualitySummary> temps = qualityDao.getQualityDeveloperTopList(param);
		List<QualitySummary> result = null;
		if (param.getSearchMode() == null) {
			for (QualitySummary obj : temps) {
				this.setQualityRankCount(obj, param);
			}
			Collections.sort(temps, new QualityRankComparator());
			return temps.subList(0, temps.size() < 11 ? temps.size() : 11);
		} else {
			Map<String, List<BigDecimal>> verifyHisotys = new LinkedHashMap<String, List<BigDecimal>>();
			Map<String, List<BigDecimal>> sourceHistorys = new LinkedHashMap<String, List<BigDecimal>>();
			for (QualitySummary obj : temps) {
				List<QualitySummary> summarys = dailyData.get(obj.getStatDate());
				if (summarys == null) {
					summarys = new ArrayList<QualitySummary>();
					dailyData.put(obj.getStatDate(), summarys);
				}
				summarys.add(obj);
			}
			Iterator<Entry<String, List<QualitySummary>>> ie = dailyData.entrySet().iterator();
			while (ie.hasNext()) {
				Entry<String, List<QualitySummary>> e = ie.next();
				for (QualitySummary obj : e.getValue()) {
					this.setQualityRankCount(obj, param);
					List<BigDecimal> historys = verifyHisotys.get(obj.getDeveloper());
					if (historys == null) {
						historys = new ArrayList<BigDecimal>();
						verifyHisotys.put(obj.getDeveloper(), historys);
					}
					historys.add(obj.getTotalScore());
					if (obj.getStatDate().equals(DateUtil.getNowByFormat(DateUtil.Format.YYYY_MM_DD.getValue()))
							&& obj.getVerifyHistorys() == null) {
						obj.setVerifyHistorys(historys);
					}
					List<BigDecimal> sourceHist = sourceHistorys.get(obj.getDeveloper());
					if (sourceHist == null) {
						sourceHist = new ArrayList<BigDecimal>();
						sourceHistorys.put(obj.getDeveloper(), sourceHist);
					}
					sourceHist.add(obj.getFileSize2());
					if (obj.getStatDate().equals(DateUtil.getNowByFormat(DateUtil.Format.YYYY_MM_DD.getValue()))
							&& obj.getSourceHistorys() == null) {
						obj.setSourceHistorys(sourceHist);
					}
				}
				if (e.getKey().equals(DateUtil.getNowByFormat(DateUtil.Format.YYYY_MM_DD.getValue()))) {
					result = e.getValue();
				}
			}

			Collections.sort(result, new QualityRankAscComparator());
			return result;	
		}
	}
	
	private BigDecimal getVerifyScore(int parentValue, int childValue, double fixedValue) {
		BigDecimal base = new BigDecimal(1);
		BigDecimal parent = new BigDecimal(parentValue);
		BigDecimal child = new BigDecimal(childValue);
		BigDecimal fixed = new BigDecimal(fixedValue);
		BigDecimal temp = parentValue == 0 ? new BigDecimal(1) : parent.intValue() < child.intValue() ? new BigDecimal(1) : child.divide(parent, 2, BigDecimal.ROUND_UP);
		BigDecimal result = base.subtract(temp);
		return result.multiply(fixed);
	}
	
	private void setQualityRankCount(QualitySummary obj, QualitySummary param) {
		obj.setVerifyScore(new BigDecimal(0));
		int devValue = 0;
		int totValue = 0;
		if (param.getTopList() != null) {
			int etcValue = obj.getPgComTarget()-obj.getSvnReg() < 0 ? 0 : obj.getPgComTarget()-obj.getSvnReg();
			BigDecimal temp = new BigDecimal(obj.getPgComTarget()-etcValue).divide(new BigDecimal(param.getTopList().size()), 3, BigDecimal.ROUND_UP);
			for (String target : param.getTopList()) {
				if (target.equals("pgDelay")) {
					obj.setVerifyScore( obj.getVerifyScore().add(this.getVerifyScore(obj.getPgComTarget(), obj.getPgDelay(), temp.doubleValue())));
					obj.setRankCount( obj.getRankCount() + obj.getPgDelay());
				} else if (target.equals("utNotest")) {
					obj.setVerifyScore( obj.getVerifyScore().add(this.getVerifyScore(obj.getUtTarget(), obj.getUtNotest(), temp.doubleValue())));
					obj.setRankCount( obj.getRankCount() + obj.getUtNotest());
				} else if (target.equals("notRun")) {
					obj.setVerifyScore( obj.getVerifyScore().add(this.getVerifyScore(obj.getRunTarget(), obj.getNotRun(), temp.doubleValue())));
					obj.setRankCount( obj.getRankCount() + obj.getNotRun());
				} else if (target.equals("unUsedSource")) {
					obj.setVerifyScore( obj.getVerifyScore().add(this.getVerifyScore(obj.getPgComTarget(), obj.getUnUsedSource(), temp.doubleValue())));
					obj.setRankCount( obj.getRankCount() + obj.getUnUsedSource());
				} else if (target.equals("underStatement")) {
					obj.setVerifyScore( obj.getVerifyScore().add(this.getVerifyScore(obj.getRunTarget(), obj.getUnderStatement(), temp.doubleValue())));
					obj.setRankCount( obj.getRankCount() + obj.getUnderStatement());
				} else if (target.equals("utCoverage")) {
					obj.setVerifyScore( obj.getVerifyScore().add(this.getVerifyScore(obj.getRunTarget(), obj.getUtCoverage(), temp.doubleValue())));
					obj.setRankCount( obj.getRankCount() + obj.getUtCoverage());
				} else if (target.equals("sitNotest")) {
					obj.setVerifyScore( obj.getVerifyScore().add(this.getVerifyScore(obj.getSitTarget(), obj.getSitNotest(), temp.doubleValue())));
					obj.setRankCount( obj.getRankCount() + obj.getSitNotest());
				} else if (target.equals("underSitCoverage")) {
					obj.setVerifyScore( obj.getVerifyScore().add(this.getVerifyScore(obj.getRunTarget(), obj.getUnderSitCoverage(), temp.doubleValue())));
					obj.setRankCount( obj.getRankCount() + obj.getUnderSitCoverage());
				}
			}
			
			obj.setVerifyScore(obj.getVerifyScore().setScale(3, BigDecimal.ROUND_UP));
			BigDecimal itemRatio = new BigDecimal(obj.getPgComTarget()-etcValue).divide(new BigDecimal(obj.getTotal()), 5, BigDecimal.ROUND_UP).multiply(new BigDecimal(100));
			BigDecimal adjt = obj.getVerifyScore().divide(new BigDecimal(obj.getTotal()), 5, BigDecimal.ROUND_UP).multiply(new BigDecimal(100));
			obj.setAdjtRatio(itemRatio);
			obj.setTotalScore(adjt);
		}
	}

	@Override
	public List<QualityHistorySummary> getQualityHistorySummary(QualityHistorySummary param) {
		return qualityDao.getQualityHistorySummary(param);
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private void setQualityHistoryChartData(QualityHistoryChart chart, Integer index, QualityHistorySummary obj, QualityHistorySummary param) {
		Class clazz = chart.getClass();
		try {
			
			Method invokeMethod = clazz.getMethod("setName" + index.intValue(), new String().getClass());
			invokeMethod.invoke(chart, obj.getTeam() + "-" + (obj.getModule() == null ? "" : obj.getModule()));
			invokeMethod = clazz.getMethod("setData" + index.intValue(), new BigDecimal(0).getClass());
			if ("programDev".equals(param.getSearchType())) {
				invokeMethod.invoke(chart, obj.getComRatio2());
			} else if ("unusedSource".equals(param.getSearchType())) {
				invokeMethod.invoke(chart, obj.getUnusedSource2());
			} else if ("underStatement".equals(param.getSearchType())) {
				invokeMethod.invoke(chart, obj.getUnderStatement2());
			} else if ("utRun".equals(param.getSearchType())) {
				invokeMethod.invoke(chart, obj.getUtNoTestRatio2());
			} else if ("runRatio".equals(param.getSearchType())) {
				invokeMethod.invoke(chart, obj.getRunRatio2());
			} else if ("utCoverage".equals(param.getSearchType())) {
				invokeMethod.invoke(chart, obj.getCoverageRatio2());
			} else if ("sitRun".equals(param.getSearchType())) {
				invokeMethod.invoke(chart, obj.getSitNoTestRatio2());
			} else if ("sitCoverage".equals(param.getSearchType())) {
				invokeMethod.invoke(chart, obj.getSitCoverageRatio2());
			} else if ("checkTarget".equals(param.getSearchType())) {
				invokeMethod.invoke(chart, obj.getCheckTarget2());
			} else if ("sourceSize".equals(param.getSearchType())) {
				invokeMethod.invoke(chart, obj.getFileSize2());
			} else if ("changeSource".equals(param.getSearchType())) {
				invokeMethod.invoke(chart, obj.getChangeFile2());
			} else if ("sitClssRun".equals(param.getSearchType())) {
				invokeMethod.invoke(chart, obj.getSitRunRatio());
			} else if ("sitNoTest".equals(param.getSearchType())) {
				invokeMethod.invoke(chart, obj.getSitNoTest2());
			} else if ("utNoTest".equals(param.getSearchType())) {
				invokeMethod.invoke(chart, obj.getUtNoTest2());
			} else if ("svnNotReg".equals(param.getSearchType())) {
				invokeMethod.invoke(chart, obj.getSvnNotReg());
			} else {
				throw new IntegrationException("ERROR.0001", "지정된 메소드가 없습니다."); 
			}
			if (chart.getData1() != null) chart.setOwnData1(chart.getData1());
			if (chart.getData2() != null) chart.setOwnData2(chart.getData2());
			if (chart.getData3() != null) chart.setOwnData3(chart.getData3());
			if (chart.getData4() != null) chart.setOwnData4(chart.getData4());
			if (chart.getData5() != null) chart.setOwnData5(chart.getData5());
			if (chart.getData6() != null) chart.setOwnData6(chart.getData6());
			if (chart.getData7() != null) chart.setOwnData7(chart.getData7());
		} catch (SecurityException e) {
			throw new IntegrationException("ERROR.0001", "접근할 수 없는 메소스 입니다.");
		} catch (NoSuchMethodException e) {
			throw new IntegrationException("ERROR.0001", "지정된 메소드가 없습니다.");
		} catch (IllegalArgumentException e) {
			throw new IntegrationException("ERROR.0001", "지정된 메소드의 Argument가 올바르지 않습니다.");
		} catch (IllegalAccessException e) {
			throw new IntegrationException("ERROR.0001", "지정된 메소드에 접근이 올바르지 않습니다.");
		} catch (InvocationTargetException e) {
			throw new IntegrationException("ERROR.0001", "호출 대상에 오류가 발생되었습니다.");
		}
	}
	@Override
	public List<QualityHistoryChart> getQualityHistoryChart(QualityHistorySummary param) {
		int index = 0;
		List<QualityHistorySummary> temps = qualityDao.getQualityHistoryChart(param);
		Map<String, QualityHistoryChart> result = new LinkedHashMap<String, QualityHistoryChart>();
		Map<String, Integer> indexData = new HashMap<String, Integer>();
		for (QualityHistorySummary obj : temps) {
			String key = obj.getStatDate();
			QualityHistoryChart chart = result.get(key);
			if (chart == null) {
				chart = new QualityHistoryChart();
				chart.setOriginStatDate(obj.getOriginStatDate());
				chart.setStatDate(key);
				result.put(key, chart);
			} 
			String indexKey = obj.getTeam() + "/" + (obj.getModule() == null ? "" : obj.getModule());
			Integer intValue = indexData.get(indexKey);
			if (intValue == null || intValue.intValue() == 0){
				index++;
				intValue = new Integer(index);
				indexData.put(indexKey, intValue);
			}
			this.setQualityHistoryChartData(chart, intValue, obj, param);
		}
		if ("sourceSize".equals(param.getSearchType())) {
			Iterator<Entry<String, QualityHistoryChart>> ie = result.entrySet().iterator();
			while (ie.hasNext()) {
				Entry<String, QualityHistoryChart> e = ie.next();
				QualityHistoryChart chart = e.getValue();
				Date prevDate = DateUtil.addDate(DateUtil.getDateByString(chart.getOriginStatDate(), DateUtil.Format.YYYY_MM_DD.getValue()), -1);
				String prevKey = DateUtil.getDateByFormat(prevDate, DateUtil.Format.MM_dd.getValue());
				prevKey = prevKey.replaceAll("-", "/");
				QualityHistoryChart chartTemp = result.get(prevKey);
				if (chartTemp == null) {
					chart.setData1(new BigDecimal(0));
					chart.setData2(new BigDecimal(0));
					chart.setData3(new BigDecimal(0));
					chart.setData4(new BigDecimal(0));
					chart.setData5(new BigDecimal(0));
					chart.setData6(new BigDecimal(0));
					chart.setData7(new BigDecimal(0));
				} else {
					if (chart.getData1() != null)
						chart.setData1(chartTemp.getOwnData1() == null ? new BigDecimal(0) : chart.getOwnData1().subtract(chartTemp.getOwnData1()));
					if (chart.getData2() != null)
						chart.setData2(chartTemp.getOwnData2() == null ? new BigDecimal(0) : chart.getOwnData2().subtract(chartTemp.getOwnData2()));
					if (chart.getData3() != null)
						chart.setData3(chartTemp.getOwnData3() == null ? new BigDecimal(0) : chart.getOwnData3().subtract(chartTemp.getOwnData3()));
					if (chart.getData4() != null)
						chart.setData4(chartTemp.getOwnData4() == null ? new BigDecimal(0) : chart.getOwnData4().subtract(chartTemp.getOwnData4()));
					if (chart.getData5() != null)
						chart.setData5(chartTemp.getOwnData5() == null ? new BigDecimal(0) : chart.getOwnData5().subtract(chartTemp.getOwnData5()));
					if (chart.getData6() != null)
						chart.setData6(chartTemp.getOwnData6() == null ? new BigDecimal(0) : chart.getOwnData6().subtract(chartTemp.getOwnData6()));
					if (chart.getData7() != null)
						chart.setData7(chartTemp.getOwnData7() == null ? new BigDecimal(0) : chart.getOwnData7().subtract(chartTemp.getOwnData7()));
				}
			}
		}
		return new ArrayList<QualityHistoryChart>(result.values());
	}

	@Override
	public String getSvnFileInfo(String svnFilePath) {
		StringBuffer sb = new StringBuffer();
		try {
			URL url = new URL(SVN_BASE_URL + svnFilePath);
			this.setSvnFileinfo(url, sb, svnFilePath);
		} catch (MalformedURLException e) {
			throw new IntegrationException("ERROR.0001", "URL 포맷이 잘못 되었습니다.");
		} catch (IOException e) {
			try {
				URL url = new URL(SVN_BASE_URL_ETC + svnFilePath);
				this.setSvnFileinfo(url, sb, svnFilePath);
			} catch (MalformedURLException ex) {
				throw new IntegrationException("ERROR.0001", "URL 포맷이 잘못 되었습니다.");
			} catch (IOException ex) {
				sb.append("파일이 존재하지 않거나 형식이 잘못되었습니다.");
			}
		}
		return sb.toString();
	}
	
	private void setSvnFileinfo(URL url, StringBuffer sb, String svnFilePath) throws MalformedURLException, IOException {
		String line;
		Authenticator.setDefault(new SvnUrlAuthenticator("qaapp", "New1234!"));
		String userPassword = "qaapp:New1234!";
		String basicAuth = "Basic " + new String(new Base64().encode(userPassword.getBytes()));
		URLConnection connection = (URLConnection)url.openConnection();
		connection.setRequestProperty("Authorization", basicAuth);
		InputStream is = connection.getInputStream();
		String type = null;
		int index = svnFilePath.lastIndexOf(".");
		if (index != -1) {
			type = svnFilePath.substring(index + 1);
		}
		BufferedReader in = new BufferedReader(new InputStreamReader(is, "java".equals(type) ? "EUC-KR" : "UTF-8"));
		while ((line = in.readLine()) != null) {
			sb.append(line).append("\n");
		}
	}

	@Override
	public Map<String, QualitySummary> getQaulityDetailListByProgramType(QualityDetail param) {
		Map<String, QualitySummary> result = new HashMap<String, QualitySummary>();
		List<QualitySummary> temps = qualityDao.getQaulityDetailListByProgramType(param);
		
		for (QualitySummary obj : temps) {
			result.put(obj.getProgramType(), obj);
		}
		
		return result;
	}

	@Override
	public List<InterfaceSummary> getQualityInterfaceSummary(InterfaceSummary param) {
		List<InterfaceSummary> result = new ArrayList<InterfaceSummary>();
		if ("대내".equals(param.getRelationType()) || "대외".equals(param.getRelationType())) {
			result = qualityDao.getQualityInterfaceSummaryBySystem(param);
		} else {
			result = qualityDao.getQualityInterfaceSummary(param);
		}
		return result;
	}

	@Override
	public List<InterfaceDetail> getQualityInterfaceList(InterfaceDetail param) {
		return qualityDao.getQualityInterfaceList(param);
	}

	@Override
	public List<QualityTest> getQualityTestProgramCount(QualityTest param) {
		return qualityDao.getQualityTestProgramCount(param);
	}

	@Override
	public List<QualityTest> getQualtiyTestRealtion(QualityTest param) {
		return qualityDao.getQualtiyTestRealtion(param);
	}

	@Override
	public List<QualityTest> getQualityTestProgramCountChart(QualityTest param) {
		Map<String, QualityTest> result = new LinkedHashMap<String, QualityTest>();
		List<QualityTest> temps = qualityDao.getQualityTestProgramCount(param);
		for (QualityTest obj : temps) {
			String key = obj.getProgramType();
			if (!("UI".equals(key) 
					|| "ESB".equals(key) || "SO/JO".equals(key)
					|| "BO".equals(key)
					|| "BOC".equals(key))) {
				key = "ETC";
			}
			QualityTest qt = result.get(key);
			if (qt == null) {
				qt = new QualityTest();
				result.put(key, qt);
			}
			qt.setProgramType(key);
			qt.setProgramRunCount(obj.getProgramRunCount());
			qt.setProgramCount(qt.getProgramCount() + obj.getProgramCount());
			BigDecimal parent = new BigDecimal(obj.getTotal());
			BigDecimal child = new BigDecimal(qt.getProgramCount());
			qt.setProgramRunRaio(obj.getProgramRunRaio());
			qt.setProgramRatio(child.divide(parent, 2, BigDecimal.ROUND_UP).multiply(new BigDecimal(100)));
		}
		return new ArrayList<QualityTest>(result.values());
	}

	@Override
	public List<QualityTest> getQualtiyTestRealtionChart(QualityTest param) {
		return qualityDao.getQualtiyTestRealtionChart(param);
	}

	@Override
	public List<QualityTest> getQualtiyTestRealtionHistChart(QualityTest param) {
		return qualityDao.getQualtiyTestRealtionHistChart(param);
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private QualtiyTestChart getQualityTestChartData(String statDate, List<QualityTest> data, Map<String, Integer> modules) {
		QualtiyTestChart result = new QualtiyTestChart();
		result.setStatDate(statDate);
		if (data != null&& !data.isEmpty() && modules != null && !modules.isEmpty()) {
			for (QualityTest test : data) {
				int index = modules.get(test.getModule());
				Class clazz = result.getClass();
				try {
					Method invokeMethod = clazz.getMethod("setName" + index, new String().getClass());
					invokeMethod.invoke(result, test.getModule());
					invokeMethod = clazz.getMethod("setData" + index, new BigDecimal(0).getClass());
					invokeMethod.invoke(result, new BigDecimal(test.getRelCount1()));
					invokeMethod = clazz.getMethod("setData9" + index, new BigDecimal(0).getClass());
					invokeMethod.invoke(result, new BigDecimal(test.getRelCount2()));
				} catch (SecurityException e) {
					throw new IntegrationException("ERROR.0001", "접근할 수 없는 메소스 입니다.");
				} catch (NoSuchMethodException e) {
					throw new IntegrationException("ERROR.0001", "지정된 메소드가 없습니다.");
				} catch (IllegalArgumentException e) {
					throw new IntegrationException("ERROR.0001", "지정된 메소드의 Argument가 올바르지 않습니다.");
				} catch (IllegalAccessException e) {
					throw new IntegrationException("ERROR.0001", "지정된 메소드에 접근이 올바르지 않습니다.");
				} catch (InvocationTargetException e) {
					throw new IntegrationException("ERROR.0001", "호출 대상에 오류가 발생되었습니다.");
				}
			}
		}
		return result;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private void setChangeQualityTestRelation(QualtiyTestChart pre, QualtiyTestChart now) {
		for (int i=1;i <= 15;i++) {
			
			Class clazzPre = pre.getClass();
			Class clazzNow = now.getClass();
			try {
				Method ivPre = clazzPre.getMethod("getData" + i);
				BigDecimal preTemp1 = (BigDecimal) ivPre.invoke(pre);
				if (preTemp1 == null) preTemp1 = new BigDecimal(0);
				ivPre = clazzPre.getMethod("getData9" + i);
				BigDecimal preTemp2 =  (BigDecimal) ivPre.invoke(pre);
				if (preTemp2 == null) preTemp2 = new BigDecimal(0);
				
				Method ivNow = clazzNow.getMethod("getData" + i);
				BigDecimal nowTemp1 = (BigDecimal) ivNow.invoke(now);
				if (nowTemp1 == null) nowTemp1 = new BigDecimal(0);
				ivNow = clazzNow.getMethod("getData9" + i);
				BigDecimal nowTemp2 =  (BigDecimal) ivNow.invoke(now);
				if (nowTemp2 == null) nowTemp2 = new BigDecimal(0);
				
				ivNow = clazzNow.getMethod("setData" + i, new BigDecimal(0).getClass());
				ivNow.invoke(now, nowTemp1.subtract(preTemp1));
				ivNow = clazzNow.getMethod("setData9" + i, new BigDecimal(0).getClass());
				ivNow.invoke(now, nowTemp2.subtract(preTemp2));
			} catch (SecurityException e) {
				throw new IntegrationException("ERROR.0001", "접근할 수 없는 메소스 입니다.");
			} catch (NoSuchMethodException e) {
				throw new IntegrationException("ERROR.0001", "지정된 메소드가 없습니다.");
			} catch (IllegalArgumentException e) {
				throw new IntegrationException("ERROR.0001", "지정된 메소드의 Argument가 올바르지 않습니다.");
			} catch (IllegalAccessException e) {
				throw new IntegrationException("ERROR.0001", "지정된 메소드에 접근이 올바르지 않습니다.");
			} catch (InvocationTargetException e) {
				throw new IntegrationException("ERROR.0001", "호출 대상에 오류가 발생되었습니다.");
			} catch (NullPointerException e) {
				throw new IntegrationException("ERROR.0001", "추출데이터에 오류가 발생되었습니다.");
			}
		}
	}

	@Override
	public List<QualtiyTestChart> getQualityTestRelationChangeChart(QualityTest param) {
		List<QualityTest> temps = qualityDao.getQualityTestRelationChangeChart(param);
		Map<String, Integer> modules = new HashMap<String, Integer>();
		Map<String, List<QualityTest>> dates = new LinkedHashMap<String, List<QualityTest>>();
		Map<String, QualtiyTestChart> result = new LinkedHashMap<String, QualtiyTestChart>();
		int index = 0;
		for (QualityTest obj : temps) {
			if (!modules.containsKey(obj.getModule())) {
				modules.put(obj.getModule(), ++index);
			}
			List<QualityTest> tests = dates.get(obj.getOriginalStatDate());
			if (tests == null) {
				tests = new ArrayList<QualityTest>();
				dates.put(obj.getOriginalStatDate(), tests);
			}
			tests.add(obj);
		}
		
		Iterator<Entry<String, List<QualityTest>>> ie = dates.entrySet().iterator();
		while(ie.hasNext()) {
			Entry<String, List<QualityTest>> e = ie.next();
			Date prevDate = DateUtil.addDate(DateUtil.getDateByString(e.getKey(), DateUtil.Format.YYYY_MM_DD.getValue()), -1);
			String prevKey = DateUtil.getDateByFormat(prevDate, DateUtil.Format.YYYY_MM_DD.getValue());
			List<QualityTest> preData = dates.get(prevKey);
			List<QualityTest> nowData = dates.get(e.getKey());
			QualtiyTestChart pre = null;
			QualtiyTestChart now = this.getQualityTestChartData(e.getKey(), nowData, modules);
			if (preData != null) {
				pre = this.getQualityTestChartData(prevKey, preData, modules);
			} else {
				pre = new QualtiyTestChart();
				BeanUtils.copyProperties(now, pre);
			}
			
			this.setChangeQualityTestRelation(pre, now);
			result.put(e.getKey(), now);
		}
		
		return new ArrayList<QualtiyTestChart>(result.values());
	}

}
