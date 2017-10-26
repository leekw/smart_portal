package net.smart.web.domain.quality;

import net.smart.common.domain.Common;

public class QualitySvnFile extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1164951969596059193L;
	private String filePath;
	private String filename;
	private String halfPath;
	private int size;
	private String lastCommitDate;
	
	
	public String getLastCommitDate() {
		return lastCommitDate;
	}
	public void setLastCommitDate(String lastCommitDate) {
		this.lastCommitDate = lastCommitDate;
	}
	public int getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}
	public String getHalfPath() {
		return halfPath;
	}
	public void setHalfPath(String halfPath) {
		this.halfPath = halfPath;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	
	

}
