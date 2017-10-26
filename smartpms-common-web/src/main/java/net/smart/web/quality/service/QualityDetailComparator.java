package net.smart.web.quality.service;

import java.util.Comparator;

import net.smart.web.domain.quality.QualityProgramType;

public class QualityDetailComparator implements Comparator<QualityProgramType> {

	@Override
	public int compare(QualityProgramType o1, QualityProgramType o2) {
		String temp1 = o1.getModule() + "/" + o1.getFunction() + "/" + o1.getVerifyType();
		String temp2 = o2.getModule() + "/" + o2.getFunction() + "/" + o2.getVerifyType();
		return temp1.compareTo(temp2);
	}

}
