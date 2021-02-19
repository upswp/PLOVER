package com.plover.model.mentoring.response;

import com.plover.model.mentoring.Mentoring;
import io.swagger.annotations.ApiModel;
import lombok.Getter;

import java.util.List;

@Getter
@ApiModel(description = "멘토링 전체 리스트 모델")
public class MentoringListResponse {
    List<MentoringResponse> mentoringResponseList;
    boolean hasNext;

    public MentoringListResponse(List<Mentoring> mentoringEntities, boolean hasNext) {
        this.mentoringResponseList = MentoringResponse.listof(mentoringEntities);
        this.hasNext = hasNext;
    }
}
