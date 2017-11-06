package net.smart.web.resource.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.annotation.IntegrationResponse;
import net.smart.common.domain.UploadFile;
import net.smart.common.exception.BizException;
import net.smart.common.support.constant.BizCode;
import net.smart.common.support.util.FileUtil;
import net.smart.web.domain.FileInfo;
import net.smart.web.resource.service.FileDownloadService;
import net.smart.web.resource.service.ResourceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class FileController {
	
	//private static final String FILE_CONTEXT_PATH = "/home/qaapp/data";
	private static final String FILE_CONTEXT_PATH = "C:/BSS";
	private static final String EXCEL_CONTEXT_PATH = "C:/BSS/temp";
	
	@Autowired
	private ResourceService resourceService;
	
	@Autowired
	@Qualifier("fileDownloadService")
	private FileDownloadService fileDownloadService;
	
	@RequestMapping(value = "/file/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="files")
	public List<UploadFile> getUploadFileList(@IntegrationRequest UploadFile param) {
		if (param.getResourceId() != null && !"".equals(param.getResourceId())) {
			param.setBoardId(param.getResourceId().toUpperCase().hashCode());
			param.setBoardNo(param.getResourceId().toUpperCase().hashCode());
		}
		return resourceService.getUploadFileList(param);
	}
	
	@RequestMapping(value = "/file/add.{metadataType}", method = RequestMethod.POST)
	public void addUploadFile(@IntegrationRequest List<UploadFile> params) {
		List<UploadFile> files = new ArrayList<UploadFile>();
		for (UploadFile file : params) {
			if ("I".equals(file.getDataMode())) {
				if (file.getResourceId() != null && !"".equals(file.getResourceId())) {
					file.setBoardId(file.getResourceId().hashCode());
					file.setBoardNo(file.getResourceId().hashCode());
				}
				files.add(file);
			}
		}
		resourceService.addUploadFile(files);
	}
	
	@RequestMapping(value = "/file/download.{metadataType}", method = RequestMethod.GET)
	public ModelAndView fileDownload(@PathVariable("metadataType") String metadataType,
			HttpServletRequest request, HttpServletResponse response, ModelAndView modelAndView) {
		modelAndView.setViewName("fileDownload");
		Map<String, Object> data = fileDownloadService.getFileDownload(request);
		data.put("metadataType", metadataType);
		modelAndView.addObject(BizCode.RequestKey.PARAM_KEY.getValue(), data);
		return modelAndView;
	}
	
	@RequestMapping(value = "/excel/upload.file", method = RequestMethod.POST)
	public ModelAndView excelupload(MultipartFile file, HttpServletRequest request, HttpServletResponse response, ModelAndView modelAndView) throws IOException {
		String filePath =  FileUtil.saveFile(file, EXCEL_CONTEXT_PATH);
	
		
		Map<String,Object> userDataMap = new HashMap<String,Object>();
		userDataMap.put("success", true);
		userDataMap.put("filePath", filePath);
		modelAndView.addObject(BizCode.RequestKey.PARAM_KEY.getValue(),userDataMap);
		return modelAndView;
	}
	

	@RequestMapping(value = "/file/upload.file", method = RequestMethod.POST)
	public ModelAndView fileupload(FileInfo fileInfo, HttpServletRequest request, HttpServletResponse response, ModelAndView modelAndView) throws IOException {
		List<UploadFile> files = new ArrayList<UploadFile>();
		if (fileInfo.getFileupload() != null && !fileInfo.getFileupload().isEmpty()) {
			for (MultipartFile file : fileInfo.getFileupload()) {
				String filePath = FileUtil.saveFile(file, FILE_CONTEXT_PATH);
				if (filePath != null) {
					UploadFile uploadFile = new UploadFile();
					uploadFile.setFileNo(0);
					uploadFile.setFileName(file.getOriginalFilename());
					uploadFile.setFilePath(filePath);
					uploadFile.setFileSize((file.getSize() /1024) + "KB");
					uploadFile.setDataMode("I");
					files.add(uploadFile);
				}
				
			}
		}
		Map<String,Object> userDataMap = new HashMap<String,Object>();
		userDataMap.put("success", files);
		modelAndView.addObject(BizCode.RequestKey.PARAM_KEY.getValue(),userDataMap);
		return modelAndView;
	}

	@RequestMapping(value = "/file/remove.{metadataType}", method = RequestMethod.POST)
	public void removeFile(@IntegrationRequest UploadFile file) {
		File delFile = new File(file.getFilePath());
		if (!delFile.exists()) {
			throw new BizException("ERROR.0000", "지울 대상 파일이 없습니다.");
		}
		delFile.delete();
		if ("R".equals(file.getDataMode())) {
			resourceService.removeUploadFile(file);
		}
	}
}
