package net.smart.web.domain;

import javax.xml.bind.annotation.XmlRootElement;

import net.smart.common.domain.Common;
import net.smart.common.support.constant.BizCode;

@XmlRootElement
public class Sample extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7013084745236018258L;
	
	private String areaCode;
	private String serviceCode;
	private String facilitiesYn;
	private String useYn;
	private String remark;
	private String dataMode;
	
	public String getDataMode() {
		return dataMode;
	}
	public void setDataMode(String dataMode) {
		this.dataMode = dataMode;
	}
	public boolean isFacilities() {
		return BizCode.System.Y.isMatch(this.getFacilitiesYn()) ? true : false;
	}
	public boolean isUse() {
		return BizCode.System.Y.isMatch(this.getUseYn()) ? true : false;
	}
	public String getAreaCode() {
		return areaCode;
	}
	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	public String getServiceCode() {
		return serviceCode;
	}
	public void setServiceCode(String serviceCode) {
		this.serviceCode = serviceCode;
	}
	public String getFacilitiesYn() {
		return facilitiesYn == null ? BizCode.System.N.getValue() : facilitiesYn;
	}
	public void setFacilitiesYn(String facilitiesYn) {
		this.facilitiesYn = facilitiesYn;
	}
	public String getUseYn() {
		return useYn == null ? BizCode.System.N.getValue() : useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}
