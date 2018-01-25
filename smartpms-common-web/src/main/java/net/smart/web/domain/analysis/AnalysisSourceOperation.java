package net.smart.web.domain.analysis;

import net.smart.common.domain.Common;


public class AnalysisSourceOperation extends Common {

    private String assetOpName;
    private String assetOpCode;
    private String argumentType;
    private String returnType;
    private int analysisAssetId;





    public String getAssetOpName() {
        return assetOpName;
    }

    public void setAssetOpName(String assetOpName) {
        this.assetOpName = assetOpName;
    }

    public String getAssetOpCode() {
        return assetOpCode;
    }

    public void setAssetOpCode(String assetOpCode) {
        this.assetOpCode = assetOpCode;
    }

    public String getArgumentType() {
        return argumentType;
    }

    public void setArgumentType(String argumentType) {
        this.argumentType = argumentType;
    }

    public String getReturnType() {
        return returnType;
    }

    public void setReturnType(String returnType) {
        this.returnType = returnType;
    }

    public int getAnalysisAssetId() {
        return analysisAssetId;
    }

    public void setAnalysisAssetId(int analysisAssetId) {
        this.analysisAssetId = analysisAssetId;
    }
}
