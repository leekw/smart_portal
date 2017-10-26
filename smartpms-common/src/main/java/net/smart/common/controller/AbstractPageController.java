package net.smart.common.controller;

import net.smart.common.service.SmartCommonService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;

public abstract class AbstractPageController {
	
	protected static Logger logger = LoggerFactory.getLogger(PageController.class);
	
	@Autowired
	protected SmartCommonService smartCommonService;
	
	protected enum CodeValue {
		CATEGORY("_category"),
		UI("_ui"),
		VIEW("view");
		private String value;
		private CodeValue(String value) {
			this.value = value;
		}
		public String getValue() {
			return value;
		}
	}
	
	protected enum BaseInfo {
		SYS_TITLE("Smart Portal System"),
		MIN_TITLE("Smart Portal"),
		RESOURCE_VERSION("1.0.0"),
		SYS_CONTEXT_PATH("/smart"),
		DEFAULT_PROFILE_PATH(BaseInfo.SYS_CONTEXT_PATH.getValue() + "/resources/images/profile-icon.png"),
		SYS_OWNER("intheforest");
		private String value;
		private BaseInfo(String value) {
			this.value = value;
		}
		public String getValue() {
			return value;
		}
	}
	
	protected final void setPageBasedInfo(ModelAndView modelAndView) {
		modelAndView.addObject("sysTitle", BaseInfo.SYS_TITLE.getValue());
		modelAndView.addObject("resVersion", BaseInfo.RESOURCE_VERSION.getValue());
		modelAndView.addObject("sysContext", BaseInfo.SYS_CONTEXT_PATH.getValue());
		modelAndView.addObject("minTitle", BaseInfo.MIN_TITLE.getValue());
		modelAndView.addObject("sysOwner", BaseInfo.SYS_OWNER.getValue());
	}

}
