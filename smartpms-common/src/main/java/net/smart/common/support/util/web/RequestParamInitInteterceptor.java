package net.smart.common.support.util.web;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.smart.common.exception.IntegrationException;
import net.smart.common.support.constant.BizCode;
import net.smart.common.support.security.StringEncrypter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * 
 * net.smart.common.support.util.web.RequestParamInitInteterceptor.java
 * <pre>
 *  request post data를 request attribute에 setting 해주는 handlerInterceptor
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public class RequestParamInitInteterceptor extends HandlerInterceptorAdapter {
    
    @Autowired
    private StringEncrypter encrypter;
    
    private enum Code {
        ERROR_MESSAGE("No InputStream specified");
        private String value;
        private Code(String value) { this.value = value;}
        private String getValue () { return this.value;}
    }
    
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object obj) {
        
        this.setRequestParameter(request);
        return true;
    }
    
    private void setRequestParameter(HttpServletRequest request) {
        String read = null;
        StringBuffer sb = null;
        InputStreamReader isr = null;
        BufferedReader buffer = null;
        
        try {

            sb = new StringBuffer();
            isr = new InputStreamReader(request.getInputStream(), BizCode.RequestKey.ENCODING_TYPE_OF_UTF8.getValue());
            buffer = new BufferedReader(isr);
            
            while ((read = buffer.readLine()) != null) {
                sb.append(read);
            }
            
            String isCurityYn = request.getParameter(BizCode.RequestKey.SERCURITY_KEY.getValue()) != null 
            		? BizCode.RequestKey.BOOLEAN_Y_STRING.getValue() : BizCode.RequestKey.BOOLEAN_N_STRING.getValue();
            request.setAttribute(BizCode.RequestKey.SERCURITY_KEY.getValue(), isCurityYn);
            request.setAttribute(BizCode.RequestKey.PARAM_KEY.getValue(), BizCode.RequestKey.BOOLEAN_Y_STRING.isMatch(isCurityYn) ? this.getEncryptString(sb.toString()) : sb.toString());
            
            Assert.notNull(isr, Code.ERROR_MESSAGE.getValue());
            Assert.notNull(buffer, Code.ERROR_MESSAGE.getValue());
            
        } catch (IOException e) {
            throw new IntegrationException(e);
        }finally{
            try {
                if(isr != null) isr.close();
                if(buffer != null) buffer.close();
            } catch (IOException e) {
                throw new IntegrationException(e);
            }
        }
    }
    
    private String getEncryptString(String dataString) {
        String result = null;
        if(dataString == null || BizCode.System.EMPTY_STRING.isMatch(dataString))
        	result = dataString;
        else {
            try {
            	result = encrypter.decrypt(dataString);
            } catch (Exception e) {
                throw new IntegrationException(e);
            }
        }
        return result;
    }

}
