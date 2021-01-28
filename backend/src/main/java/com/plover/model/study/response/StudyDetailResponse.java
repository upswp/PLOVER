package com.plover.model.study.response;

import com.plover.model.study.Study;
import lombok.Getter;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
public class StudyDetailResponse {
    private String email;
    private String nickName;
    private String title;
    private String content;
    private Set<HashtagResponse> hashtags;
    private Date createDate;

    public StudyDetailResponse(String email, String nickName, String title, String content, Set<HashtagResponse> hashtags, Date createDate) {
        this.email = email;
        this.nickName = nickName;
        this.title = title;
        this.content = content;
        this.hashtags = hashtags;
        this.createDate = createDate;
    }

    public static StudyDetailResponse of(Study study) {
        return new StudyDetailResponse(
                study.getEmail(),
                study.getNickName(),
                study.getTitle(),
                study.getContent(),
                HashtagResponse.listOf(study.getHashtags()),
                study.getCreateDate()
        );
    }
}
