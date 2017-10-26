package net.smart.common.support.util.web.view;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.smart.common.support.analyzer.DataAnalyzer;
import net.smart.common.support.analyzer.factory.DataAnalyzerFactory;
import net.smart.common.support.constant.BizCode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.view.AbstractView;

/**
 * 
 * net.smart.common.support.util.web.view.ExtendedMetadataView.java
 * <pre>
 * BeanNameViewResolver 중 하나로 json 및 xml 형태의 데이터 포맷으로 변환하는 view 클래스
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public class ExtendedMetadataView extends AbstractView {
	
	@Autowired
	private DataAnalyzerFactory dataAnalyzerFactory;
		
	public ExtendedMetadataView() {
		super();
	}
	
	private String getContentType(String metadataType) {
		String result = null;
		if (BizCode.Data.JSON.isMatch(metadataType)) result = BizCode.RequestKey.CONTENT_TYPE_JSON.getValue(); 
		else if (BizCode.Data.XML.isMatch(metadataType)) result = BizCode.RequestKey.CONTENT_TYPE_XML.getValue();
		else result = BizCode.RequestKey.CONTENT_TYPE_HTML.getValue();
		return result;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	protected void renderMergedOutputModel( Map<String, Object> model, HttpServletRequest request,HttpServletResponse response ) throws Exception {
		String metadataType = (String) model.get("metadataType");
		DataAnalyzer ananlyzer = dataAnalyzerFactory.getDataAnalyzer(metadataType);
		StringBuffer sb = new StringBuffer();
		OutputStream outputStream = null;
		Writer printWriter = null;
		response.setCharacterEncoding(BizCode.RequestKey.ENCODING_TYPE_OF_UTF8.getValue());
		response.setContentType( getContentType(metadataType) );
		Map<String, Object> data = (Map<String, Object>) model.get("data");
		if(data != null){
			Iterator<Map.Entry<String, Object>> ie = data.entrySet().iterator();
			if (data.size() > 1)
				sb.append("{\"data\":");
			int index = 0;
			boolean isMulti = data.size()>1?true:false;
			int endIdx = data.size();
			while(ie.hasNext()) {
				Map.Entry<String, Object> entry = ie.next();
				String jsonStr = ananlyzer.deserialize(entry.getKey(), entry.getValue());
				
				if(isMulti && index != endIdx) {
					if(index != 0)
						jsonStr = jsonStr.substring(1);
					
					if(index < endIdx-1)
						jsonStr = jsonStr.substring(0,jsonStr.length()-1);
				}
				
				sb.append(jsonStr);
				
				if ( index < (data.size()-1))
					sb.append(",");
				
				index++;
			}
			if (data.size() > 1)
				sb.append("}");
		} else {
			sb.append("{}");
		}
		try {
			outputStream = response.getOutputStream();
	        printWriter = new PrintWriter(new OutputStreamWriter(outputStream, "UTF8"));
	        printWriter.write(sb.toString());
	        printWriter.flush();
		} catch(IOException ex) {
			throw ex;
		} finally {
			if(printWriter != null ){printWriter.close();}
			if(outputStream != null){outputStream.close();}
		}
	}

}
