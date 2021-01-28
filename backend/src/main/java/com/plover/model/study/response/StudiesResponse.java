package com.plover.model.study.response;

import com.plover.model.study.Study;
import lombok.Getter;

import java.util.List;

@Getter
public class StudyResponse {
    List<Study> studies;
    boolean hasNext;

    public StudyResponse(List<Study> studies, boolean hasNext) {
        this.studies = studies;
        this.hasNext = hasNext;
    }
}
