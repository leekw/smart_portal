package net.smart.common.support.util.web;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.smart.common.domain.UploadFile;
import net.smart.common.exception.IntegrationException;
import net.smart.common.support.constant.BizCode;
import net.smart.common.support.security.StringEncrypter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.servlet.ModelAndView;

/**
 * 
 * net.smart.common.support.util.web.AsynAnnotationHandlerAdapter.java
 * <pre>
 * Asynch 방식의 request 전용 handlerAdapor 
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public class AsynAnnotationHandlerAdapter extends PartnerAnnotationMethodHandlerAdaptor {
    
    private enum Code {
        METADATAVIEW("metadataView"),METADATATYPE("metadataType");
        private String value;
        private Code(String value) { this.value = value;}
        private String getValue () { return this.value;}
    }
    
    @Autowired
    private List<ModelBinder> modelBinderList;
    
    @Autowired @Qualifier("stringEncrypter") 
    private StringEncrypter stringEncrypter;
    
    @Autowired
    private List<HandlerPostProcessor> handlerPostProcessors;
    
    private boolean isSupport(Method handlerMethod,Object handler,HttpServletRequest request) {
        
        int idx = request.getRequestURI().lastIndexOf('.');
        String extract = request.getRequestURI().substring(idx+1);
        
        boolean isSupport = (super.supports(handler) && 
                (BizCode.RequestKey.CONTENT_TYPE_JSON.isMatch(request.getContentType()) || 
                		BizCode.RequestKey.CONTENT_TYPE_XML.isMatch(request.getContentType()) ) );
        
        request.setAttribute(BizCode.RequestKey.META_DATA_TYPE.getValue(), extract);
        return (isSupport || (BizCode.Data.JSON.isMatch(extract) || BizCode.Data.XML.isMatch(extract))  );
    }
    
    @SuppressWarnings({ "unchecked", "rawtypes" })
    @Override
    public ModelAndView handle(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception {
        
        this.decryptParam(request);
        //S:find method
        ServletHandlerMethodResolver methodResolver = super.getMethodResolver(handler);
        Method handlerMethod = methodResolver.resolveHandlerMethod(request);
        //E:find method
        
        //methodResolver.
        ModelAndView modelAndView = null;
        if(!this.isSupport(handlerMethod,handler,request)) 
        {
            modelAndView = super.handle(request, response, handler);
            if (request.getContentType() != null && request.getContentType().toLowerCase().indexOf("multipart/form-data") != -1) {
            	modelAndView.setViewName(Code.METADATAVIEW.getValue());
                modelAndView.addObject(Code.METADATATYPE.getValue(), BizCode.Data.JSON.getValue());
            }
        } 
        else 
        {
            //S:bind method Parameters
            List valueList = new ArrayList();
            ServletHandlerMethodInvoker methodInvoker = super.getServlethandlerMethodInvoker(methodResolver);
            
            for(ModelBinder modelBinder : modelBinderList) {
                Object obj = modelBinder.bind(methodResolver, methodInvoker, handlerMethod, request, response);
                if(obj != null)
                    valueList.add(obj);
            }
            //E:bind method Parameters
            
            //S:HttpServletRequest,response bind
            Class[] clazzs = handlerMethod.getParameterTypes();
            for(Class cl : clazzs) {
                if( cl.equals(HttpServletRequest.class))
                    valueList.add(request);
                if( cl.equals(HttpServletResponse.class))
                    valueList.add(response);
                if( cl.equals(ModelAndView.class)) {
                	modelAndView = new ModelAndView();
                	valueList.add(modelAndView);
                }
            }
            //E:HttpServletRequest,response bind
            
            Object returnValue = ReflectionUtils.invokeJdbcMethod(handlerMethod, handler, valueList.toArray());
            for(HandlerPostProcessor sBean :handlerPostProcessors )
            {
            	if(!sBean.isSupply(returnValue, handlerMethod, handlerMethod,modelAndView)) continue;
            	modelAndView = sBean.process(returnValue, handlerMethod, handlerMethod,modelAndView);
            	break;
            }
            
            String metaData = (String)request.getAttribute(BizCode.RequestKey.META_DATA_TYPE.getValue());
            if(metaData != null && (BizCode.Data.JSON.isMatch(metaData) || BizCode.Data.XML.isMatch(metaData)) ) {
                modelAndView.setViewName(Code.METADATAVIEW.getValue());
                modelAndView.addObject(Code.METADATATYPE.getValue(), metaData);
            }
        }
        
        return modelAndView;
    }
    
    private void decryptParam(HttpServletRequest request) {
        
        if(request.getContentType() != null && BizCode.RequestKey.CONTENT_TYPE_TEXT_PLAIN.isMatch(request.getContentType().toLowerCase())) {
            
            String paramValue = (String)request.getAttribute(BizCode.RequestKey.PARAMS.getValue());
            try {
                request.setAttribute(BizCode.RequestKey.PARAMS.getValue(), stringEncrypter.decrypt(paramValue));
            } catch (Exception e) {
                throw new IntegrationException(e);
            }
        }
    }

}
