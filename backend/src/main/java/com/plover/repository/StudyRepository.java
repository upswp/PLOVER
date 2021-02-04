package com.plover.repository;

import com.plover.model.study.Study;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.OptionalLong;

public interface StudyRepository extends JpaRepository<Study,Long> {
    List<Study> findByIsNoticeOrderByIdDesc(boolean isNotice, Pageable page);
    List<Study> findByIdLessThanAndIsNoticeOrderByIdDesc(Long id, boolean isNotice, Pageable page);
    boolean existsByIdLessThan(Long id);
    Optional<Study> findById(Long id);
}
