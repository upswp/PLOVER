package com.plover.repository;

import com.plover.model.mentoring.Comment;
import com.plover.model.mentoring.Mentoring;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentsRepository extends JpaRepository<Comment,Long> {
    // 리스트
    List<Comment> findByOrderByIdDesc(Pageable page);
    List<Comment> findByIdLessThanOrderByIdDesc(Long id, Pageable page);
    boolean existsByIdLessThan(Long lastIdOfList);

    Optional<Comment> findById(Long id);
}
