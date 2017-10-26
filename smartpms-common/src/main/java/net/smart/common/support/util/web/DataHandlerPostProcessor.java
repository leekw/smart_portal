package net.smart.common.support.util.web;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import net.smart.common.annotation.IntegrationResponse;
import net.smart.common.support.constant.BizCode;

import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

/**
 * 
 * net.smart.common.support.util.web.DataHandlerPostProcessor.java
 * <pre>
 * Handler에서 return를 사용자 data Object로 return으로 처리하는 클래스
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
@Component("dataHandlerPostProcessor")
public class DataHandlerPostProcessor implements HandlerPostProcessor {

	@Override
	public boolean isSupply(Object returnValue, Method handlerMethod,Object handler,ModelAndView modelAndViewParam) {
		return (returnValue != null && !(returnValue instanceof ModelAndView));
	}

	@Override
	public ModelAndView process(Object returnValue, Method handlerMethod,Object handler,ModelAndView modelAndViewParam) {
		
		ModelAndView modelAndView = modelAndViewParam == null ? new ModelAndView() : modelAndViewParam;
		IntegrationResponse ann = AnnotationUtils.findAnnotation(handlerMethod, IntegrationResponse.class);
		if(ann != null)
		{
			String key = ann.key();
			Map<String,Object> userDataMap = new HashMap<String,Object>();
			userDataMap.put(key, returnValue);
			
			modelAndView.addObject(BizCode.RequestKey.PARAM_KEY.getValue(),userDataMap);
		}
		else
		{
			Map<String,Object> userDataMap = new HashMap<String,Object>();
			userDataMap.put(returnValue.getClass().getSimpleName(), returnValue);
			
			modelAndView.addObject(BizCode.RequestKey.PARAM_KEY.getValue(),userDataMap);
		}
		
		return modelAndView;
	}

}
