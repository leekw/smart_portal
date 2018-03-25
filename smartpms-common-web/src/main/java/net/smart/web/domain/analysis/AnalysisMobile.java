package net.smart.web.domain.analysis;


import net.smart.common.domain.Tree;

public class AnalysisMobile extends Tree {

    private long analysisFileNo;
    private String analysisSummary;
    private String analysisContents;
    private String analysisExported;
    private int analysisParentId;
    private int analysisId;

    public long getAnalysisFileNo() {
        return analysisFileNo;
    }

    public void setAnalysisFileNo(long analysisFileNo) {
        this.analysisFileNo = analysisFileNo;
    }

    public String getAnalysisSummary() {
        return analysisSummary;
    }

    public void setAnalysisSummary(String analysisSummary) {
        this.analysisSummary = analysisSummary;
    }

    public String getAnalysisContents() {
        return analysisContents;
    }

    public void setAnalysisContents(String analysisContents) {
        this.analysisContents = analysisContents;
    }

    public int getAnalysisParentId() {
        return analysisParentId;
    }

    public void setAnalysisParentId(int analysisParentId) {
        this.analysisParentId = analysisParentId;
    }

    public int getAnalysisId() {
        return analysisId;
    }

    public void setAnalysisId(int analysisId) {
        this.analysisId = analysisId;
    }

    public String getAnalysisExported() {
        return analysisExported;
    }

    public void setAnalysisExported(String analysisExported) {
        this.analysisExported = analysisExported;
    }
}
