package com.plover.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.web.curation.model.user.SecurityUser;
import com.web.curation.model.user.UserDto;
import com.web.curation.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		UserDto user = userRepository.findUserByEmail(email);
		if(user == null) {
			throw new UsernameNotFoundException(email +"사용자가 존재하지 않습니다.");
		}
		return new SecurityUser(user);
	}
}
