package net.smart.core.analyzer.parser;

import lombok.extern.slf4j.Slf4j;
import net.smart.common.domain.AnalysisRequestTarget;
import net.smart.core.analyzer.request.AnalysisRequestTargetProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AnalysisResultParser {

    @Autowired
    private AnalysisRequestTargetProvider provider;

    public void parse() {

        AnalysisRequestTarget target = provider.nextAnalysisResult();
        if (target != null) {
            log.info(" parsing target file full path : {}", target.getAnalysisRequestTargetResultPath());
            // TODO 아래에 file 읽어서 parsing 하는 작업 추가 하면 됨.
        }
    }
}
