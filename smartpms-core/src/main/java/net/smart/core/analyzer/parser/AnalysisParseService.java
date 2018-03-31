package net.smart.core.analyzer.parser;

import net.smart.common.domain.AnalysisRawCore;

import java.util.List;

public interface AnalysisParseService {


    void savePmdAnalysisResult(List<AnalysisRawCore> insDataList);

}
