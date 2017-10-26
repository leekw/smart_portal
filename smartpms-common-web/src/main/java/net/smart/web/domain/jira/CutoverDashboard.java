package net.smart.web.domain.jira;

import net.smart.common.domain.Common;

public class CutoverDashboard extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1898865187921204736L;
	private int totalCount;
	private int assignReadyCount;
	private int workReadyCount;
	private int workingCount;
	private int workDelayCount;
	private int startDelayCount;
	private int endDelayCount;
	private int workCompleteCount;
	private double workingRatio;
	private String cutoverTh;
	private String jobStep;
	private String jobType;
	private String jobExecutionTeam;
	private String systemType;
	private double data1;
	private int cnt;
	private String name;
	private String yCategory;
	private String mode;
	
	
	public int getStartDelayCount() {
		return startDelayCount;
	}
	public void setStartDelayCount(int startDelayCount) {
		this.startDelayCount = startDelayCount;
	}
	public int getEndDelayCount() {
		return endDelayCount;
	}
	public void setEndDelayCount(int endDelayCount) {
		this.endDelayCount = endDelayCount;
	}
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public String getyCategory() {
		return yCategory;
	}
	public void setyCategory(String yCategory) {
		this.yCategory = yCategory;
	}
	public double getData1() {
		return data1;
	}
	public void setData1(double data1) {
		this.data1 = data1;
	}
	public int getCnt() {
		return cnt;
	}
	public void setCnt(int cnt) {
		this.cnt = cnt;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCutoverTh() {
		return cutoverTh;
	}
	public void setCutoverTh(String cutoverTh) {
		this.cutoverTh = cutoverTh;
	}
	public String getJobStep() {
		return jobStep;
	}
	public void setJobStep(String jobStep) {
		this.jobStep = jobStep;
	}
	public String getJobType() {
		return jobType;
	}
	public void setJobType(String jobType) {
		this.jobType = jobType;
	}
	public String getJobExecutionTeam() {
		return jobExecutionTeam;
	}
	public void setJobExecutionTeam(String jobExecutionTeam) {
		this.jobExecutionTeam = jobExecutionTeam;
	}
	public String getSystemType() {
		return systemType;
	}
	public void setSystemType(String systemType) {
		this.systemType = systemType;
	}
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	public int getAssignReadyCount() {
		return assignReadyCount;
	}
	public void setAssignReadyCount(int assignReadyCount) {
		this.assignReadyCount = assignReadyCount;
	}
	public int getWorkReadyCount() {
		return workReadyCount;
	}
	public void setWorkReadyCount(int workReadyCount) {
		this.workReadyCount = workReadyCount;
	}
	public int getWorkingCount() {
		return workingCount;
	}
	public void setWorkingCount(int workingCount) {
		this.workingCount = workingCount;
	}
	public int getWorkDelayCount() {
		return workDelayCount;
	}
	public void setWorkDelayCount(int workDelayCount) {
		this.workDelayCount = workDelayCount;
	}
	public int getWorkCompleteCount() {
		return workCompleteCount;
	}
	public void setWorkCompleteCount(int workCompleteCount) {
		this.workCompleteCount = workCompleteCount;
	}
	public double getWorkingRatio() {
		return workingRatio;
	}
	public void setWorkingRatio(double workingRatio) {
		this.workingRatio = workingRatio;
	}
	
	
}
