package net.smart.web.domain.analysis;

import java.util.Date;

public class AnalysisSource {

    private long analysisFileNo;
    private String analysisJavaFileName;
    private String analysisJavaOriName;
    private String analysisJavaFilePath;
    private String analysisClassFileName;
    private String analysisClassOriName;
    private String analysisClassFilePath;
    private String analysisDate;
    private String uploadDate;
    private String analysisYn;
    private String etc;
    private int analysisCount;

    public long getAnalysisFileNo() {
        return analysisFileNo;
    }

    public void setAnalysisFileNo(long analysisFileNo) {
        this.analysisFileNo = analysisFileNo;
    }

    public String getAnalysisJavaFileName() {
        return analysisJavaFileName;
    }

    public void setAnalysisJavaFileName(String analysisJavaFileName) {
        this.analysisJavaFileName = analysisJavaFileName;
    }

    public String getAnalysisJavaOriName() {
        return analysisJavaOriName;
    }

    public void setAnalysisJavaOriName(String analysisJavaOriName) {
        this.analysisJavaOriName = analysisJavaOriName;
    }

    public String getAnalysisJavaFilePath() {
        return analysisJavaFilePath;
    }

    public void setAnalysisJavaFilePath(String analysisJavaFilePath) {
        this.analysisJavaFilePath = analysisJavaFilePath;
    }

    public String getAnalysisClassFileName() {
        return analysisClassFileName;
    }

    public void setAnalysisClassFileName(String analysisClassFileName) {
        this.analysisClassFileName = analysisClassFileName;
    }

    public String getAnalysisClassOriName() {
        return analysisClassOriName;
    }

    public void setAnalysisClassOriName(String analysisClassOriName) {
        this.analysisClassOriName = analysisClassOriName;
    }

    public String getAnalysisClassFilePath() {
        return analysisClassFilePath;
    }

    public void setAnalysisClassFilePath(String analysisClassFilePath) {
        this.analysisClassFilePath = analysisClassFilePath;
    }

    public String getAnalysisDate() {
        return analysisDate;
    }

    public void setAnalysisDate(String analysisDate) {
        this.analysisDate = analysisDate;
    }

    public String getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(String uploadDate) {
        this.uploadDate = uploadDate;
    }

    public String getAnalysisYn() {
        return analysisYn;
    }

    public void setAnalysisYn(String analysisYn) {
        this.analysisYn = analysisYn;
    }

    public String getEtc() {
        return etc;
    }

    public void setEtc(String etc) {
        this.etc = etc;
    }

    public int getAnalysisCount() {
        return analysisCount;
    }

    public void setAnalysisCount(int analysisCount) {
        this.analysisCount = analysisCount;
    }
}
