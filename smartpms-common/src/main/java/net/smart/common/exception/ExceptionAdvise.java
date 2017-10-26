package net.smart.common.exception;

import java.sql.SQLException;

import net.smart.common.support.constant.ErrorCode;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.ThrowsAdvice;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.UncategorizedSQLException;

public class ExceptionAdvise implements ThrowsAdvice {
	
	private final static Logger LOGGER = LoggerFactory.getLogger(ExceptionAdvise.class);
	
	public void afterThrowing(Exception ex) throws Exception {
        if (ex instanceof DataAccessException) {
            throw new IntegrationException(ErrorCode.SYSTEM_ERROR.getValue(), ex);
        } else if (ex instanceof SQLException) {
            throw new IntegrationException(ErrorCode.SYSTEM_ERROR.getValue(), ex);
        } else if (ex instanceof UncategorizedSQLException) {
            throw new IntegrationException(ErrorCode.SYSTEM_ERROR.getValue(), ex);
        }

    }
}
