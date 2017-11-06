package net.smart.common.support.dao;

import static org.springframework.util.Assert.notNull;

import net.smart.common.exception.BizException;

import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.support.DaoSupport;

public abstract class PmssSqlSessionDaoSupport extends DaoSupport {
	
	private SqlSession sqlSession;
    
    @Autowired @Qualifier("pmssSqlSessionFactory")
    public final void setSqlSessionFactory(SqlSessionFactoryBean sqlSessionFactory) {
        try {
            this.sqlSession = new SqlSessionTemplate(sqlSessionFactory.getObject(), ExecutorType.REUSE);
        } catch (Exception e) {
            throw new BizException(e);
        }
    }
    
    public final SqlSession getSqlSession() {
        return this.sqlSession;
    }

    @Override
    protected void checkDaoConfig() throws IllegalArgumentException {
        notNull(this.sqlSession, "Property 'sqlSessionFactory' or 'sqlSessionTemplate' are required");
    }

}
