package net.smart.web.domain;

import java.util.List;

import net.smart.common.domain.Common;

import org.springframework.web.multipart.MultipartFile;

public class FileInfo extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7648495594944231417L;
	
	private List<MultipartFile> fileupload;

	public List<MultipartFile> getFileupload() {
		return fileupload;
	}

	public void setFileupload(List<MultipartFile> fileupload) {
		this.fileupload = fileupload;
	}
	


}
