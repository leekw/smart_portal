package net.smart.common.support.util.web;

import java.lang.annotation.Annotation;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.smart.common.annotation.IntegrationSession;
import net.smart.common.support.util.web.PartnerAnnotationMethodHandlerAdaptor.ServletHandlerMethodInvoker;
import net.smart.common.support.util.web.PartnerAnnotationMethodHandlerAdaptor.ServletHandlerMethodResolver;

import org.springframework.stereotype.Component;

/**
 * 
 * net.smart.common.support.util.web.SessionModelBinder.java
 * <pre>
 *  session modelBinder
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
@Component
public class SessionModelBinder extends AbstractModelBinder {

    @Override
    protected Object bindModel(ServletHandlerMethodResolver methodResolver,ServletHandlerMethodInvoker methodInvoker, Annotation annotation,
            Class<?> parameterType, Class<?> genericType, HttpServletRequest request, HttpServletResponse response) {
        
        IntegrationSession an = (IntegrationSession)annotation;
        return request.getSession(an.isNewIfAbsent());
        
    }

    @Override
    protected boolean isSupport(Annotation annotation) {
        return (annotation instanceof IntegrationSession);
    }

}
