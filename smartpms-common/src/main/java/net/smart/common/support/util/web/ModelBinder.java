package net.smart.common.support.util.web;

import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.smart.common.support.util.web.PartnerAnnotationMethodHandlerAdaptor.ServletHandlerMethodInvoker;
import net.smart.common.support.util.web.PartnerAnnotationMethodHandlerAdaptor.ServletHandlerMethodResolver;
/**
 * 
 * net.smart.common.support.util.web.ModelBinder.java
 * <pre>
 *  AsynAnnotationHandler bind parameter helper
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public interface ModelBinder {
    
    /**
     * 
     * Description  :annotation 에 묶인 parameter object bind
     * @Method Name : bind
     * @param methodResolver
     * @param methodInvoker
     * @param handlerMethod
     * @param request
     * @param response
     * @return
     */
    Object bind(ServletHandlerMethodResolver methodResolver,ServletHandlerMethodInvoker methodInvoker,
            Method handlerMethod,HttpServletRequest request,HttpServletResponse response);

}
