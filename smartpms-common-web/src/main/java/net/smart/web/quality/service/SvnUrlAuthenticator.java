package net.smart.web.quality.service;

import java.net.Authenticator;
import java.net.PasswordAuthentication;

public class SvnUrlAuthenticator extends Authenticator  {
	
	public final PasswordAuthentication authentication;
	
	public SvnUrlAuthenticator(String userName, String password) {
		authentication = new PasswordAuthentication(userName, password.toCharArray());
	}
	
}
