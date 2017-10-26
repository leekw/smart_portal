package net.smart.common.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
/**
 * 
 * net.smart.common.annotation.IntegrationRequest.java
 * <pre>
 * HttpRequest 시 RequestBody에 있는 데이터를 Object로 바인딩 하기 위한 식별 Annotation
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
@Retention(RetentionPolicy.RUNTIME)
public @interface IntegrationRequest {
    String key() default "params";
    boolean required() default true;
}