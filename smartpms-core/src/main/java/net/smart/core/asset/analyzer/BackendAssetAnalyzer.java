package net.smart.core.asset.analyzer;

import java.util.List;

import net.smart.core.asset.signature.UnitSignatureConstrutor;
import net.smart.core.domain.Asset;

public class BackendAssetAnalyzer extends AbstractAssetAnalyzer {

	@Override
	protected void constructUnitSignature(List<Asset> assets, String filePath, String type) {
		UnitSignatureConstrutor constructor = super.getUnitSignatureConstrutor(type);
		
		
		
//		constructor.constructSignature(target, asset);
		
	}

	@Override
	protected void parseUnitRelation(List<Asset> assets, String filePath, String type) {
		// TODO Auto-generated method stub
		
	}


	
}
