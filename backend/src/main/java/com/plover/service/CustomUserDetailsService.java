package com.plover.service;

import com.plover.model.user.SecurityUser;
import com.plover.model.user.Users;
import com.plover.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class CustomUserDetailsService implements UserDetailsService {
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		Users user = userRepository.findUserByEmail(email);
		if(user == null) {
			throw new UsernameNotFoundException(email +"사용자가 존재하지 않습니다.");
		}
		return new SecurityUser(user);
	}
}
