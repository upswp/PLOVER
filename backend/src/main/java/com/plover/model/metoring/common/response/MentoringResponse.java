package com.plover.model.metoring.common.response;

import com.plover.model.metoring.MentoringEntity;
import com.plover.model.metoring.chat.response.ChatMetoringResponse;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@ApiModel(description = "멘토링 객체 공통")
public class MentoringResponse {
    private Long id;

    private String title;

    private String startDate;

    private String startTime;

    private String endDate;

    private String endTime;

    private String content;

    public MentoringResponse(Long id, String title, String startDate, String startTime, String endDate, String endTime, String content) {
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.content = content;
    }

}
