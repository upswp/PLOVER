package com.plover.model.study.response;

import com.plover.model.study.Study;
import lombok.Getter;

import java.util.List;

@Getter
public class StudyNoticesResponse {
    List<StudyNoticeResponse> studies;
    boolean hasNext;

    public StudyNoticesResponse(List<Study> studies, boolean hasNext) {
        this.studies = StudyNoticeResponse.listOf(studies);
        this.hasNext = hasNext;
    }
}
