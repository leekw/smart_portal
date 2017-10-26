package net.smart.common;

import net.smart.common.support.security.StringEncrypter;

import org.junit.Test;

public class SecurityTest {
	
	@Test
	public void testSecurity() throws Exception {
		StringEncrypter ss = new StringEncrypter(false);
		try {
			String eValue = ss.encrypt("new1234!");
			System.out.print(" encription :" +  eValue + "\n");
			String dValue = ss.decrypt(eValue);
			System.out.println(" decription :" + dValue);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
