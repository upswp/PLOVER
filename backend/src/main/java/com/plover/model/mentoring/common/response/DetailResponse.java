package com.plover.model.mentoring.common.response;

import io.swagger.annotations.ApiModel;

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
    private String mentoringImageUrl;

    public DetailResponse(String email, String nickName, String title,
                          String content, String startTime, String endTime,
                          String startDate, String endDate, String mentoringImageUrl) {
        this.email = email;
        this.nickName = nickName;
        this.title = title;
        this.content = content;
        this.startTime = startTime;
        this.endTime = endTime;
        this.startDate = startDate;
        this.endDate = endDate;
        this.mentoringImageUrl = mentoringImageUrl;
    }
}
