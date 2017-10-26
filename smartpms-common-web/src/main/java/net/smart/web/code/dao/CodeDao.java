package net.smart.web.code.dao;

import java.util.List;

import net.smart.web.domain.CommonCode;

public interface CodeDao {
	
	public List<CommonCode> getCodeList(CommonCode param);
	
	public void addCode(CommonCode param);
}
