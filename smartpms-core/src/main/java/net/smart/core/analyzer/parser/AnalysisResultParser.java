package net.smart.core.analyzer.parser;

import lombok.extern.slf4j.Slf4j;
import net.smart.common.domain.AnalysisPriority;
import net.smart.common.domain.AnalysisRawCore;
import net.smart.common.domain.AnalysisRequestTarget;
import net.smart.common.domain.AnalysisStatus;
import net.smart.common.support.util.DateUtil;
import net.smart.core.analyzer.request.AnalysisRequestTargetProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class AnalysisResultParser {

    @Autowired
    private AnalysisRequestTargetProvider provider;

    @Autowired
    private AnalysisParseService parseService;

    public void parse() throws IOException {

        AnalysisRequestTarget target = provider.nextAnalysisResult();
        if (target != null) {
            log.info(" parsing target file full path : {}", target.getAnalysisRequestTargetResultPath());
            // TODO 아래에 file 읽어서 parsing 하는 작업 추가 하면 됨.

            InputStreamReader isr = new FileReader(target.getAnalysisRequestTargetResultPath());

            BufferedReader reader = new BufferedReader(isr);

            List<AnalysisRawCore> insDataList = new ArrayList<AnalysisRawCore>();

            int lineNum = 0;
            while(true){

                String line = reader.readLine();

                if(line == null) break;
                String[] colmns = line.split(",",-1);

                if(lineNum !=0) {

                    AnalysisRawCore insData = new AnalysisRawCore();
                    int colNum = 0;
                    for (String data : colmns) {
                        data = data.replaceAll("\"","");
                        colNum++;
                        if (colNum == 3) {
                            insData.setFullLocation(data);

                            String fileName[] = data.split("/");
                            insData.setFile(fileName[fileName.length-1]);

                        }
                        if (colNum == 4) {
                            if("1".equals(data)){
                                data = AnalysisPriority.Critical.name();
                            }else if("2".equals(data)){
                                data = AnalysisPriority.High.name();
                            }else if("3".equals(data)){
                                data = AnalysisPriority.Nomal.name();
                            }

                            insData.setSeverity(data);
                        }
                        if (colNum == 5) {
                            insData.setSource(data);
                        }
                        if (colNum == 6) {
                            insData.setResultMessage(data);
                        }
                        if (colNum == 7) {
                            insData.setVulnerability(data);
                        }
                        if (colNum == 8) {
                            insData.setSecurityRule(data);
                        }
                    }

                    insData.setServiceName(target.getServiceName());
                    insData.setRepoName(target.getRepoName());
                    insData.setTool(target.getToolName());
                    insData.setAnalysisDate(DateUtil.getNow());
                    insDataList.add(insData);
                }
                lineNum++;
            }

            parseService.savePmdAnalysisResult(insDataList);


        }
    }
}
