package net.smart.common.exception;

/**
 * 
 * net.smart.common.exception.IIntegrationException.java
 * <pre>
 *  System에서 사용되는 예외처리 인터페이스
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public interface IIntegrationException {
	
	public String getCode();

	public String getMessage();

	public boolean isWriteLog();

	public void setWriteLog(boolean isWriteLog);

	public void setUserObject(Object userObject);

	public Object getUserObject();

	public String getMessageByMetadata(String metadataType) throws Exception;
}
