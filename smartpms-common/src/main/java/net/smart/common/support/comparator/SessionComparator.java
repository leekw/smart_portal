package net.smart.common.support.comparator;

import java.util.Comparator;

import net.smart.common.domain.IntUser;

public class SessionComparator implements Comparator<IntUser> {

	@Override
	public int compare(IntUser o1, IntUser o2) {
		return o2.getLoginDate().compareTo(o1.getLoginDate());
	}

}
