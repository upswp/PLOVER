package com.plover.model.study.response;

import com.plover.model.study.Hashtag;
import com.plover.model.study.Study;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
public class StudyResponse {
    private Long id;

    private String title;

    private Set<HashtagResponse> hashtags;

    public StudyResponse(Long id, String title, Set<HashtagResponse> hashtags) {
        this.id = id;
        this.title = title;
        this.hashtags = hashtags;
    }

    public static StudyResponse of(Study study) {
        return new StudyResponse(study.getId(), study.getTitle(),
                HashtagResponse.listOf(study.getHashtags()));
    }

    public static List<StudyResponse> listOf(List<Study> studies) {
        List<StudyResponse> studyResponses = new ArrayList<>();

        for (Study study : studies) {
            studyResponses.add(of(study));
        }
        return studyResponses;
    }
}
