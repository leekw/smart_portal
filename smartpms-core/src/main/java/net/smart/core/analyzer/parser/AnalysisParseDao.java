package net.smart.core.analyzer.parser;

import net.smart.common.domain.AnalysisRawCore;

import java.util.List;

public interface AnalysisParseDao {
    void addPmdAnalysisResult(List<AnalysisRawCore> insDataList);
}
