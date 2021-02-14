package com.plover.repository;

import com.plover.model.user.Salt;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SaltRepository extends JpaRepository<Salt, Long> {

}
