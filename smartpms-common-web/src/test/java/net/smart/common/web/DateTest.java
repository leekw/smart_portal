package net.smart.common.web;

import java.util.Calendar;
import java.util.Locale;

public class DateTest {
	
	public static void main(String[] args) throws Exception {
		Calendar ca = Calendar.getInstance(Locale.KOREA);
		ca.add(Calendar.MONTH, 1);
		//ca.set(Calendar.MONTH, 2 - 1);
		ca.set(Calendar.WEEK_OF_MONTH, 3);
		ca.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
	}

}
