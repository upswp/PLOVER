package com.plover.model.study.response;

import com.plover.model.study.Study;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@ToString
public class StudyDetailResponse {
    private String nickName;
    private String profileImageUrl;
    private String title;
    private String content;
    private Set<HashtagResponse> hashtags;
    private LocalDateTime createDate;

    public StudyDetailResponse(String nickName, String profileImageUrl,String title, String content, Set<HashtagResponse> hashtags, LocalDateTime createDate) {
        this.nickName = nickName;
        this.profileImageUrl = profileImageUrl;
        this.title = title;
        this.content = content;
        this.hashtags = hashtags;
        this.createDate = createDate;
    }

    public static StudyDetailResponse of(Study study) {
        return new StudyDetailResponse(
                study.getUser().getNickName(),
                study.getUser().getProfileImageUrl(),
                study.getTitle(),
                study.getContent(),
                HashtagResponse.listOf(study.getHashtags()),
                study.getCreateDate()
        );
    }
}
