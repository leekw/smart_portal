package net.smart.common.domain;

public class UploadFile extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8033745105040073869L;
	
	private String fileName;
	private String filePath;
	private int fileNo;
	private int boardNo;
	private int boardId;
	private String fileSize;
	private String dataMode;
	private String resourceId;
	
	public String getResourceId() {
		return resourceId;
	}
	public void setResourceId(String resourceId) {
		this.resourceId = resourceId;
	}
	public String getDataMode() {
		return dataMode;
	}
	public void setDataMode(String dataMode) {
		this.dataMode = dataMode;
	}
	public int getBoardNo() {
		return boardNo;
	}
	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}
	public int getBoardId() {
		return boardId;
	}
	public void setBoardId(int boardId) {
		this.boardId = boardId;
	}
	public String getFileSize() {
		return fileSize;
	}
	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public int getFileNo() {
		return fileNo;
	}
	public void setFileNo(int fileNo) {
		this.fileNo = fileNo;
	}

	
}
