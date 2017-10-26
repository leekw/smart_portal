package net.smart.common.support.analyzer;

import java.lang.reflect.Field;

import net.smart.common.support.analyzer.converter.NullConverter;

import org.springframework.stereotype.Component;

import com.thoughtworks.xstream.XStream;

/**
 * 
 * net.smart.common.support.analyzer.XMLAnalyzer.java
 * <pre>
 * Object를 xml로 변환하거나 xml을 Object로 변환하는 XML 데이터 분석기 클래스(계츨구조의 xml 생성, 파싱) 
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
@Component("xmlAnalyzer")
public class XMLAnalyzer implements DataAnalyzer {

	public Object serialize(String data, Class<?> c) {
		XStream xStream = new XStream();
		xStream.autodetectAnnotations(true);
		setAlias(c, xStream);
		xStream.fromXML(data);
		return xStream.fromXML(data);
	}

	public String deserialize(String key, Object obj) {
		XStream xStream = new XStream();
		xStream.registerConverter(new NullConverter(xStream.getMapper()), XStream.PRIORITY_LOW);
		xStream.autodetectAnnotations(true);
		setAlias(obj.getClass(), xStream);
		return xStream.toXML(obj);
	}

	
	private void setAlias(Class<?> clazz, XStream xStreams) {
		Field[] fields = clazz.getDeclaredFields();
		for (Field field : fields) {
			xStreams.alias(field.getName(), field.getClass());
			setAlias(field.getType(), xStreams);
		}
	}

}
