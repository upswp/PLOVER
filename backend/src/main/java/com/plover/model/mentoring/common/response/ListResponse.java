package com.plover.model.mentoring.common.response;

import com.plover.model.mentoring.MentoringEntity;
import io.swagger.annotations.ApiModel;
import lombok.Getter;

import java.util.List;

@Getter
@ApiModel(description = "멘토링 전체 리스트 모델")
public class ListResponse {
    List<MentoringResponse> mentoringResponseList;
    boolean hasNext;

    public ListResponse(List<MentoringEntity> mentoringEntities, boolean hasNext) {
        this.mentoringResponseList = MentoringResponse.listof(mentoringEntities);
        this.hasNext = hasNext;
    }
}
