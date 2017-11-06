package net.smart.core.analyzer.store;

import net.smart.core.domain.AnalysisAsset;
import net.smart.core.domain.AnalysisAssetOperation;
import net.smart.core.domain.AnalysisAssetRelation;

import java.util.List;

public interface AnalysisAssetDao {
    public void addAnalysisAsset(List<AnalysisAsset> analysisAssets);
    public void addAnalysisAssetOperation(List<AnalysisAssetOperation> analysisAssetOperations);
    public void addAnalysisAssetRelation(List<AnalysisAssetRelation> analysisAssetRelations);
}
