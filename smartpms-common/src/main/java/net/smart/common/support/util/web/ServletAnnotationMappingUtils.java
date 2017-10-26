package net.smart.common.support.util.web;

import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.util.WebUtils;

/**
 * 
 * net.smart.common.support.util.web.ServletAnnotationMappingUtils.java
 * <pre>
 *  비동기 Request/Response 처리 중심 구조로 확장위한 Utils class
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public class ServletAnnotationMappingUtils {
    
    /**
     * Check whether the given request matches the specified request methods.
     * @param methods the HTTP request methods to check against
     * @param request the current HTTP request to check
     */
    public static boolean checkRequestMethod(RequestMethod[] methods, HttpServletRequest request) {
    	boolean result = false;
        if (ObjectUtils.isEmpty(methods)) {
        	result = true;
        }
        for (RequestMethod method : methods) {
            if (method.name().equals(request.getMethod())) {
            	result = true;
            	break;
            }
        }
        return result;
    }

    /**
     * Check whether the given request matches the specified parameter conditions.
     * @param params  the parameter conditions, following
     *                {@link org.springframework.web.bind.annotation.RequestMapping#params() RequestMapping.#params()}
     * @param request the current HTTP request to check
     */
    public static boolean checkParameters(String[] params, HttpServletRequest request) {
    	boolean result = true;
        if (!ObjectUtils.isEmpty(params)) {
            for (String param : params) {
                int separator = param.indexOf('=');
                if (separator == -1) {
                    if (param.startsWith("!")) {
                        if (WebUtils.hasSubmitParameter(request, param.substring(1))) {
                        	result = false;
                        	break;
                        }
                    }
                    else if (!WebUtils.hasSubmitParameter(request, param)) {
                    	result = false;
                    	break;
                    }
                }
                else {
                    boolean negated = separator > 0 && param.charAt(separator - 1) == '!';
                    String key = !negated ? param.substring(0, separator) : param.substring(0, separator - 1);
                    String value = param.substring(separator + 1);
                    if (!value.equals(request.getParameter(key))) {
                        result = negated;
                    }
                }
            }
        }
        return result;
    }

    /**
     * Check whether the given request matches the specified header conditions.
     * @param headers the header conditions, following
     *                {@link org.springframework.web.bind.annotation.RequestMapping#headers() RequestMapping.headers()}
     * @param request the current HTTP request to check
     */
    public static boolean checkHeaders(String[] headers, HttpServletRequest request) {
    	boolean result = true;
        if (!ObjectUtils.isEmpty(headers)) {
            for (String header : headers) {
                int separator = header.indexOf('=');
                if (separator == -1) {
                    if (header.startsWith("!")) {
                        if (request.getHeader(header.substring(1)) != null) {
                        	result = false;
                        	break;
                        }
                    }
                    else if (request.getHeader(header) == null) {
                    	result = false;
                    	break;
                    }
                }
                else {
                    boolean negated = separator > 0 && header.charAt(separator - 1) == '!';
                    String key = !negated ? header.substring(0, separator) : header.substring(0, separator - 1);
                    String value = header.substring(separator + 1);
                    if (isMediaTypeHeader(key)) {
                        List<MediaType> requestMediaTypes = MediaType.parseMediaTypes(request.getHeader(key));
                        List<MediaType> valueMediaTypes = MediaType.parseMediaTypes(value);
                        boolean found = false;
                        for (Iterator<MediaType> valIter = valueMediaTypes.iterator(); valIter.hasNext() && !found;) {
                            MediaType valueMediaType = valIter.next();
                            for (Iterator<MediaType> reqIter = requestMediaTypes.iterator();
                                    reqIter.hasNext() && !found;) {
                                MediaType requestMediaType = reqIter.next();
                                if (valueMediaType.includes(requestMediaType)) {
                                    found = true;
                                }
                            }

                        }
                        if (!found) {
                        	result = negated;
                        	break;
                        }
                    }
                    else if (!value.equals(request.getHeader(key))) {
                    	result = negated;
                    	break;
                    }
                }
            }
        }
        return result;
    }

    private static boolean isMediaTypeHeader(String headerName) {
        return Code.ACCEPT.getValue().equalsIgnoreCase(headerName) || Code.CONTENT_TYPE.getValue().equalsIgnoreCase(headerName);
    }
    
    private enum Code {
        ACCEPT("Accept"),CONTENT_TYPE("Content-Type");
        private String value;
        private Code(String value) { this.value = value;}
        private String getValue () { return this.value;}
    }
}
