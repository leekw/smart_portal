package net.smart.common.support.util;

import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import net.smart.common.domain.IntUser;
import net.smart.common.domain.UserDetail;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

public class IntegrationHttpSessionCollector implements HttpSessionListener {
	
	private static final Map<String, HttpSession> sessions = new LinkedHashMap<String, HttpSession>();
	
	@Override
	public void sessionCreated(HttpSessionEvent event) {
		HttpSession session = event.getSession();
		sessions.put(session.getId(), session);
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent event) {
		sessions.remove(event.getSession().getId());
	}
	
	public static Map<String, HttpSession> getConnectionSession() {
		return sessions;
	}
}
