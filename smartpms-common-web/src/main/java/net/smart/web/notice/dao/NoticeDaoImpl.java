package net.smart.web.notice.dao;

import java.util.List;

import net.smart.common.support.dao.BasedSqlSessionDaoSupport;
import net.smart.web.domain.notice.Notice;

import org.springframework.stereotype.Repository;

@Repository("noticeDao")
public class NoticeDaoImpl  extends BasedSqlSessionDaoSupport  implements NoticeDao {

	@Override
	public List<Notice> getNoticeList(Notice param) {
		return getSqlSession().selectList("notice.selectNoticeList", param);
	}

	@Override
	public void addNotice(Notice param) {
		getSqlSession().insert("notice.insertNotice", param);
	}


	@Override
	public void modifyNotice(Notice param) {
		getSqlSession().update("notice.updateNotice", param);
	}


	@Override
	public void removeNotice(List<Notice> params) {
		for (Notice param : params) {
			getSqlSession().delete("notice.deleteNotice", param);
		}
	}

}
