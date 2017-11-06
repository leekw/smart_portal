package net.smart.core.analyzer.store;

import net.smart.core.domain.AnalysisAsset;
import net.smart.core.domain.AnalysisAssetRelation;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class DefaultAnalysisAssetStore implements AnalysisAssetStore {

    @Autowired
    private AnalysisAssetDao analysisAssetDao;

    @Override
    public void addAnalysisAsset(List<AnalysisAsset> analysisAssets) {
        analysisAssetDao.addAnalysisAsset(analysisAssets);
    }

    @Override
    public void addAnalysisAssetRelation(List<AnalysisAssetRelation> analysisAssetRelations) {

    }
}
