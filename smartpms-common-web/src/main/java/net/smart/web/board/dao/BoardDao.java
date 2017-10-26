package net.smart.web.board.dao;

import java.util.List;

import net.smart.web.domain.board.Board;

public interface BoardDao {
	
	public List<Board> getBoardList(Board param);
	
	public void addBoard(Board param);
	
	public void modifyBoard(Board param);
	
	public void removeBoard(Board param);
	
	
	public Integer getNextBoarId();

}
