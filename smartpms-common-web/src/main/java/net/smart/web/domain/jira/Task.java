package net.smart.web.domain.jira;

import java.util.Date;

public class Task {
	
	private String id;
	private String text;
	private String type;
	private boolean open;
	private String start_date;
	private int duration;
	private String end_date;
	private String parent;
	private double progress;
	private Date min;
	private Date max;
	private boolean leaf;
	private String team;
	private String executor;
	private String durationMin;
	private String color;
	private String closeId;
	private String textColor;
	private String taskType;
	private String summary;
	private int level;
	private String subCount;
	private String closeYn;
	private String exposureType;
	
	
	public String getExposureType() {
		return exposureType;
	}
	public void setExposureType(String exposureType) {
		this.exposureType = exposureType;
	}
	public String getCloseYn() {
		return closeYn;
	}
	public void setCloseYn(String closeYn) {
		this.closeYn = closeYn;
	}
	public String getSubCount() {
		return subCount;
	}
	public void setSubCount(String subCount) {
		this.subCount = subCount;
	}
	
	
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public String getTaskType() {
		return taskType;
	}
	public void setTaskType(String taskType) {
		this.taskType = taskType;
	}
	public String getTextColor() {
		return textColor;
	}
	public void setTextColor(String textColor) {
		this.textColor = textColor;
	}
	public String getCloseId() {
		return closeId;
	}
	public void setCloseId(String closeId) {
		this.closeId = closeId;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getDurationMin() {
		return durationMin;
	}
	public void setDurationMin(String durationMin) {
		this.durationMin = durationMin;
	}
	public String getTeam() {
		return team;
	}
	public void setTeam(String team) {
		this.team = team;
	}
	public String getExecutor() {
		return executor;
	}
	public void setExecutor(String executor) {
		this.executor = executor;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public Date getMin() {
		return min;
	}
	public void setMin(Date min) {
		this.min = min;
	}
	public Date getMax() {
		return max;
	}
	public void setMax(Date max) {
		this.max = max;
	}
	public double getProgress() {
		return progress;
	}
	public void setProgress(double progress) {
		this.progress = progress;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public boolean isOpen() {
		return open;
	}
	public void setOpen(boolean open) {
		this.open = open;
	}
	public String getStart_date() {
		return start_date;
	}
	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	public String getEnd_date() {
		return end_date;
	}
	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}
	public String getParent() {
		return parent;
	}
	public void setParent(String parent) {
		this.parent = parent;
	}
	
	
	
}
