package net.smart.core.analyzer.store;

import net.smart.common.dao.SmartCommonDao;
import net.smart.common.support.dao.BasedSqlSessionDaoSupport;
import net.smart.common.domain.AnalysisAsset;
import net.smart.common.domain.AnalysisAssetOperation;
import net.smart.common.domain.AnalysisAssetOperationItem;
import net.smart.common.domain.AnalysisAssetRelation;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

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
                System.out.println("duplicate key value violates skip");
            }

        }
    }
}
