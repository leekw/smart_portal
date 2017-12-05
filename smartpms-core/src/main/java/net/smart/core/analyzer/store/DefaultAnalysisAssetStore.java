package net.smart.core.analyzer.store;

import net.smart.common.domain.AnalysisAsset;
import net.smart.common.domain.AnalysisAssetRelation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DefaultAnalysisAssetStore implements AnalysisAssetStore {

    @Autowired
    private AnalysisAssetDao analysisAssetDao;

    @Override
    @Transactional
    public void addAnalysisAsset(List<AnalysisAsset> analysisAssets) {
        analysisAssetDao.addAnalysisAsset(analysisAssets);
    }

    @Override
    @Transactional
    public void addAnalysisAssetRelation(List<AnalysisAssetRelation> analysisAssetRelations) {
        analysisAssetDao.addAnalysisAssetRelation(analysisAssetRelations);
    }
}
