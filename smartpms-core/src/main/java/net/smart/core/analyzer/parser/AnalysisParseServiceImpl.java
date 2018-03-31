package net.smart.core.analyzer.parser;

import net.smart.common.domain.AnalysisRawCore;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service("analysisParseService")
public class AnalysisParseServiceImpl  implements AnalysisParseService{

    @Autowired
    private AnalysisParseDao analysisParseDao;

    @Override
    public void savePmdAnalysisResult(List<AnalysisRawCore> insDataList) {
        analysisParseDao.addPmdAnalysisResult(insDataList);

    }
}
