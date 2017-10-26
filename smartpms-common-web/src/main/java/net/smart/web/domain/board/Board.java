package net.smart.web.domain.board;

import net.smart.common.domain.Common;

public class Board extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = -645991495500155031L;
	
	private int boardId;
	private String boardTitle;
	private int boardNo;
	private String boardTeam;
	private String boardCreateDate;
	private String boardDescription;
	private String dataMode;
	private String ip;
	private String boardCreator;
	
	
	public String getBoardCreator() {
		return boardCreator;
	}
	public void setBoardCreator(String boardCreator) {
		this.boardCreator = boardCreator;
	}
	public String getDataMode() {
		return dataMode;
	}
	public void setDataMode(String dataMode) {
		this.dataMode = dataMode;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public int getBoardId() {
		return boardId;
	}
	public void setBoardId(int boardId) {
		this.boardId = boardId;
	}
	public String getBoardTitle() {
		return boardTitle;
	}
	public void setBoardTitle(String boardTitle) {
		this.boardTitle = boardTitle;
	}
	public int getBoardNo() {
		return boardNo;
	}
	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}
	public String getBoardTeam() {
		return boardTeam;
	}
	public void setBoardTeam(String boardTeam) {
		this.boardTeam = boardTeam;
	}
	public String getBoardCreateDate() {
		return boardCreateDate;
	}
	public void setBoardCreateDate(String boardCreateDate) {
		this.boardCreateDate = boardCreateDate;
	}
	public String getBoardDescription() {
		return boardDescription;
	}
	public void setBoardDescription(String boardDescription) {
		this.boardDescription = boardDescription;
	}
}
