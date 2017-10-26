package net.smart.web.domain;

import net.smart.common.domain.Common;

public class CommonCode extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5941517447794487645L;
	
	private String commonCode;
	private String commonCodeName;
	private String commonCodeType;
	private int sortNo;
	private String refValue1;
	private String refValue2;
	private String refValue3;
	
	public CommonCode() {
	}
	
	public CommonCode(String code, String name, String type) {
		this.commonCode = code;
		this.commonCodeName = name;
		this.commonCodeType = type;
	}
	
	public String getRefValue3() {
		return refValue3;
	}
	public void setRefValue3(String refValue3) {
		this.refValue3 = refValue3;
	}
	public String getRefValue1() {
		return refValue1;
	}
	public void setRefValue1(String refValue1) {
		this.refValue1 = refValue1;
	}
	public String getRefValue2() {
		return refValue2;
	}
	public void setRefValue2(String refValue2) {
		this.refValue2 = refValue2;
	}
	public int getSortNo() {
		return sortNo;
	}
	public void setSortNo(int sortNo) {
		this.sortNo = sortNo;
	}
	public String getCommonCode() {
		return commonCode;
	}
	public void setCommonCode(String commonCode) {
		this.commonCode = commonCode;
	}
	public String getCommonCodeName() {
		return commonCodeName;
	}
	public void setCommonCodeName(String commonCodeName) {
		this.commonCodeName = commonCodeName;
	}
	public String getCommonCodeType() {
		return commonCodeType;
	}
	public void setCommonCodeType(String commonCodeType) {
		this.commonCodeType = commonCodeType;
	}
}
