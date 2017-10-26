package net.smart.web.support.authentication.exception;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.smart.common.domain.IntError;
import net.smart.common.support.analyzer.DataAnalyzer;
import net.smart.common.support.analyzer.factory.DataAnalyzerFactory;
import net.smart.common.support.constant.BizCode;
import net.smart.common.support.message.smartMessageSource;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.springframework.stereotype.Component;

@Component("integrationExceptionHandler")
public class IntegrationExceptionHandler {
	
	private DataAnalyzerFactory analyzerFactory;
	
	public void logException(HttpServletRequest request, HttpServletResponse response, Throwable exception)  throws IOException, ServletException {
		//Error Logging
		List exList = ExceptionUtils.getThrowableList(exception);
		StringBuffer sub = new StringBuffer();
		int idx = 0;
		for( Object thrObj :  exList ){
			Throwable thr = (Throwable)thrObj;
			sub.append("Cause Index : "+idx+ "\n" );
			sub.append(ExceptionUtils.getStackTrace(thr).replace(System.getProperty("line.separator"), "\n"));
		}
	}
	
	
	private String getContentType(String metadataType) {
		String result = null;
		if (BizCode.Data.JSON.isMatch(metadataType)) result = BizCode.RequestKey.CONTENT_TYPE_JSON.getValue(); 
		else if (BizCode.Data.XML.isMatch(metadataType)) result = BizCode.RequestKey.CONTENT_TYPE_XML.getValue();
		else result = BizCode.RequestKey.CONTENT_TYPE_HTML.getValue();
		return result;
	}
	
	public void writeExceptionMessage(HttpServletRequest request, HttpServletResponse response, Throwable exception,
			String errorCode, String metadataType)  throws IOException, ServletException {
		analyzerFactory = new DataAnalyzerFactory();
		//Error Message Output
		String message  = errorCode != null && "NOTAUTH".equals(errorCode) ? "해당 서비스에 접근할 수 있는 권한이 없습니다." : smartMessageSource.getMessage(errorCode);
		DataAnalyzer converter = analyzerFactory.getDataAnalyzer(metadataType);
        IntError error = new IntError(errorCode, message);
        String result = converter.deserialize("error", error);
        
        OutputStream outputStream = null;
		Writer printWriter = null;
		response.setCharacterEncoding(BizCode.RequestKey.ENCODING_TYPE_OF_UTF8.getValue());
		response.setContentType( getContentType(metadataType) );
        
        try {
			outputStream = response.getOutputStream();
	        printWriter = new PrintWriter(new OutputStreamWriter(outputStream, "UTF8"));
	        printWriter.write(result);
	        printWriter.flush();
		} catch(IOException ex) {
			throw ex;
		} finally {
			if(printWriter != null ){printWriter.close();}
			if(outputStream != null){outputStream.close();}
		}
	}

}
