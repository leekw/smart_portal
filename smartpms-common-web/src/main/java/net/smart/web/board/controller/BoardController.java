package net.smart.web.board.controller;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.annotation.IntegrationResponse;
import net.smart.common.exception.IntegrationException;
import net.smart.common.service.SmartCommonService;
import net.smart.web.board.service.BoardService;
import net.smart.web.domain.CommonCode;
import net.smart.web.domain.board.Board;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class BoardController {
	
	@Autowired
	private BoardService boardService;
	
	@Autowired
	private SmartCommonService integrationCommonService;
	
	@RequestMapping(value = "/board/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="boards")
	public List<Board> getBoardList(@IntegrationRequest Board param) {
		return boardService.getBoardList(param);
	} 
	
	@RequestMapping(value = "/board/add.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="board")
	public Board addBoard(@IntegrationRequest List<Board> params, HttpServletRequest request) throws IllegalAccessException, InvocationTargetException {
		Board result = new Board();
		if (params != null && !params.isEmpty()) {
			Board param = params.get(0);
			String ip = request.getHeader("X-FORWARDED-FOR");
			if (ip == null || ip.length() == 0) {
				ip = request.getHeader("Proxy-Client-IP");
			}
			if (ip == null || ip.length() == 0) {
				ip = request.getHeader("WL-Proxy-Client-IP");
			}
			if (ip == null || ip.length() == 0) {
				ip = request.getRemoteAddr();
			}
			param.setIp(ip);
			boardService.addBoard(param);
			BeanUtils.copyProperties(param, result);
		}
		return result;
	}
	
	
	private void checkAuth(HttpServletRequest request, String ownIp) {
		String ip = request.getHeader("X-FORWARDED-FOR");
		if (ip == null || ip.length() == 0) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0) {
			ip = request.getRemoteAddr();
		}
		boolean isAdmin = false;
		isAdmin = integrationCommonService.isAdmin();
		if (!isAdmin && !ownIp.equals(ip))
			throw new IntegrationException("ERROR.0001", "수정/삭제 권한이 없습니다!!");
	}
	
	
	@RequestMapping(value = "/board/modify.{metadataType}", method = RequestMethod.POST)
	public void modifyBoard(@IntegrationRequest List<Board> params, HttpServletRequest request) {
		if (params != null && !params.isEmpty()) {
			Board param = params.get(0);
			this.checkAuth(request, param.getIp());
			boardService.modifyBoard(param);
		}
	}

	@RequestMapping(value = "/board/remove.{metadataType}", method = RequestMethod.POST)
	public void removeBoard(@IntegrationRequest List<Board> params, HttpServletRequest request) {
		if (params != null && !params.isEmpty()) {
			Board param = params.get(0);
			this.checkAuth(request, param.getIp());
			boardService.removeBoard(param);
		}
	}
	
	@RequestMapping(value = "/team/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="teams")
	public List<CommonCode> getTeamList() {
//		return boardService.getTeamList();
		return null;
	}


}
