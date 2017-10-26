package net.smart.common.domain;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class UserDetail extends User {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3774079162406038374L;
	
	private IntUser intUser;
	
	public UserDetail(String username, String password, IntUser intUser, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
		this.intUser = intUser;
	}

	public UserDetail(String username, String password, IntUser intUser, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired,
			boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
		this.intUser = intUser;
	}

	public IntUser getIntUser() {
		return intUser;
	}

	public void setIntUser(IntUser intUser) {
		this.intUser = intUser;
	}

	

}
