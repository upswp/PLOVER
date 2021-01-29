package com.plover.model.study;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.plover.converter.BooleanToYNConverter;
import com.plover.exceptions.ErrorCode;
import com.plover.exceptions.InvalidValueException;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="study")
public class Study {
    @Id
    @GeneratedValue
    private Long id;

    // 본인이 쓴 글인지 대조하기위해 사용
    @ApiModelProperty(required = true)
    @Email
    @NotBlank
    private String email;

    @ApiModelProperty(required = true)
    @NotBlank
    private String nickName;

    @ApiModelProperty(required = true)
    @NotBlank
    private String title;

    @ApiModelProperty(required = true)
    @NotBlank
    private String content;

    // manytomany보다 연결테이블을 entity로 만들어 주는 것이 좋다
    // 효율을 위해 List보다 Set을 사용
    // mappedBy: StudyHashtag의 study와 연결
    // cascade: PERSIST-저장영속성전이
    // orphanRemoval: 삭제시 발생하는 고아객체(참조테이블과의 관계가 끊긴 객체)를 삭제
    // fetch: EAGER-즉시로딩
    @JsonIgnore
    @OneToMany(mappedBy = "study",cascade = CascadeType.PERSIST,orphanRemoval=true,fetch = FetchType.EAGER)
    private Set<StudyHashtag> hashtags = new HashSet<>();

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createDate;

    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updateDate;

    @NotNull
    @Convert(converter = BooleanToYNConverter.class)
    private boolean isNotice;

    @Builder
    public Study(@NotBlank @Email String email, @NotBlank String nickName, @NotBlank String title, @NotBlank String content, @NotNull boolean isNotice) {
        this.email = email;
        this.nickName = nickName;
        this.title = title;
        this.content = content;
        this.isNotice = isNotice();
    }

    public Study update(Study requestStudy, Set<Hashtag> hashtags) {
        updateStudyHashtags(hashtags);

        this.email = requestStudy.email;
        this.nickName = requestStudy.nickName;
        this.title = requestStudy.title;
        this.content = requestStudy.content;

        return this;
    }

    private void updateStudyHashtags(Set<Hashtag> hashtags) {
        this.hashtags.clear();
        for (Hashtag hashtag : hashtags) {
            StudyHashtag.associate(this, hashtag);
        }
    }

    public Set<Hashtag> getHashtags() {
        return hashtags.stream()
                .map(StudyHashtag::getHashtag)
                .collect(Collectors.toSet());
    }

    public void addStudyHashtag(StudyHashtag studyHashtag) {
        if (isContainStudyHashtag(studyHashtag)) {
            throw new InvalidValueException(ErrorCode.TAG_DUPLICATED);
        }
        hashtags.add(studyHashtag);
    }

    private boolean isContainStudyHashtag(StudyHashtag other) {
        // stream().anyMatch(a->b): a의 최소한 한개의 요소가 b 조건에 만족하는지 조사
        return hashtags.stream()
                .anyMatch(hashtags -> hashtags.equals(other));
    }

    public boolean notContainsTag(Hashtag hashtag) {
        return hashtags.stream()
                .noneMatch(hashtags -> hashtags.containsTag(hashtag));
    }
}
