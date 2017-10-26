package net.smart.common.support.analyzer.factory;

import net.smart.common.support.analyzer.DataAnalyzer;
import net.smart.common.support.analyzer.JSONAnalyzer;
import net.smart.common.support.analyzer.XMLAnalyzer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
/**
 * 
 * net.smart.common.support.analyzer.factory.DataAnalyzerFactory.java
 * <pre>
 * 데이터 분석기 중 입력된 type에 의해 해당하는 타입의 클래스를 리턴하기 위한 Factory class
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
@Component("dataAnalyzerFactory")
public class DataAnalyzerFactory {
	
	private enum DataType {
		JSON("json"),
		XML("xml");
		private String value;
		private DataType(String value) {
			this.value = value;
		}
		public boolean isMatch(String compare) {
			return value.equals(compare);
		}
	}
	
	@Autowired
	@Qualifier("jsonAnalyzer")
	private DataAnalyzer jsonAnalyzer;
	
	@Autowired
	@Qualifier("xmlAnalyzer")
	private DataAnalyzer xmlAnalyzer;

	public DataAnalyzer getJsonAnalyzer() {
		DataAnalyzer result = null;
		if (jsonAnalyzer != null) {
			result = jsonAnalyzer;
		} else {
			result = new JSONAnalyzer();
		}
		return result;
	}
	
	public void setJsonAnalyzer(DataAnalyzer jsonAnalyzer) {
		this.jsonAnalyzer = jsonAnalyzer;
	}

	public DataAnalyzer getXmlAnalyzer() {
		DataAnalyzer result = null;
		if (xmlAnalyzer != null) {
			result = xmlAnalyzer;
		} else {
			result = new XMLAnalyzer();
		}
		return result;
	}

	public void setXmlAnalyzer(DataAnalyzer xmlAnalyzer) {
		this.xmlAnalyzer = xmlAnalyzer;
	}

	public DataAnalyzer getDataAnalyzer(String type) {
		DataAnalyzer result = null;
		if (DataType.JSON.isMatch(type)) {
			result = this.getJsonAnalyzer();
		} else if (DataType.XML.isMatch(type)) {
			result = this.getXmlAnalyzer();
		} else {
			result = null;
		}
		return result;
	}
}
