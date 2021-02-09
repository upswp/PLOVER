package com.plover.model.study.response;

import com.plover.model.study.Study;
import lombok.Getter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
public class StudyNoticeResponse {
    private Long id;

    private String title;

    public StudyNoticeResponse(Long id, String title) {
        this.id = id;
        this.title = title;
    }

    public static StudyNoticeResponse of(Study study) {
        return new StudyNoticeResponse(study.getId(), study.getTitle());
    }

    public static List<StudyNoticeResponse> listOf(List<Study> studies) {
        List<StudyNoticeResponse> studyNoticeResponses = new ArrayList<>();

        for (Study study : studies) {
            studyNoticeResponses.add(of(study));
        }
        return studyNoticeResponses;
    }
}
