package com.plover.repository;

import com.plover.model.study.Study;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.OptionalLong;

public interface StudyRepository extends JpaRepository<Study,Long> {
    // 리스트
    List<Study> findByIsNoticeOrderByIdDesc(boolean isNotice, Pageable page);
    List<Study> findByIdLessThanAndIsNoticeOrderByIdDesc(Long id, boolean isNotice, Pageable page);
    // 검색
    List<Study> findByIsNoticeAndTitleContainingOrderByIdDesc(boolean isNotice, String title, Pageable page);
    List<Study> findByIdLessThanAndIsNoticeAndTitleContainingOrderByIdDesc(Long id, boolean isNotice, String title, Pageable page);

    boolean existsByIsNoticeAndIdLessThan(boolean isNotice, Long id);
    boolean existsByisNoticeAndIdLessThanAndTitleContaining(boolean isNotice, Long id, String title);
    Optional<Study> findById(Long id);
}
