package net.smart.web.domain.analysis;

import java.util.Date;

public class AnalysisSource {

    private String analysisJavaFileName;
    private String analysisJavaOriName;
    private String analysisJavaFilePath;
    private String analysisClassFileName;
    private String analysisClassOriName;
    private String analysisClassFilePath;
    private String analysisDate;
    private String uploadDate;
    private String analysisYn;
    private String service;
    private String module;
    private String pmd;
    private String fortify;
    private String etc;
    private String reqUser;
    private String mobile;
    private long analysisFileNo;
    private int analysisCount;
    private Date reqDate;

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
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

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public String getPmd() {
        return pmd;
    }

    public void setPmd(String pmd) {
        this.pmd = pmd;
    }

    public String getFortify() {
        return fortify;
    }

    public void setFortify(String fortify) {
        this.fortify = fortify;
    }

    public String getEtc() {
        return etc;
    }

    public void setEtc(String etc) {
        this.etc = etc;
    }

    public String getReqUser() {
        return reqUser;
    }

    public void setReqUser(String reqUser) {
        this.reqUser = reqUser;
    }

    public long getAnalysisFileNo() {
        return analysisFileNo;
    }

    public void setAnalysisFileNo(long analysisFileNo) {
        this.analysisFileNo = analysisFileNo;
    }

    public int getAnalysisCount() {
        return analysisCount;
    }

    public void setAnalysisCount(int analysisCount) {
        this.analysisCount = analysisCount;
    }

    public Date getReqDate() {
        return reqDate;
    }

    public void setReqDate(Date reqDate) {
        this.reqDate = reqDate;
    }
}
