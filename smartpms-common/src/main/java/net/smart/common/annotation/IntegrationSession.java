package net.smart.common.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * 
 * net.smart.common.annotation.IntegrationSession.java
 * <pre>
 *  web에서 bind될 session annotation
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
@Retention(RetentionPolicy.RUNTIME)
public @interface IntegrationSession {
    boolean isNewIfAbsent() default false;
}
