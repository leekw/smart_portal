package net.smart.core.asset.analyzer;

import java.util.List;

import net.smart.core.asset.parser.UnitParser;
import net.smart.core.asset.signature.UnitSignatureConstrutor;
import net.smart.core.domain.Asset;

import org.springframework.beans.factory.annotation.Autowired;

public abstract class AbstractAssetAnalyzer implements AssetAnalyzer {
	
	
	private UnitSignatureConstrutor constructor;
	
	private List<UnitSignatureConstrutor> constructors;
	
	private UnitParser unitParser;
	
	private List<UnitParser> unitParsers;
	
	@Autowired
	public void setUnitParsers(List<UnitParser> unitParsers) {
		this.unitParsers = unitParsers;
	}
	
	@Autowired
	public void setConstructors(List<UnitSignatureConstrutor> constructors) {
		this.constructors = constructors;
	}
	
	protected final UnitParser getUnitParser(String type) {
		if (unitParsers == null) {
			for (UnitParser obj : unitParsers) {
				if (obj.isSupportType(type)) {
					unitParser = obj;
					return unitParser;
				}
			}
		}
		return null;
	}
	
	protected final UnitSignatureConstrutor getUnitSignatureConstrutor(String type) {
		if (constructor == null) {
			for (UnitSignatureConstrutor obj : constructors) {
				if (obj.isSupportType(type)) {
					constructor = obj;
					return constructor;
				}
			}
		}
		return constructor;
	}
	
	protected abstract void constructUnitSignature(List<Asset> assets, String filePath, String type);
	
	protected abstract void parseUnitRelation(List<Asset> assets, String filePath, String type);
	
	public void analyze(List<Asset> assets, String filePath, String type)  {
		constructUnitSignature(assets, filePath, type);
		parseUnitRelation(assets, filePath, type);
	}
}
