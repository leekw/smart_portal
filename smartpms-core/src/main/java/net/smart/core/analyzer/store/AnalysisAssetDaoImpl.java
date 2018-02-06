package net.smart.core.analyzer.store;

import lombok.extern.slf4j.Slf4j;
import net.smart.common.dao.SmartCommonDao;
import net.smart.common.domain.*;
import net.smart.common.support.dao.BasedSqlSessionDaoSupport;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
public class AnalysisAssetDaoImpl extends BasedSqlSessionDaoSupport implements AnalysisAssetDao {

    @Autowired
    private SmartCommonDao smartCommonDao;

    @Override
    public void addAnalysisAsset(List<AnalysisAsset> analysisAssets) {
        for (AnalysisAsset param : analysisAssets) {
            Long analysisAssetId = smartCommonDao.getNextSeq("analysis_asset_seq");
            param.setAnalysisAssetId(analysisAssetId);
            getSqlSession().insert("analysis.insertAnalysisAsset", param);
            if (CollectionUtils.isNotEmpty(param.getAnalysisAssetOperationList())) {
                param.getAnalysisAssetOperationList().forEach(
                       o -> {
                           o.setAnalysisAssetId(param.getAnalysisAssetId());
                           o.setAnalysisAssetOperationId(smartCommonDao.getNextSeq("analysis_asset_op_seq"));
                           addAnalysisAssetOperation(o);
                           o.getAnalysisAssetOperationItems().forEach(
                                   i -> {
                                       i.setAnalysisAssetOperationId(o.getAnalysisAssetOperationId());
                                       addAnalysisAssetOperationItem(i);
                                   }
                           );
                       }
                );
            }
        }
    }

    private void addAnalysisAssetOperation(AnalysisAssetOperation param) {
        getSqlSession().insert("analysis.insertAnalysisAssetOperation", param);
    }

    private void addAnalysisAssetOperationItem(AnalysisAssetOperationItem param) {
        getSqlSession().insert("analysis.insertAnalysisAssetOperationItem", param);
    }

    @Override
    public void addAnalysisAssetOperation(List<AnalysisAssetOperation> analysisAssetOperations) {
        for (AnalysisAssetOperation param : analysisAssetOperations) {
            addAnalysisAssetOperation(param);
        }
    }

    @Override
    public void addAnalysisAssetRelation(List<AnalysisAssetRelation> analysisAssetRelations) {
        for (AnalysisAssetRelation param : analysisAssetRelations) {
            try {
                getSqlSession().insert("analysis.insertAnalysisAssetRelation", param);
            } catch (Exception ex) {
                log.warn("duplicate key value violates skip");
            }

        }
    }

    @Override
    public AnalysisRequestTarget getNextAnalysisTargetFile(String targetStatus) {
        return getSqlSession().selectOne("analysis.selectNextAnalysisTargetFile", targetStatus);
    }


    @Override
    public void modifyAnalysisTargetFile(AnalysisRequestTarget param) {
        getSqlSession().update("analysis.updateAnalysisTargetFile", param);
    }

}
