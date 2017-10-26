package net.smart.common.support.constant;
/**
 * 
 * net.smart.common.support.constant.BizCode.java
 * <pre>
 * 공통업무 상수정의 클래스
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public class BizCode {
	
	public enum RequestKey {
		META_DATA_TYPE("metadataType"),
		SERCURITY_KEY("securityYN"), 
		BOOLEAN_Y_STRING("Y"),
		BOOLEAN_N_STRING("N"), 
		CONTENT_TYPE_JSON("Application/json"), 
		CONTENT_TYPE_XML("Application/xml"),
		CONTENT_TYPE_HTML("text/html"), 
		CONTENT_TYPE_FILE("Application/octet-stream"), 
		PARAM_KEY("data"), 
		PARAMS("params"),
		ENCODING_TYPE_OF_UTF8("UTF-8"),
		CONTENT_TYPE_TEXT_PLAIN("text/plain");
		
		private String value;
		private RequestKey(String value) {
			this.value = value;
		}
		public String getValue() {
			return value;
		}
		public boolean isMatch(String compare) {
			return value.equals(compare);
		}		
	}
	
	public enum Data {
		JSON("json"), XML("xml"), FILE("file"),SER("SER");
		private String value;
		private Data(String value) {
			this.value = value;
		}
		public String getValue() {
			return value;
		}
		public boolean isMatch(String compare) {
			return value.equals(compare);
		}
	}
	
	public enum System {
		SYSTEM("SYSTEM"),
		EMPTY_STRING(""), 
		DASH_STRING("/"),
		DELIMITER_SEMI_COLON(";"), 
		DELIMITER_COLON(":"),
		FILE_NOT_EXIST("ERROR.0007"),
		PERCENT_STRING("%"),
		AT_SIGN_STRING("@"),
		COMMA_STRING(","),
		ELLIPSIS_STRING("..."),
		RETURN_KEY("\n"),
		NULL_STRING("NULL"),
		UNDER_BAR("_"),
		DOT("."),
		Y("Y"),
		N("N");
		private String value;
		private System(String value) {
			this.value = value;
		}
		public String getValue() {
			return value;
		}
		public boolean isMatch(String compare) {
			return value.equals(compare);
		}
	}

}
