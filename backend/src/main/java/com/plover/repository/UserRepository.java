
package com.plover.repository;

import java.util.Optional;

import com.plover.model.user.Users;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<Users, Long> {
    Optional<Users> findUserByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);
    boolean existsByNickName(String nickName);
	Users findUserByEmail(String email);
	Users findUserByNickName(String nickName);
}
