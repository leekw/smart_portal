package net.smart.common.support.api.jenkins;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class JenkinsConfiguration {

    @Value("${smart.jenkins.host}")
    private String host;

    @Value("${smart.jenkins.job}")
    private String job;

    @Value("${smart.jenkins.username}")
    private String userName;

    @Value("${smart.jenkins.token}")
    private String token;
}
