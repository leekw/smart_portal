package net.smart.core.analyzer.store;

import net.smart.common.domain.AnalysisAsset;
import net.smart.common.domain.AnalysisAssetOperation;
import net.smart.common.domain.AnalysisAssetRelation;

import java.util.List;

public interface AnalysisAssetDao {
    public void addAnalysisAsset(List<AnalysisAsset> analysisAssets);
    public void addAnalysisAssetOperation(List<AnalysisAssetOperation> analysisAssetOperations);
    public void addAnalysisAssetRelation(List<AnalysisAssetRelation> analysisAssetRelations);
}
