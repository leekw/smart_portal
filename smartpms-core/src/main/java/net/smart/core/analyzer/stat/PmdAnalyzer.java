package net.smart.core.analyzer.stat;

import net.smart.common.domain.AnalysisRequestTarget;
import net.smart.common.domain.AnalysisRequestTool;
import net.smart.common.support.api.jenkins.JenkinsConfiguration;
import net.smart.common.support.api.jenkins.JenkinsConnector;
import net.smart.common.support.api.jenkins.NameValue;
import net.smart.common.support.api.jenkins.RequestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class PmdAnalyzer implements Analyzer {

    @Autowired
    private JenkinsConfiguration config;

    @Override
    public boolean isSupport(AnalysisRequestTarget target) {
        return target.getAnalysisRequestToolList().contains(AnalysisRequestTool.PMD);
    }

    @Async
    @Override
    public void analyze(AnalysisRequestTarget target) {
        RequestEntity requestEntity = new RequestEntity(config.getHost(), config.getJob(), config.getUserName(), config.getToken());
        requestEntity.add(new NameValue("source", target.getAnalysisRequestTargetSourceName()));
        requestEntity.add(new NameValue("target", target.getAnalysisRequestTargetSourceName() + ".csv"));

        JenkinsConnector jenkinsConnector = new JenkinsConnector();

        jenkinsConnector.executeJob(requestEntity);
    }
}
