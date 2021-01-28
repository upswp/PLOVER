package com.plover.repository;

import com.plover.model.study.Study;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study,Long> {
    List<Study> findByNoticeIsTrueOrderByIdDesc(boolean isNotice, Pageable page);
    List<Study> findByIdLessThanAndNoticeIsTrueOrderByIdDesc(Long id, boolean isNotice, Pageable page);
    boolean existsByIdLessThan(Long id);
    Optional<Study> findById(Long id);
}
