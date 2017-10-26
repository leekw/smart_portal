package net.smart.common.support.analyzer.converter;

import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.thoughtworks.xstream.converters.Converter;
import com.thoughtworks.xstream.converters.MarshallingContext;
import com.thoughtworks.xstream.converters.UnmarshallingContext;
import com.thoughtworks.xstream.converters.collections.AbstractCollectionConverter;
import com.thoughtworks.xstream.io.HierarchicalStreamReader;
import com.thoughtworks.xstream.io.HierarchicalStreamWriter;
import com.thoughtworks.xstream.mapper.Mapper;

/**
 * 
 * net.smart.common.support.analyzer.converter.MapConverter.java
 * <pre>
 *  xml 파싱, 생성 시 Map Object Converter class
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public class MapConverter extends AbstractCollectionConverter implements Converter {
	public MapConverter(Mapper mapper) {
		super(mapper);
	}

	@SuppressWarnings("rawtypes")
	public boolean canConvert(Class type) {
		return type.equals(java.util.HashMap.class)
				|| type.equals(java.util.Hashtable.class)
				|| (type.getName().equals("java.util.LinkedHashMap") || type
						.getName().equals("sun.font.AttributeMap"));
	}

	@SuppressWarnings("rawtypes")
	public void marshal(Object value, HierarchicalStreamWriter writer,
			MarshallingContext context) {
		AbstractMap map = (AbstractMap) value;
		for (Object obj : map.entrySet()) {
			Entry ety = (Entry) obj;
			writer.startNode(ety.getKey().toString());
			writer.setValue(ety.getValue().toString());
			writer.endNode();
		}

	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Object unmarshal(HierarchicalStreamReader reader,
			UnmarshallingContext arg1) {
		Map elements = new HashMap();
		int index = 0;
		for (; reader.hasMoreChildren(); reader.moveUp()) {
			reader.moveDown();
			if (reader.hasMoreChildren() == true) {
				elements.put(reader.getNodeName().equals("data") ? reader.getNodeName() + "_" + (index++) : reader.getNodeName(), unmarshal(reader, arg1));

			} else {

				String tempValue = reader.getValue();
				String tempKey = reader.getNodeName();

				if (tempValue != null) {
					tempValue = tempValue.trim().replaceAll("\n", "");
				}
				
				Object gettingValue = elements.get(tempKey);
				if (gettingValue != null) {

					
					// 중복된 요소의 List 처리
					if (gettingValue instanceof List) {
						((List) gettingValue).add(tempValue);
						elements.put(tempKey, gettingValue);
					} else if (gettingValue instanceof String) {
						List tempList = new ArrayList();
						tempList.add(gettingValue);
						tempList.add(tempValue);
						elements.put(tempKey, tempList);
					}

				} else {
					elements.put(reader.getNodeName(), tempValue);
				}

			}
		}
		return elements;
	}
}
