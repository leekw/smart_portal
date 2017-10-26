package net.smart.common.support.util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.smart.common.exception.IntegrationException;
import net.smart.common.support.constant.BizCode;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.servlet.view.AbstractView;

public class FileDownloadView extends AbstractView {

	public enum PrivateConstant {
		data("data")
		, downloadFile("downloadFile")
		, metadataType("metadataType")
		, isDelete("isDelete")
		, Content_Disposition("Content-Disposition")
		, Content_Transfer_Encoding("Content-Transfer-Encoding")
		, binary("binary")
		
		;
		private String value;
		private PrivateConstant(String value) {
			this.value = value;
		}
		public String getValue() {
			return value;
		}
		public boolean isMatch(String compare) {
			return value.equals(compare);
		}
	}
	
	public FileDownloadView() {
		super();
	}
	
	private String getContentType(String metadataType) {
		String result = null;
		if (BizCode.Data.FILE.isMatch(metadataType)) result = BizCode.RequestKey.CONTENT_TYPE_FILE.getValue();
		return result;
	}
	
	@SuppressWarnings("unchecked")	
	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> data = (Map<String, Object>) model.get(PrivateConstant.data.getValue());
		OutputStream out = response.getOutputStream();
		BufferedInputStream bis = null;
		File file =(File) data.get(PrivateConstant.downloadFile.getValue());
		String fileName = (String) data.get("fileName");
				
		response.setCharacterEncoding(BizCode.RequestKey.ENCODING_TYPE_OF_UTF8.getValue());		
		response.setContentType(getContentType((String) data.get(PrivateConstant.metadataType.getValue())));
		response.setContentLength((int) file.length());
		response.setHeader(PrivateConstant.Content_Disposition.getValue(), "attachment;filename="+URLEncoder.encode(fileName  , BizCode.RequestKey.ENCODING_TYPE_OF_UTF8.getValue()).replace("+","%20"));
		response.setHeader(PrivateConstant.Content_Transfer_Encoding.getValue(),PrivateConstant.binary.getValue());
		
		try {
			bis = new BufferedInputStream(new FileInputStream(file));
			FileCopyUtils.copy(bis, out);
			out.flush();			
		} catch (Exception e) {
			throw new IntegrationException("ERROR.0001", "파일다운로드 시 오류가 발생되었습니다.");
		} finally {
			try {
				if (bis != null) {
					bis.close();
				}
				if (out != null) {
					out.close();
				}
			} catch (IOException ex) {
				throw new IntegrationException("ERROR.0001");
			}
		}
	}

}
