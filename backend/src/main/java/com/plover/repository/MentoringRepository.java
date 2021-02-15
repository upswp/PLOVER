package com.plover.repository;

import com.plover.model.metoring.MentoringEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MentoringRepository extends JpaRepository <MentoringEntity,Long>{
    Optional<MentoringEntity> findById(Long id);
}
