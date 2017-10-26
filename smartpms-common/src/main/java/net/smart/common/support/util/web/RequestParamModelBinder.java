package net.smart.common.support.util.web;

import java.lang.annotation.Annotation;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.smart.common.support.util.web.PartnerAnnotationMethodHandlerAdaptor.ServletHandlerMethodInvoker;
import net.smart.common.support.util.web.PartnerAnnotationMethodHandlerAdaptor.ServletHandlerMethodResolver;

import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * 
 * net.smart.common.support.util.web.RequestParamModelBinder.java
 * <pre>
 *   RequestParam ModelBinder
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
@Component
public class RequestParamModelBinder extends AbstractModelBinder {

    @Override
    protected Object bindModel(ServletHandlerMethodResolver methodResolver,ServletHandlerMethodInvoker methodInvoker, Annotation annotation,
            Class<?> parameterType, Class<?> genericType, HttpServletRequest request,HttpServletResponse response) {
        
        RequestParam an = (RequestParam)annotation;
        String key = an.value();
        Assert.notNull(key, "must be RequestParam annotation value property");
        
        return (request.getAttribute(key) != null ? (String)request.getAttribute(key) : request.getParameter(key) ); 
        
    }

    @Override
    protected boolean isSupport(Annotation annotation) {
        return (annotation instanceof RequestParam);
    }

}
