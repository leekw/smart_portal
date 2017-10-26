package net.smart.web.support.authentication.token;

import java.util.Collection;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

public class SSOAuthenticationToken extends AbstractAuthenticationToken {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7753912320251858554L;
	private final Object principal;
    private Object credentials;
    private Object clientIP;
    private Object clientMacAddress;
	private boolean ssoMode;
	private Object trustToken;
	private Object ssoToken;
	
	
	public SSOAuthenticationToken(Object principal, Object credentials, boolean ssoMode, Object trustToken, Object ssoToken, Object clientIP, Object clientMacAddress) {
        super(null);
        this.principal = principal;
        this.credentials = credentials;
	    this.ssoMode = ssoMode;
	    this.trustToken = trustToken;
	    this.ssoToken = ssoToken;
        this.clientIP = clientIP;
        this.clientMacAddress = clientMacAddress;
        setAuthenticated(false);
    }
	
	public SSOAuthenticationToken(Object principal, Object credentials, boolean ssoMode, Object trustToken, Object ssoToken, Object clientIP, Object clientMacAddress, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.principal = principal;
        this.credentials = credentials;
	    this.ssoMode = ssoMode;
	    this.trustToken = trustToken;
	    this.ssoToken = ssoToken;
        this.clientIP = clientIP;
        this.clientMacAddress = clientMacAddress;
        setAuthenticated(true); // must use super, as we override
    }

	@Override
	public Object getCredentials() {
		return this.credentials;
	}

	@Override
	public Object getPrincipal() {
		return this.principal;
	}
	
	public boolean isSsoMode() {
		return ssoMode;
	}

	public Object getTrustToken() {
		return trustToken;
	}

	public Object getClientIP() {
		return clientIP;
	}

	public Object getClientMacAddress() {
		return clientMacAddress;
	}
	public Object getSsoToken() {
		return ssoToken;
	}

}
