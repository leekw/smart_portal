package net.smart.web.domain;

import net.smart.common.domain.Common;

public class CodeCategory extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8251695021876932400L;
	
	private String codeCategoryId;
	private String codeCategoryName;
	private String useYn;
	private String remark;
	private boolean use;
	
	
	public boolean isUse() {
		return use;
	}
	public void setUse(boolean use) {
		this.use = use;
	}
	public String getCodeCategoryId() {
		return codeCategoryId;
	}
	public void setCodeCategoryId(String codeCategoryId) {
		this.codeCategoryId = codeCategoryId;
	}
	public String getCodeCategoryName() {
		return codeCategoryName;
	}
	public void setCodeCategoryName(String codeCategoryName) {
		this.codeCategoryName = codeCategoryName;
	}
	public String getUseYn() {
		return useYn;
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
