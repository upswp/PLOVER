package com.plover.repository;

import com.plover.model.mentoring.Mentoring;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MentoringRepository extends JpaRepository <Mentoring,Long>{
    // 리스트
    List<Mentoring> findByOrderByIdDesc(Pageable page);
    List<Mentoring> findByIdLessThanOrderByIdDesc(Long id, Pageable page);
    boolean existsByIdLessThan(Long lastIdOfList);

    Optional<Mentoring> findById(Long id);

    Long countByUserNo(Long no);
}
