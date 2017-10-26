package net.smart.common.support.analyzer;
/**
 * 
 * net.smart.common.support.analyzer.DataAnalyzer.java
 * <pre>
 * Object를 json or xml 로 변환하거나 json or xml을 Object로 변환하는 데이터 분석기 인터페이스 
 * </pre> 
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public interface DataAnalyzer {
	
	public Object serialize(String data, Class<?> c);
	
	public String deserialize(String key, Object obj);

}
