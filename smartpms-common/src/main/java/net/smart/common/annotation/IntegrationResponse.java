package net.smart.common.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 
 * net.smart.common.annotation.IntegrationResponse.java
 * <pre>
 * 
 * HttpRequest를 처리 한 후 비지니스 로직을 처리한 후 HttpResponse를 client에 보내줄 때 
 * Object를 data format(json, xml)으로 변환 하기 위한 Annotation
 * 
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface IntegrationResponse {
	

	String key();

}
