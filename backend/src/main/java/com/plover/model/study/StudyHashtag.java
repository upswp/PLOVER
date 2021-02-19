package com.plover.model.study;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "hashtag_mapping")
public class StudyHashtag {
    @Id
    @GeneratedValue
    private Long id; // fk 2개로 생기는 복합키의 불편함을 개선하기위해 pk한 개 생성

    @ManyToOne
    @JoinColumn(name = "study_id") // fk컬럼명
    private Study study;

    @ManyToOne
    @JoinColumn(name = "hashtag_id") // fk컬럼명
    private Hashtag hashtag;

    public static StudyHashtag associate(Study study, Hashtag hashtag) {
        StudyHashtag studyHashtag = new StudyHashtag();
        studyHashtag.setHashtag(hashtag);
        studyHashtag.setStudy(study);

        return studyHashtag;
    }

    public void setHashtag(Hashtag hashtag) {
        this.hashtag = hashtag;
    }

    public void setStudy(Study study) {
        this.study = study;
        study.addStudyHashtag(this);
    }

    public boolean containsTag(Hashtag hashtag) {
        return this.hashtag.isSameName(hashtag);
    }
}
