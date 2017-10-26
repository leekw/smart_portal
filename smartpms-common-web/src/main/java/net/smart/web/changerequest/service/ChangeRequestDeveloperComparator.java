package net.smart.web.changerequest.service;

import java.util.Comparator;

import net.smart.web.domain.changerequest.ChangeRequestVolume;

public class ChangeRequestDeveloperComparator implements Comparator<ChangeRequestVolume> {

	@Override
	public int compare(ChangeRequestVolume o1, ChangeRequestVolume o2) {
		return o1.getType().compareTo(o2.getType());
	}

}
