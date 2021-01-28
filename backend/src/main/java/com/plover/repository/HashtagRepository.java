package com.plover.repository;

import com.plover.model.study.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface HashtagRepository extends JpaRepository<Hashtag,Long> {
    List<Hashtag> findByNameIn(Set<String> names);
}
