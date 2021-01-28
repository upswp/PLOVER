package com.plover.model.study.response;

import com.plover.model.study.Study;
import lombok.Getter;

import java.util.List;

@Getter
public class StudiesResponse {
    List<StudyResponse> studies;
    boolean hasNext;

    public StudiesResponse(List<Study> studies, boolean hasNext) {
        this.studies = StudyResponse.listOf(studies);
        this.hasNext = hasNext;
    }
}
