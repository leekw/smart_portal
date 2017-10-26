package net.smart.common.support.util.web;

import java.lang.annotation.Annotation;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.exception.IntegrationException;
import net.smart.common.support.analyzer.DataAnalyzer;
import net.smart.common.support.analyzer.factory.DataAnalyzerFactory;
import net.smart.common.support.constant.BizCode;
import net.smart.common.support.util.web.PartnerAnnotationMethodHandlerAdaptor.ServletHandlerMethodInvoker;
import net.smart.common.support.util.web.PartnerAnnotationMethodHandlerAdaptor.ServletHandlerMethodResolver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 
 * net.smart.common.support.util.web.IntegrationRequestModelBinder.java
 * <pre>
 * Command model Binder
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
@Component
public class IntegrationRequestModelBinder extends AbstractModelBinder {

    @Autowired
    private DataAnalyzerFactory analyzerFactor;
    
    private enum Code {
        DISMATCHED("dismatched class type is ");
        private String value;
        private Code(String value) { this.value = value;}
        private String getValue () { return this.value;}
    }

    @Override
    protected Object bindModel(ServletHandlerMethodResolver methodResolver,ServletHandlerMethodInvoker methodInvoker, Annotation annotation,
            Class<?> parameterType, Class<?> genericType, HttpServletRequest request,HttpServletResponse response) {
    	
        
    	int idx = request.getRequestURI().lastIndexOf('.');
        String extract = request.getRequestURI().substring(idx+1);
    	
        String parserType = BizCode.RequestKey.CONTENT_TYPE_XML.isMatch(request.getContentType()) || BizCode.Data.XML.isMatch(extract)
                ? BizCode.Data.XML.getValue() : BizCode.Data.JSON.getValue() ;
        
        DataAnalyzer anaylzer = analyzerFactor.getDataAnalyzer(parserType);
        
        IntegrationRequest an = (IntegrationRequest)annotation;
        String key = an.key();
        boolean isRequired = an.required();
        String dataString = (String)request.getAttribute(key);
        dataString = this.afterProcessStringData(genericType, dataString);
        
        Object result = null;
        if(!isRequired  && (dataString == null || BizCode.System.EMPTY_STRING.isMatch(dataString)) ) {
            try {
                result = parameterType.newInstance();
            } catch (InstantiationException e) {
                new IntegrationException(Code.DISMATCHED.getValue() + parameterType);
            } catch (IllegalAccessException e) {
                new IntegrationException(Code.DISMATCHED.getValue() + parameterType);
            }
        }
        
        result = anaylzer.serialize(dataString, genericType == null ? parameterType : genericType);
        return result;
    }
    
    private String afterProcessStringData(Class<?> genericType,String paramData) {
        String data = paramData;
        boolean isValidateChar = data.startsWith("{");
        if(genericType != null && isValidateChar) {
            int idx = data.indexOf(": {");
            if(idx != -1) {
                data = data.substring(idx+1);
                data = "["+data.substring(0, data.length()-1)+"]";
            } else {
                data = "["+data+"]";
            }
        }
        
        return data;
    }

    @Override
    protected boolean isSupport(Annotation annotation) {
        return (annotation instanceof IntegrationRequest);
    }

}
