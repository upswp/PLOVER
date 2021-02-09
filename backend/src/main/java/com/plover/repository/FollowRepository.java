package com.plover.repository;

import com.plover.model.follow.Follow;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow,Long> {
    // 팔로잉
    List<Follow> findByFromUserNoOrderByIdDesc(Long no, Pageable page);
    List<Follow> findByIdLessThanAndFromUserNoOrderByIdDesc(Long id, Long no, Pageable page);

    // 팔로워
    List<Follow> findByToUserNoOrderByIdDesc(Long no, Pageable page);
    List<Follow> findByIdLessThanAndToUserNoOrderByIdDesc(Long cursorId, Long no, Pageable page);

    Boolean existsByIdLessThan(Long lastIdOfList);
}
