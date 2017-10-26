package net.smart.web.code.dao;

import java.util.List;

import net.smart.common.support.dao.BasedSqlSessionDaoSupport;
import net.smart.web.domain.CommonCode;

import org.springframework.stereotype.Repository;

@Repository
public class CodeDaoImpl extends BasedSqlSessionDaoSupport  implements CodeDao {

	@Override
	public List<CommonCode> getCodeList(CommonCode param) {
		return getSqlSession().selectList("code.selectCodeList", param);
	}

	@Override
	public void addCode(CommonCode param) {
		getSqlSession().insert("code.insertCode", param);
	}

}
