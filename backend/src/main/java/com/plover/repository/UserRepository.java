
package com.plover.repository;

import com.plover.model.user.UserDto;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<UserDto, Long> {
    Optional<UserDto> findUserByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);
    boolean existsByNickName(String nickName);
	UserDto findUserByEmail(String email);
	UserDto findUserByNickName(String nickName);
}
