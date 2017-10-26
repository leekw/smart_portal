package net.smart.common.domain;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * net.smart.common.domain.Common.java
 * <pre>
 * 모든 도메인 객체를 대표하는 도메인 클래스
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public class Common implements Serializable {
	
	/** 
	 *  
	 */
	private static final long serialVersionUID = 1539648283850038446L;
	private int maxRowSize;
	private Date firstCreateDate;
	private String firstCreateTransactionId;
	private Date lastChangeDate;
	private String lastChangeTranscationId;
	private String firstCreateProgramName;
	private String lastChangeProgramName;  
	private int start;
	private int limit;
	private int pageSize;
	private int page;
	private int total;
	private String mode;
	
	
	public enum DefaultValue {
		DEFALUT_USER("defaultUser"),
		DEFAULT_PROGRAM("defaultProgram");
		private String value;
		private DefaultValue(String value) {
			this.value = value;
		}
		public String getValue() {
			return value;
		}
	}
	
	
	
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getMaxRowSize() {
		return maxRowSize;
	}
	public void setMaxRowSize(int maxRowSize) {
		this.maxRowSize = maxRowSize;
	}
	
	public Date getFirstCreateDate() {
		return firstCreateDate;
	}
	public void setFirstCreateDate(Date firstCreateDate) {
		this.firstCreateDate = firstCreateDate;
	}
	public String getFirstCreateTransactionId() {
        return firstCreateTransactionId == null 
        		? DefaultValue.DEFALUT_USER.getValue() 
        		: firstCreateTransactionId;
	}
	public void setFirstCreateTransactionId(String firstCreateTransactionId) {
		this.firstCreateTransactionId = firstCreateTransactionId;
	}
	public Date getLastChangeDate() {
		return lastChangeDate;
	}
	public void setLastChangeDate(Date lastChangeDate) {
		this.lastChangeDate = lastChangeDate;
	}
	public String getLastChangeTranscationId() {
		return lastChangeTranscationId == null 
				? DefaultValue.DEFALUT_USER.getValue()  
				: lastChangeTranscationId;
	}
	public void setLastChangeTranscationId(String lastChangeTranscationId) {
		this.lastChangeTranscationId = lastChangeTranscationId;
	}
	public String getFirstCreateProgramName() {
		return firstCreateProgramName == null 
				? DefaultValue.DEFAULT_PROGRAM.getValue() 
				: firstCreateProgramName;
	}
	public void setFirstCreateProgramName(String firstCreateProgramName) {
		this.firstCreateProgramName = firstCreateProgramName;
	}
	public String getLastChangeProgramName() {
		return lastChangeProgramName == null 
				? DefaultValue.DEFAULT_PROGRAM.getValue()
				: lastChangeProgramName;
	}
	public void setLastChangeProgramName(String lastChangeProgramName) {
		this.lastChangeProgramName = lastChangeProgramName;
	}
	
}
