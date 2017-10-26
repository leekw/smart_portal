package net.smart.web.quality.dao;

import java.util.List;

import net.smart.web.domain.quality.NotUsedStat;

public interface QualityE2EGovDao {
	
	public List<NotUsedStat> getNotUsedStat(NotUsedStat param);

}
