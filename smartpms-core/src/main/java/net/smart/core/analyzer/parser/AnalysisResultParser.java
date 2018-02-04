package net.smart.core.analyzer.parser;

import lombok.extern.slf4j.Slf4j;
import net.smart.core.analyzer.support.S3FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AnalysisResultParser {

    @Autowired
    private S3FileUtils s3FileUtils;

    @Value("${analysis.result.path}")
    private String analysisResultPath;

    public void parse(String targetKey) {
        String targetFile = s3FileUtils.getFile(analysisResultPath, targetKey);

        log.info(" parsing target file full path : {}", targetFile);
        // TODO 아래에 file 읽어서 parsing 하는 작업 추가 하면 됨.
    }
}
