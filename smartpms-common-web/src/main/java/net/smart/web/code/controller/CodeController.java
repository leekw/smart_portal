package net.smart.web.code.controller;

import java.util.List;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.annotation.IntegrationResponse;
import net.smart.web.code.service.CodeService;
import net.smart.web.domain.CommonCode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class CodeController {
	
	@Autowired
	private CodeService codeService;
	
	@RequestMapping(value = "/code/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="codes")
	public List<CommonCode> getCommonCodeList(@IntegrationRequest CommonCode param) {
		return codeService.getCodeList(param);
	}

}
