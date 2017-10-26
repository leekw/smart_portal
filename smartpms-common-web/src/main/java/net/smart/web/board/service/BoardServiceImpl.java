package net.smart.web.board.service;

import java.util.List;

import net.smart.web.board.dao.BoardDao;
import net.smart.web.domain.board.Board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("boardService")
public class BoardServiceImpl implements BoardService {
	
	@Autowired
	private BoardDao boardDao;
	

	@Override
	public List<Board> getBoardList(Board param) {
		return boardDao.getBoardList(param);
	}

	@Override
	public void addBoard(Board param) {
		boardDao.addBoard(param);
	}

	@Override
	public void modifyBoard(Board param) {
		boardDao.modifyBoard(param);
	}

	@Override
	public void removeBoard(Board param) {
		boardDao.removeBoard(param);
	}


}
