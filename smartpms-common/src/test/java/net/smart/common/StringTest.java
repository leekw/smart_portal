package net.smart.common;

public class StringTest {
	
	public static void main(String[] args) {
		String source = null;
		String oStr = null;
		String nStr = null;
		StringBuffer sb = new StringBuffer();
		int sPos = 0;
		while (true) {
			int pos = source.indexOf(oStr, sPos);
			sb.append(source.substring(sPos, pos));
			sb.append(nStr);
		}
	}
}
