package net.smart.common.domain.based;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import net.smart.common.domain.Common;

public class BasedFileInfo extends Common {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 274839226187165032L;
	private List<MultipartFile> fileupload;

	public List<MultipartFile> getFileupload() {
		return fileupload;
	}

	public void setFileupload(List<MultipartFile> fileupload) {
		this.fileupload = fileupload;
	}

}
