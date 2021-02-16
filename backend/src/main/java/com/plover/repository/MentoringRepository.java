package com.plover.repository;

import com.plover.model.mentoring.MentoringEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MentoringRepository extends JpaRepository <MentoringEntity,Long>{
    // 리스트
    List<MentoringEntity> findByOrderByIdDesc( Pageable page);
    List<MentoringEntity> findByIdLessThanOrderByIdDesc(Long id, Pageable page);
    boolean existsByIdLessThan(Long lastIdOfList);

    Optional<MentoringEntity> findById(Long id);

    Long countByUserNo(Long no);
}
