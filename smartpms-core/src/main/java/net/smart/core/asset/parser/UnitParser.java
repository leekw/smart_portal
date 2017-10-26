package net.smart.core.asset.parser;

import net.smart.core.domain.Asset;

public interface UnitParser {
	
	public boolean isSupportType(String type);
	
	public void parseUnitRelation(String target, Asset asset);

}
