package net.smart.core.asset.signature;

import net.smart.core.asset.util.AssetConstat;
import net.smart.core.domain.Asset;

import org.springframework.stereotype.Service;

@Service
public class JavaSignatureConstrutor implements UnitSignatureConstrutor {

	@Override
	public boolean isSupportType(String type) {
		return AssetConstat.ConstructorType.JAVA.isMatch(type);
	}

	@Override
	public void constructSignature(String target, Asset asset) {
		
		
	}

}
