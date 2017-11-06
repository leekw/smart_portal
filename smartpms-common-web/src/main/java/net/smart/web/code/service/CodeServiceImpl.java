package net.smart.web.code.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import javax.annotation.PostConstruct;

import net.smart.web.code.dao.CodeDao;
import net.smart.web.domain.CommonCode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("codeServiceImpl")
public class CodeServiceImpl implements CodeService {
	
	private Map<String, List<CommonCode>> codeData;
	
	@Autowired
	private CodeDao codeDao;
	
	private AtomicInteger sync = new AtomicInteger(0);
	
	@PostConstruct
	private void init() {
		synchronized(sync) {
			if (codeData != null && codeData.isEmpty()) {
				codeData.clear();
				codeData = null;
			}
			codeData = new HashMap<String, List<CommonCode>>();
			codeData = this.getAllCodes();
		}
	}
	
	private Map<String, List<CommonCode>> getAllCodes() {
		Map<String, List<CommonCode>> result = new HashMap<String, List<CommonCode>>();
		List<CommonCode> temps = codeDao.getCodeList(new CommonCode());
		for (CommonCode code : temps) {
			List<CommonCode> codes = result.get(code.getCommonCodeType());
			if(codes == null) {
				codes = new ArrayList<CommonCode>();
				result.put(code.getCommonCodeType(), codes);
			}
			codes.add(code);
		}
		return result;
	}

	@Override
	public List<CommonCode> getCodeList(CommonCode param) {
		if (codeData !=null && !codeData.isEmpty()) {
			List<CommonCode> temps = codeData.get(param.getCommonCodeType());
			if (temps == null || temps.isEmpty()) {
				return Collections.emptyList();
			}
			List<CommonCode> results = new LinkedList<CommonCode>();
			for (CommonCode code : temps) {
				if (param.getRefValue1() != null
						&& !code.getRefValue1().equals(param.getRefValue1())) {
					continue;
				}
				if (param.getRefValue2() != null
						&& !code.getRefValue2().equals(param.getRefValue2())) {
					continue;
				}
				results.add(code);
			}
			return results;
		} else {
			return codeDao.getCodeList(param);
		}
	}

	@Override
	public String getCodeName(String type, String code) {
		CommonCode param = new CommonCode();
		param.setCommonCodeType(type);
		for (CommonCode obj : this.getCodeList(param)) {
			if (obj.getCommonCode().equals(code)) 
				return obj.getCommonCodeName();
		}
		return null;
	}

	@Override
	public void addCode(CommonCode param) {
		boolean isAdd = true;
		List<CommonCode> codes = this.getCodeList(param);
		if (!codes.isEmpty()) {
			if (isDuplicationCommonCode(param, codes)) {
				isAdd = false;
			}
		}
		
		if (isAdd) {
			codeDao.addCode(param);
			init();
		}
	}
	
	private boolean isDuplicationCommonCode(CommonCode param, List<CommonCode> codes) {
		for (CommonCode obj : codes) {
			if (obj.getCommonCode().equals(param.getCommonCode())) {
				return true;
			}
		}
		return false;
	}

}
