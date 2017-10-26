package net.smart.common.support.aspect;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.smart.common.domain.Common;
import net.smart.common.exception.IntegrationException;
import net.smart.common.support.constant.ErrorCode;

import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class ControlFieldAspect {
	
	public Object setControlField(ProceedingJoinPoint proceedingJoinPoint) {
		Common c = new Common();
		c.setFirstCreateDate(new Date());
		c.setFirstCreateProgramName(proceedingJoinPoint.getSignature().getName());
		c.setFirstCreateTransactionId(Common.DefaultValue.DEFALUT_USER.getValue());
		c.setLastChangeDate(new Date());
		c.setLastChangeProgramName(proceedingJoinPoint.getSignature().getName());
		c.setLastChangeTranscationId(Common.DefaultValue.DEFALUT_USER.getValue());
		
		HttpServletRequest request = null;
		if (RequestContextHolder.getRequestAttributes() != null) {
			request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		}
		
//      login 시 login Id로 변경 처리 
//		c.setFirstCreateTransactionId(user.getUserId());
//		c.setLastChangeTranscationId(user.getUserId());
	
		Object[] objs = proceedingJoinPoint.getArgs();
		if (objs != null) {
			for (Object obj : objs) {
				this.setCommonControlFiled(obj, c);
			}
		}
		Object result = null;
		try {
			result = proceedingJoinPoint.proceed();
		} catch (Throwable e) {
			throw new IntegrationException(ErrorCode.SYSTEM_ERROR.getValue(), e);
		}
		return result;
	}
	
	public void setCommonControlFiled(Object obj, Common c) {
		if (obj instanceof List) {
			for (Object object : (List<?>)obj) {
				setCommonControlFiled(object, c);
			}
		} else if (obj instanceof Common) {
			Common common = (Common)obj;
			common.setFirstCreateDate(c.getFirstCreateDate());
			common.setFirstCreateProgramName(c.getFirstCreateProgramName());
			common.setFirstCreateTransactionId(c.getFirstCreateTransactionId());
			common.setFirstCreateDate(c.getLastChangeDate());
			common.setLastChangeProgramName(c.getLastChangeProgramName());
			common.setLastChangeTranscationId(c.getLastChangeTranscationId());
		}
	}
}
