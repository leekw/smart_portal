package net.smart.web.quality.service;

import java.util.Comparator;

import net.smart.web.domain.quality.QualitySummary;

public class QualityRankAscComparator implements Comparator<QualitySummary> {

	@Override
	public int compare(QualitySummary o1, QualitySummary o2) {
		return o1.getTotalScore().compareTo(o2.getTotalScore()) == 0 
				? o1.getPgTotal() > o2.getPgTotal() ? -1 : o1.getPgTotal() < o2.getPgTotal() ? 1:0  
				: o2.getTotalScore().compareTo(o1.getTotalScore());
	}

}
