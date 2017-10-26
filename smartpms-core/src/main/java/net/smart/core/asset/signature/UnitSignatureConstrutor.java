package net.smart.core.asset.signature;

import net.smart.core.domain.Asset;

public interface UnitSignatureConstrutor {
	
	public boolean isSupportType(String type);
	
	public void constructSignature(String target, Asset asset);

}
