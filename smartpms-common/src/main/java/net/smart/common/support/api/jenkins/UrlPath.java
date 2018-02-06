package net.smart.common.support.api.jenkins;

public enum UrlPath {
    BUILD_WITH_PARAMETER("/job/{jobName}/buildWithParameters?"),
    BUILD("/job/{jobName}/build?");

    private String urlPath;

    UrlPath(String urlPath) {
        this.urlPath = urlPath;
    }

    public String exchange(final String jobName){
        return urlPath.replaceAll("\\{jobName\\}", jobName);
    }
}
