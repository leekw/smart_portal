package net.smart.web.resource.service;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.smart.common.domain.UploadFile;
import net.smart.common.exception.IntegrationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("fileDownloadService")
public class FileDownloadServiceImpl implements FileDownloadService {
	
	@Autowired
	private ResourceService resourceService;

	@Override
	public Map<String, Object> getFileDownload(HttpServletRequest request) {
		String path = request.getParameter("filePath");
		String fileName = request.getParameter("fileName");
		String temp = request.getParameter("fileNo");
		if (temp != null && !"".equals(temp)) {
			UploadFile param = new UploadFile();
			param.setFileNo(Integer.parseInt(temp));
			List<UploadFile> temps = resourceService.getUploadFileList(param);
			if (temps != null && !temps.isEmpty()) {
				fileName = temps.get(0).getFileName();
			}
		}
		if (path == null) {
			throw new IntegrationException("ERROR.0001", "대상 파일이 존재하지 않습니다.");
		}
		File file = new File(path);
		if (!file.exists()) throw new IntegrationException("ERROR.0001", "대상 파일이 존재하지 않습니다.");

		Map<String, Object> data = new HashMap<String, Object>();
		data.put("downloadFile", file);
		data.put("fileName", fileName);
		
		return data;
	}

}
