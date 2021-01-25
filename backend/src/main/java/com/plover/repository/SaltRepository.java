package com.plover.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.curation.model.Salt;

public interface SaltRepository extends JpaRepository<Salt, Long> {

}
