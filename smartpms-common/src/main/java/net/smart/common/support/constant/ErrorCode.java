package net.smart.common.support.constant;
/**
 * 
 * net.smart.common.support.constant.ErrorCode.java
 * <pre>
 *  공통 에러코드 상수 클래스
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public enum ErrorCode {
	SYSTEM_ERROR("ERROR.0000");
	private String value;
	private ErrorCode(String value) {
		this.value = value;
	}
	public String getValue() {
		return value;
	}
	public boolean isMatch(String compare) {
		return value.equals(compare);
	}
}
