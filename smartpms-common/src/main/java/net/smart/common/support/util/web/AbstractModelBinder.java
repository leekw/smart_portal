package net.smart.common.support.util.web;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.smart.common.support.util.web.PartnerAnnotationMethodHandlerAdaptor.ServletHandlerMethodInvoker;
import net.smart.common.support.util.web.PartnerAnnotationMethodHandlerAdaptor.ServletHandlerMethodResolver;

/**
 * 
 * net.smart.common.support.util.web.AbstractModelBinder.java
 * <pre>
 * AsynAnnotationHandler modelBinder
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public abstract class AbstractModelBinder implements ModelBinder {
    
    /**
     * bind 이후 처리 hook method
     * @param methodResolver
     * @param methodInvoker
     * @param handlerMethod
     * @param request
     * @param response
     */
    protected void setAfterBind(ServletHandlerMethodResolver methodResolver,ServletHandlerMethodInvoker methodInvoker,Method handlerMethod,
            HttpServletRequest request,HttpServletResponse response){
        handlerMethod.toString();
    }
    
    @Override
    public Object bind(ServletHandlerMethodResolver methodResolver,ServletHandlerMethodInvoker methodInvoker,Method handlerMethod,
            HttpServletRequest request,HttpServletResponse response) {
        
        Annotation[][] ans = handlerMethod.getParameterAnnotations();
        
        int i = -1;
        Object obj = null;
        for(Annotation[] anArray : ans) {
            i++;
            if(anArray.length == 0 ) continue;
            if(!isSupport(anArray[0])) continue;
            
            ;
            Class<?> clazz = handlerMethod.getParameterTypes()[i];
            Class<?> genericType = null;
            Type type = null;
            if (List.class.isAssignableFrom(clazz)) {
            	type = handlerMethod.getGenericParameterTypes()[i];
            	if (type instanceof ParameterizedType) {
					ParameterizedType ptype = (ParameterizedType) type;
					genericType = (Class<?>) ptype.getActualTypeArguments()[0];
            	}
            }
            
			obj = bindModel(methodResolver, methodInvoker, anArray[0], clazz, genericType, request, response);
			setAfterBind(methodResolver, methodInvoker, handlerMethod, request, response);
            
            break;
        }
        
        return obj;
    }

    
    protected abstract Object bindModel(ServletHandlerMethodResolver methodResolver,ServletHandlerMethodInvoker methodInvoker,
            Annotation annotation,Class<?> parameterType, Class<?> genericType,HttpServletRequest request,HttpServletResponse response );
    
    protected abstract boolean isSupport(Annotation annotation);

}
