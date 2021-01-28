package com.plover.model.study;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="hashtag")
public class Hashtag {
    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String name;

    // manytomany보다 연결테이블를 entity로 만들어 주는 것이 좋다
    // mappedBy: StudyHashtag의 hashtag와 연결
    @JsonIgnore
    @OneToMany(mappedBy = "hashtag")
    private Set<StudyHashtag> studylist;

    @Builder
    public Hashtag(@NotBlank String name) {
        this.name = name;
    }

    // hashtag.name과 같은 태그 이름이 있는지 판별
    public boolean isSameName(Hashtag hashtag) {
        return this.name.equals(hashtag.name);
    }
}
