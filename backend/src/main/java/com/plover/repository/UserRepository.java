
package com.plover.repository;

import java.util.Optional;
import com.web.curation.model.user.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserDto, Long> {
    Optional<UserDto> findUserByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);
    boolean existsByNickName(String nickName);
	UserDto findUserByEmail(String email);
	UserDto findUserByNickName(String nickName);
}
