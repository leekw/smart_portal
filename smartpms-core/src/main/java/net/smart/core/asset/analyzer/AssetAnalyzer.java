package net.smart.core.asset.analyzer;

import java.util.List;

import net.smart.core.domain.Asset;

public interface AssetAnalyzer {
	
	public void analyze(List<Asset> assets, String filePath, String type);

}
