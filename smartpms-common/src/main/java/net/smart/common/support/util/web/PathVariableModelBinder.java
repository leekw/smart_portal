package net.smart.common.support.util.web;

import java.lang.annotation.Annotation;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.smart.common.exception.IntegrationException;
import net.smart.common.support.util.web.PartnerAnnotationMethodHandlerAdaptor.ServletHandlerMethodInvoker;
import net.smart.common.support.util.web.PartnerAnnotationMethodHandlerAdaptor.ServletHandlerMethodResolver;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.context.request.ServletWebRequest;


/**
 * 
 * net.smart.common.support.util.web.PathVariableModelBinder.java
 * <pre>
 *  AsynRequestMappingHandlerAdapter PathVariable modelBinder
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
@Component
public class PathVariableModelBinder extends AbstractModelBinder {
    
    @Override
    protected Object bindModel(ServletHandlerMethodResolver methodResolver,ServletHandlerMethodInvoker methodInvoker,
            Annotation annotation,Class<?> parameterType, Class<?> genericType, HttpServletRequest request,HttpServletResponse response) {
        
        ServletWebRequest webRequest = new ServletWebRequest(request, response);
        
        PathVariable an = (PathVariable)annotation;
        Object obj = null;
        
        try {
            obj = methodInvoker.resolvePathVariable(an.value(),java.lang.String.class,webRequest);
        }
        catch(Exception e) {
            throw new IntegrationException(e);
        }
        
        return obj;
    }

    @Override
    protected boolean isSupport(Annotation annotation) {
        return (annotation instanceof PathVariable);
    }


}
