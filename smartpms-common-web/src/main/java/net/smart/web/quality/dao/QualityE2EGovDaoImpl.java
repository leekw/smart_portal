package net.smart.web.quality.dao;

import java.util.List;

import net.smart.common.support.dao.E2ESqlSessionDaoSupport;
import net.smart.web.domain.quality.NotUsedStat;

import org.springframework.stereotype.Repository;

@Repository
public class QualityE2EGovDaoImpl extends E2ESqlSessionDaoSupport implements QualityE2EGovDao {

	@Override
	public List<NotUsedStat> getNotUsedStat(NotUsedStat param) {
		return getSqlSession().selectList("quality.selectE2ENotUsedStat", param);
	}

}
