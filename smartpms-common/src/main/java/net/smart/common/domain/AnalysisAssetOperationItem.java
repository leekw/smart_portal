package net.smart.common.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnalysisAssetOperationItem {
    private long analysisAssetOperationItemId;
    private long analysisAssetOperationId;
    private AnalysisAssetOperationItemType itemType;
    private String itemName;
    private int itemOrder;
}
