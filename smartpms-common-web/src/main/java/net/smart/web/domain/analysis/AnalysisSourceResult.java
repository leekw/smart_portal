package net.smart.web.domain.analysis;

import net.smart.common.domain.Tree;

public class AnalysisSourceResult extends Tree {

    private long analysisAssetId;
    private String assetName;
    private String assetSourceFullPath;
    private String sourceAsset;
    private String targetAsset;
    private String module;
    private String pmd;
    private String fortify;
    private String etc;
    private String reqUser;
    private long analysisFileNo;
    private String service;
    private String relationType;

    public String getRelationType() {
        return relationType;
    }

    public void setRelationType(String relationType) {
        this.relationType = relationType;
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

    public String getAssetName() {
        return assetName;
    }

    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }

    public String getAssetSourceFullPath() {
        return assetSourceFullPath;
    }

    public void setAssetSourceFullPath(String assetSourceFullPath) {
        this.assetSourceFullPath = assetSourceFullPath;
    }

    public long getAnalysisAssetId() {
        return analysisAssetId;
    }

    public void setAnalysisAssetId(long analysisAssetId) {
        this.analysisAssetId = analysisAssetId;
    }

    public String getSourceAsset() {
        return sourceAsset;
    }

    public void setSourceAsset(String sourceAsset) {
        this.sourceAsset = sourceAsset;
    }

    public String getTargetAsset() {
        return targetAsset;
    }

    public void setTargetAsset(String targetAsset) {
        this.targetAsset = targetAsset;
    }
}
