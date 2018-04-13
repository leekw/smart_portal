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
import com.opencsv.CSVReader;

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

            InputStreamReader isr = new FileReader(target.getAnalysisRequestTargetResultPath());

            CSVReader reader = new CSVReader(isr, ',', '"', 1);
             List<AnalysisRawCore> insDataList = new ArrayList<AnalysisRawCore>();

            List<String[]> list = reader.readAll();

            for(String[] data : list){
                AnalysisRawCore insData = new AnalysisRawCore();

                int fileIndex = data[2].lastIndexOf("/");
                String fileName = data[2].substring(fileIndex+1);

                insData.setFile(fileName);
                insData.setFullLocation(data[1]+"."+fileName);

                String priority = data[3];
                String priorityNm = null;

                if("1".equals(priority)){
                    priorityNm = AnalysisPriority.Critical.name();
                }else if("2".equals(priority)){
                    priorityNm = AnalysisPriority.High.name();
                }else if("3".equals(priority)){
                    priorityNm = AnalysisPriority.Nomal.name();
                }

                insData.setSeverity(priorityNm);
                insData.setSource(data[4]);
                insData.setResultMessage(data[5]);
                insData.setVulnerability(data[6]);
                insData.setSecurityRule(data[7]);
                insData.setServiceName(target.getServiceName());
                insData.setRepoName(target.getRepoName());
                insData.setTool(target.getToolName());
                insData.setAnalysisDate(DateUtil.getNow());
                insData.setAnalysisFileNo(target.getAnalysisFileNo());
                insDataList.add(insData);
            }

            parseService.savePmdAnalysisResult(insDataList);
        }
    }
}
