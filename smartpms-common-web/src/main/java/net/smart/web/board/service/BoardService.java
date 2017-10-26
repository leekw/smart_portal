package net.smart.web.board.service;

import java.util.List;

import net.smart.web.domain.board.Board;

public interface BoardService {
	
	public List<Board> getBoardList(Board param);
	
	public void addBoard(Board param);
	
	public void modifyBoard(Board param);
	
	public void removeBoard(Board param);

}
