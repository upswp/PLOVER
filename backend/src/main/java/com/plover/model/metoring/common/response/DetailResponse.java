package com.plover.model.metoring.common.response;

import com.plover.model.metoring.MentoringEntity;
import io.swagger.annotations.ApiModel;

import java.util.Date;

@ApiModel(description = "멘토링 상세보기 공통")
public class DetailResponse {
    private String email;
    private String nickName;
    private String title;
    private String content;
    private String startTime;
    private String endTime;
    private String startDate;
    private String endDate;

    public DetailResponse(String email, String nickName, String title,
                          String content, String startTime, String endTime, String startDate, String endDate) {
        this.email = email;
        this.nickName = nickName;
        this.title = title;
        this.content = content;
        this.startTime = startTime;
        this.endTime = endTime;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
