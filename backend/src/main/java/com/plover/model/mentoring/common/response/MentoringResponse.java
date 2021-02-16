package com.plover.model.mentoring.common.response;

import com.plover.model.mentoring.MentoringEntity;
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

    private String mentoringImageUrl;

    private String title;

    private String startDate;

    private String startTime;

    private String endDate;

    private String endTime;

    private String content;

    private String type;

    private String address;

    private String state;

    private Integer currentPersonnel;

    private Integer maxPersonnel;

    private String place;

    public static MentoringResponse of(MentoringEntity mentoringEntity){
        return new MentoringResponse(
                mentoringEntity.getId(),
                mentoringEntity.getTitle(),
                mentoringEntity.getStartDate(),
                mentoringEntity.getStartTime(),
                mentoringEntity.getEndDate(),
                mentoringEntity.getStartTime(),
                mentoringEntity.getContent(),
                mentoringEntity.getEndDate(),
                mentoringEntity.getAddress(),
                mentoringEntity.getState(),
                mentoringEntity.getPlace(),
                mentoringEntity.getCurrentPersonnel(),
                mentoringEntity.getMaxPersonnel(),
                mentoringEntity.getMentoringImageUrl()
        );
    }

    public MentoringResponse(Long id, String mentoringImageUrl, String title, String startDate,
                             String startTime, String endDate, String endTime, String content,
                             String type, String address, String state, Integer currentPersonnel,
                             Integer maxPersonnel, String place) {
        this.id = id;
        this.mentoringImageUrl = mentoringImageUrl;
        this.title = title;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.content = content;
        this.type = type;
        this.address = address;
        this.state = state;
        this.currentPersonnel = currentPersonnel;
        this.maxPersonnel = maxPersonnel;
        this.place = place;
    }

    public static List<MentoringResponse> listof(List<MentoringEntity> mentorings){
        List<MentoringResponse> mentoringResponses = new ArrayList<>();

        for (MentoringEntity metoring: mentorings) {
            mentoringResponses.add(of(metoring));
        }
        return mentoringResponses;
    }
}
