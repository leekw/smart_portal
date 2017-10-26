package net.smart.common.support.util.web.filter;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
/**
 * 
 * net.smart.common.support.util.web.filter.XSSRequestWrapper.java
 * <pre>
 *  XSS 공격을 무력화 하기 위한 Wrapper 클래스
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public class XSSRequestWrapper extends HttpServletRequestWrapper {
		
	private Map<String, String[]> sanitizedQueryString;

	public XSSRequestWrapper(HttpServletRequest request) {
		super(request);
	} 
	
	@Override
    public String[] getParameterValues(String parameter) {
        String[] values = super.getParameterValues(parameter);
        String[] encodedValues = null;
        if (values != null) {
        int count = values.length;
	        encodedValues = new String[count];
	        for (int i = 0; i < count; i++) {
	            encodedValues[i] = stripXSS(values[i]);
	        }
        }
        return encodedValues;
    }
 
    @Override
    public String getParameter(String parameter) {
        String value = super.getParameter(parameter);
        return stripXSS(value);
    }
    @Override
    public String getHeader(String name) {
        String value = super.getHeader(name);
        return stripXSS(value);
    }
    
    @SuppressWarnings("unchecked")
	@Override
	public Map<String,String[]> getParameterMap() {
		if(sanitizedQueryString == null) {
			Map<String, String[]> res = new HashMap<String, String[]>();
			Map<String, String[]> originalQueryString = super.getParameterMap();
			if(originalQueryString!=null) {
				for (String key : (Set<String>) originalQueryString.keySet()) {
					String[] rawVals = originalQueryString.get(key);
					String[] snzVals = new String[rawVals.length];
					for (int i=0; i < rawVals.length; i++) {
						snzVals[i] = stripXSS(rawVals[i]);
					}
					res.put(stripXSS(key), snzVals);
				}
			}
			sanitizedQueryString = res;
		}
		return sanitizedQueryString;
	}
	
	private enum XSSPattern {
		SCRIPT_1("<script>(.*?)</script>"),
		SCRIPT_2("</script>"),
		SCRIPT_3("<script(.*?)>"),
		SRC_1("src[\r\n]*=[\r\n]*\\\'(.*?)\\\'"),
		SRC_2("src[\r\n]*=[\r\n]*\\\"(.*?)\\\""),
		EVAL("eval\\((.*?)\\)"),
		EXPRESSION("expression\\((.*?)\\)"),
		JAVASCRIPT("javascript:"),
		VBSCRIPT("vbscript:"),
		ONLOAD("onload(.*?)=");
		private String value;
		private XSSPattern(String value) {
			this.value = value;
		}
		public String getValue() {
			return value;
		}
	}
     
    private String stripXSS(String param) {
    	String value = null;
        if (param != null) {
        	value = param;
            Pattern scriptPattern = Pattern.compile(XSSPattern.SCRIPT_1.getValue(), Pattern.CASE_INSENSITIVE);
            value = scriptPattern.matcher(value).replaceAll("");
            scriptPattern = Pattern.compile(XSSPattern.SRC_1.getValue(), Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
            value = scriptPattern.matcher(value).replaceAll("");
            scriptPattern = Pattern.compile(XSSPattern.SRC_2.getValue(), Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
            value = scriptPattern.matcher(value).replaceAll("");
            scriptPattern = Pattern.compile(XSSPattern.SCRIPT_2.getValue(), Pattern.CASE_INSENSITIVE);
            value = scriptPattern.matcher(value).replaceAll("");
            scriptPattern = Pattern.compile(XSSPattern.SCRIPT_2.getValue(), Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
            value = scriptPattern.matcher(value).replaceAll("");
            scriptPattern = Pattern.compile(XSSPattern.EVAL.getValue(), Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
            value = scriptPattern.matcher(value).replaceAll("");
            scriptPattern = Pattern.compile(XSSPattern.EXPRESSION.getValue(), Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
            value = scriptPattern.matcher(value).replaceAll("");
            scriptPattern = Pattern.compile(XSSPattern.JAVASCRIPT.getValue(), Pattern.CASE_INSENSITIVE);
            value = scriptPattern.matcher(value).replaceAll("");
            scriptPattern = Pattern.compile(XSSPattern.VBSCRIPT.getValue(), Pattern.CASE_INSENSITIVE);
            value = scriptPattern.matcher(value).replaceAll("");
            scriptPattern = Pattern.compile(XSSPattern.ONLOAD.getValue(), Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
            value = scriptPattern.matcher(value).replaceAll("");
        }
        return value;
    }

}
