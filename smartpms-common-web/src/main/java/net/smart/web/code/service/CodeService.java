package net.smart.web.code.service;

import java.util.List;

import net.smart.web.domain.CommonCode;

public interface CodeService {
	
	public List<CommonCode> getCodeList(CommonCode param);
	
	public String getCodeName(String type, String code);
	
	public void addCode(CommonCode param);

}
