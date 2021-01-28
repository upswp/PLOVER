package com.plover.model.study;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@ToString
@NoArgsConstructor
@Table(name="hashtag_mapping")
public class HashtagMapping {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private Long studyId;

    @NotNull
    private Long hashtagId;

    public HashtagMapping(@NotNull Long studyId, @NotNull Long hashtagId) {
        this.studyId = studyId;
        this.hashtagId = hashtagId;
    }
}
