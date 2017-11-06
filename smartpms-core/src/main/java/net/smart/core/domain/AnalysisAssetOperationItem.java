package net.smart.core.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AnalysisAssetOperationItem {
    private long analysisAssetOperationItemId;
    private long analysisAssetOperationId;
    private AnalysisAssetOperationItemType itemType;
    private String itemName;
    private int itemOrder;
}
