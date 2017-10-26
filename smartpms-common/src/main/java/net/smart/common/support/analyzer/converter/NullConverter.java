package net.smart.common.support.analyzer.converter;


import java.lang.reflect.Field;

import net.smart.common.exception.IntegrationException;

import com.thoughtworks.xstream.converters.Converter;
import com.thoughtworks.xstream.converters.MarshallingContext;
import com.thoughtworks.xstream.converters.UnmarshallingContext;
import com.thoughtworks.xstream.io.ExtendedHierarchicalStreamWriterHelper;
import com.thoughtworks.xstream.io.HierarchicalStreamReader;
import com.thoughtworks.xstream.io.HierarchicalStreamWriter;
import com.thoughtworks.xstream.mapper.Mapper;
/**
 * 
 * net.smart.common.support.analyzer.converter.NullConverter.java
 * <pre>
 * xml 파싱, 생성 시 Null값에 대한 처리 Converter class
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public class NullConverter implements Converter {

	private Mapper mapper;

	public NullConverter(Mapper mapper) {
		this.mapper = mapper;
	}

	public boolean canConvert(Class type) {
		return false;
	}

	public void marshal(Object source, HierarchicalStreamWriter writer,	MarshallingContext context) {
		Field[] fieldSet = source.getClass().getDeclaredFields();
		for (Field field : fieldSet) {
			Object member;
			if (!mapper.shouldSerializeMember(source.getClass(),
					field.getName())) {
				continue;
			}
			field.setAccessible(true);
			try {
				member = field.get(source);
				String name = mapper.serializedMember(field.getDeclaringClass(), field.getName());

				if (member == null) {
					writer.startNode(name);
					writer.endNode();
				} else {
					ExtendedHierarchicalStreamWriterHelper.startNode(writer, name, member.getClass());
					context.convertAnother(member);
					writer.endNode();
				}
			} catch (IllegalArgumentException e) {
				throw new IntegrationException("");
			} catch (IllegalAccessException e) {
				throw new IntegrationException("");
			}
		}
	}

	public Object unmarshal(HierarchicalStreamReader reader, UnmarshallingContext context) {
		return null;
	}

}
