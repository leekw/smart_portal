package net.smart.web.support;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.smart.common.domain.IntUser;
import net.smart.common.service.SmartCommonService;
import net.smart.common.support.util.DateUtil;
import net.smart.common.support.util.IntegrationHttpSessionCollector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class IntegrationConnectionInterceptor extends HandlerInterceptorAdapter {

	private List<String> exclutionUrlList;
	
	@Autowired
	private SmartCommonService integrationCommonService;


	@PostConstruct
	public void init() {
		if (this.exclutionUrlList == null) {
			this.exclutionUrlList = new ArrayList<String>();
		}
	}

	public void setExclutionUrlList(List<String> exclutionUrlList) {
		this.exclutionUrlList = exclutionUrlList;
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object obj) throws IOException {
		Map<String, HttpSession> sessions = IntegrationHttpSessionCollector.getConnectionSession();
		HttpSession curSession = request.getSession(false);
		if (curSession != null) {
			HttpSession storeUser = sessions.get(curSession.getId());
			if (storeUser != null) {
				IntUser user = (IntUser) storeUser.getAttribute("SAVED_USER");
				if (user != null) {
					user.setLastActionUrl(request.getRequestURI());
					user.setLastActionDate(DateUtil.getNow());
				}
			}
		}
		
		for (String url : this.exclutionUrlList) {
			if (request.getRequestURI().indexOf(url) != -1)
				return true;
		}
		
		if (request.getRequestURI().indexOf("/layout") != -1) {
			response.sendRedirect("/int/nlayout/app/view.do");
			return false;
		}
		
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
		boolean isAdmin = integrationCommonService.isAdmin();
		if (isAdmin) return true;
		
		int limit = integrationCommonService.getLimitCount();
		
		if (limit == -1) return true;
		
		
		Map<String, HttpSession> allowedSession = new LinkedHashMap<String, HttpSession>(limit);
		
		int index = 0;
		Iterator<Entry<String, HttpSession>> ie = sessions.entrySet().iterator();
		while(ie.hasNext() && index < limit) {
			index++;
			Entry<String, HttpSession> e = ie.next();
			allowedSession.put(e.getKey(), e.getValue());
		}
				
		if (sessions != null && !allowedSession.containsKey(curSession.getId())) {
			response.sendRedirect("/int/etc/wait.html");
			return false;
		}

		return true;
	}

}
