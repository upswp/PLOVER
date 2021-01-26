
package com.plover.repository;

import com.plover.model.user.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findUserByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);
    boolean existsByNickName(String nickName);
	User findUserByEmail(String email);
	User findUserByNickName(String nickName);
}
