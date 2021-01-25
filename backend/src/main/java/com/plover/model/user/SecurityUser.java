package com.plover.model.user;

import org.springframework.security.core.authority.AuthorityUtils;

public class SecurityUser extends org.springframework.security.core.userdetails.User {
	private static final long serialVersionUiD = 1L;

    public SecurityUser(User user){
        super(user.getEmail(),"{noop}"+ user.getPassword(), AuthorityUtils.createAuthorityList(user.getRole().toString()));
    }
}