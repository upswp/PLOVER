
package com.plover.repository;

import com.plover.model.user.Users;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<Users, Long> {
    Optional<Users> findUserByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);
    boolean existsByNickName(String nickName);
	Users findUserByEmail(String email);
	Users findUserByNickName(String nickName);
    Optional<Users> findUserByNo(Long no);

    @Query(value="SELECT * FROM user WHERE role = \"ROLE_USER\" ORDER BY rand()", nativeQuery = true)
    List<Users> findAllByRandom(Pageable pageable);
}
