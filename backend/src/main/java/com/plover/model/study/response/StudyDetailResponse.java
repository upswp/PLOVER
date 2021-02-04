package com.plover.model.study.response;

import com.plover.model.study.Study;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@ToString
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
                study.getUser().getEmail(),
                study.getUser().getNickName(),
                study.getTitle(),
                study.getContent(),
                HashtagResponse.listOf(study.getHashtags()),
                study.getCreateDate()
        );
    }
}
