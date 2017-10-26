package net.smart.common.support.util.web.filter;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import net.smart.common.exception.IntegrationException;
import net.smart.common.support.constant.BizCode;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * net.smart.common.support.util.web.filter.ParameterFilter.java
 * <pre>
 *  Integration web module servletFilter
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public class ParameterFilter implements Filter {
	
	private static  Logger logger = LoggerFactory.getLogger(ParameterFilter.class);
    
    @Override
    public void destroy() {}
    

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain) throws IOException, ServletException {
        this.setRequestParameter((HttpServletRequest)request);
        chain.doFilter((HttpServletRequest)request, response);
    }
    
    private void setRequestParameter(ServletRequest request) throws IntegrationException {
        
        if(request.getParameter(BizCode.RequestKey.PARAMS.getValue()) != null && !request.getParameter(BizCode.RequestKey.PARAMS.getValue()).isEmpty()) {
            request.setAttribute(BizCode.RequestKey.PARAMS.getValue(), request.getParameter(BizCode.RequestKey.PARAMS.getValue()));
        } else {
           
            String read = null;
            StringBuffer sb = new StringBuffer();
            InputStreamReader isr = null;
            BufferedReader buffer = null;
            try {
            	if (request.getContentType() == null || request.getContentType().toLowerCase().indexOf("multipart/form-data") == -1) {
	                isr = new InputStreamReader(request.getInputStream(), BizCode.RequestKey.ENCODING_TYPE_OF_UTF8.getValue());
	                buffer = new BufferedReader(isr);
	                while ((read = buffer.readLine()) != null) {
	                    sb.append(read);
	                }
            	}
            	request.setAttribute(BizCode.RequestKey.PARAMS.getValue(), sb.toString());
            } catch (IOException e) {
                throw new IntegrationException(e);
            }finally{
                try {
                    if(isr != null) isr.close();
                    if(buffer != null) buffer.close();
                } catch (IOException e) {
                    logger.debug(e.getMessage());
                }
            }
        }
        
        //request.setAttribute("securityYN", request.getParameter("securityYN") != null ? request.getParameter("securityYN") : Constant.RequestKey.SECURITY_PARAMS_DETAIL);
    }


    @Override
    public void init(FilterConfig arg0) throws ServletException {
        // TODO Auto-generated method stub

    }
   
}
