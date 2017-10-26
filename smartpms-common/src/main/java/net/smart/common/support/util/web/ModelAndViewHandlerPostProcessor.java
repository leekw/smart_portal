package net.smart.common.support.util.web;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import net.smart.common.support.constant.BizCode;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

/**
 * 
 * net.smart.common.support.util.web.ModelAndViewHandlerPostProcessor.java
 * <pre>
 *  ModelAndView를 handler에서 return시 처리 
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
@Component("modelAndViewHandlerPostProcessor")
public class ModelAndViewHandlerPostProcessor implements HandlerPostProcessor {

	@Override
	public boolean isSupply(Object returnValue, Method handlerMethod,Object handler,ModelAndView modelAndView) {
		return (returnValue != null && returnValue instanceof ModelAndView);
	}

	@Override
	public ModelAndView process(Object returnValue,Method handlerMethod, Object handler,ModelAndView modelAndViewParam) {
		
		ModelAndView modelAndViewData = (ModelAndView)returnValue;
		Map<String,Object> model = modelAndViewData.getModel();
		Object data = model.get(BizCode.RequestKey.PARAM_KEY.getValue());
		
		if(data != null && !(data instanceof Map)) { //handler에서 modelAndView.addObject("data",dbObject);
			Map<String,Object> dataMap = new HashMap<String,Object>();
			dataMap.put(data.getClass().getSimpleName(), data);
			modelAndViewData.addObject(BizCode.RequestKey.PARAM_KEY.getValue(), dataMap);
		}
		else if(data != null && data instanceof Map) // jsonView에서보는 set handler에서 modelAndView.addObject("data",Map<"policyUnit",dbObject>);
		{
			//do nothing
		}
		else if(data == null) // handler에서 modelAndView.addObject("policyUnit",dbObject).addObject("policyCondition",dbObject2).... 유형 
		{
			Set<Entry<String,Object>> entrySet = model.entrySet();
			if(entrySet != null)
			{
				Iterator<Entry<String,Object>> iter = entrySet.iterator();
				Map<String,Object> userDataMap = new HashMap<String,Object>();
				while(iter.hasNext())
				{
					Entry<String,Object> userData = iter.next();
					userDataMap.put(userData.getKey(), userData.getValue());
				}
				
				modelAndViewData.addObject(BizCode.RequestKey.PARAM_KEY.getValue(), userDataMap);
			}
		}
		
		return modelAndViewData;
	}

}
