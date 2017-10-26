package net.smart.common.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.smart.common.domain.IntUser;
import net.smart.common.domain.UserDetail;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.WebAttributes;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PageController extends AbstractPageController {
	
	@RequestMapping(value = "/{category}/{ui}/view.do", method = RequestMethod.GET)
	public ModelAndView movePage(@PathVariable("category") String category, 
			@PathVariable("ui") String ui, HttpServletRequest request, HttpServletResponse response) throws IOException {		
		ModelAndView modelAndView  = new ModelAndView();
		
		String modileYn = "N";
		String callLocation = "internal";
		String ip = request.getHeader("X-FORWARDED-FOR");
		if (ip == null || ip.length() == 0) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0) {
			ip = request.getRemoteAddr();
		}
		if (request.getHeader("User-Agent").indexOf("Mobile") != -1) {
			modileYn = "Y";
		}
		if (request.getRequestURL().indexOf("cutover.kt.com") != -1 
				|| request.getRequestURL().indexOf("14.63.248.74") != -1) {
			callLocation = "external";
		}
		request.setAttribute("IS_MOBILE", modileYn);
		request.setAttribute("CALL_LOC", callLocation);
		request.setAttribute("version", smartCommonService.getSystemDeployVersion());
		request.setAttribute("IS_HANDS", smartCommonService.isAdmin() ? "Y" :"N");
		request.setAttribute("IS_CT_HANDS", smartCommonService.isCutOverAdmin() ? "Y" :"N");
		Map<String, String> mainResource = smartCommonService.getMainResourceInfo();
		if (category.equals("layout") || category.equals("nlayout") || category.equals("main")) {
			if (mainResource != null) {
				request.setAttribute("M_RESOURCE_CONTENT", mainResource.get("resourcecontent"));
			}
		}
		request.setAttribute("M_URL", mainResource.get("url"));
		request.setAttribute("M_RESOURCE_ID", mainResource.get("resourceid"));
		request.setAttribute("M_RESOURCE_NAME", mainResource.get("resourcename"));
		request.setAttribute("M_PARENT_RESOURCE_NAME", mainResource.get("parentresourcename"));
		request.setAttribute("M_RESOURCE_TYPE", mainResource.get("resourcetype"));
			
		String boardNo = request.getParameter("boardNo");
		request.setAttribute("BOARD_NO", boardNo == null ? "0" : boardNo);
		
		SecurityContext securityContext = SecurityContextHolder.getContext();
		if (securityContext != null ) {
			Authentication authentication = securityContext.getAuthentication();
			if (authentication != null) {
				UserDetail userDetail = (UserDetail) authentication.getDetails();
				boolean isLogin = true;
				IntUser intUser = userDetail.getIntUser();
				request.setAttribute("IS_LOGIN", isLogin);
				request.setAttribute("LOGIN_NAME", intUser != null ? intUser.getUserName() : "");
				request.setAttribute("LOGIN_ID", intUser != null ? intUser.getUserId() : "");
				request.setAttribute("PHOTO_PATH", intUser != null && intUser.getPhotoPath() != null ? intUser.getPhotoPath() : BaseInfo.DEFAULT_PROFILE_PATH.getValue());
				if ("external".equals(callLocation)
						&& smartCommonService.isIntegrationDeveloper(intUser.getUserId())) {
					callLocation = "internal";
				}
			}
		}
		
		if ("nlayout".equals(category) || "main".equals(category)) {
			if ("external".equals(callLocation) || "Y".equals(modileYn)) category = "nlayoutm";
			modelAndView.setViewName("viewNew");
		} else {
			modelAndView.setViewName(CodeValue.VIEW.getValue());
		}
		if ("external".equals(callLocation) || "Y".equals(modileYn)) {
			if(!smartCommonService.isPermitExternalUrl(category)) {
				modelAndView.setViewName("notPermit");
			}
		}
		request.setAttribute(CodeValue.CATEGORY.getValue(), category);
		request.setAttribute(CodeValue.UI.getValue(), ui);
		super.setPageBasedInfo(modelAndView);
		
		return modelAndView;
	}
	
	@RequestMapping(value = "/user/reg.do", method = RequestMethod.GET)
	public ModelAndView regUser(ModelAndView modelAndView) {
		modelAndView.setViewName("regUser");
		super.setPageBasedInfo(modelAndView);
		return modelAndView;
	}
	
	
	@RequestMapping(value = "/login.do", method = RequestMethod.GET)
	public ModelAndView loginPage(ModelAndView modelAndView) {
		modelAndView.setViewName("login");
		super.setPageBasedInfo(modelAndView);
		return modelAndView;
	}
	 
	@RequestMapping(value = "/index.do", method = RequestMethod.GET)
	public ModelAndView index(ModelAndView modelAndView) {
		modelAndView.setViewName("index");
		super.setPageBasedInfo(modelAndView);
		return modelAndView;
	}
	
	@RequestMapping(value = "/loginFail.do", method = RequestMethod.GET)
	public ModelAndView loginFailPage(ModelAndView modelAndView, HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			AuthenticationException exception =  (AuthenticationException) request.getSession().getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
			if (exception != null) {
				System.out.println(exception.getMessage());
				request.setAttribute("G_ERROR_MSG", exception.getMessage());
			}
		}
		modelAndView.setViewName("loginFail");
		super.setPageBasedInfo(modelAndView);
		return modelAndView;
	}

}
