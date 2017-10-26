package net.smart.web.changerequest.dao;

import java.util.List;

import net.smart.common.support.dao.PmssRealSqlSessionDaoSupport;
import net.smart.web.domain.changerequest.ChangeRequestTarget;
import net.smart.web.domain.changerequest.ChangeRequestVolume;

import org.springframework.stereotype.Repository;

@Repository
public class SourceChangeRequestDaoImpl extends PmssRealSqlSessionDaoSupport implements SourceChangeRequestDao {

	@Override
	public List<String> getSvnFileList(String programId) {
		return getSqlSession().selectList("changerequest.selectSvnFileList", programId);
	}
	
	@Override
	public List<ChangeRequestVolume> getSourceProgramByDeveloper(ChangeRequestVolume param) {
		return getSqlSession().selectList("changerequest.selectSourceProgramByDeveloper", param);
	}
	
	@Override
	public List<ChangeRequestTarget> getSourceProgramList(ChangeRequestTarget param) {
		return getSqlSession().selectList("changerequest.selectSourceProgramList", param);
	}

}
