package net.smart.core.analyzer.store;

import net.smart.core.domain.AnalysisAsset;
import net.smart.core.domain.AnalysisAssetRelation;

import java.util.List;

public interface AnalysisAssetStore {
    public void addAnalysisAsset(List<AnalysisAsset> analysisAssets);
    public void addAnalysisAssetRelation(List<AnalysisAssetRelation> analysisAssetRelations);
}
