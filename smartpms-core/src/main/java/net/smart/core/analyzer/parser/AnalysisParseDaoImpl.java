package net.smart.core.analyzer.parser;

import lombok.extern.slf4j.Slf4j;
import net.smart.common.domain.AnalysisRawCore;
import net.smart.common.support.dao.BasedSqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
public class AnalysisParseDaoImpl extends BasedSqlSessionDaoSupport implements AnalysisParseDao {


    @Override
    public void addPmdAnalysisResult(List<AnalysisRawCore> insDataList) {

        for (AnalysisRawCore param : insDataList) {
            getSqlSession().insert("analysis.insertAnalysisRaw", param);
        }
    }
}
