package net.smart.web.resource.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface FileDownloadService {
	
	public Map<String, Object> getFileDownload(HttpServletRequest request);
	
}
