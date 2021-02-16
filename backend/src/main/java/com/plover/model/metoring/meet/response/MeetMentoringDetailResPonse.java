package com.plover.model.metoring.meet.response;

import com.plover.model.metoring.MentoringEntity;
import com.plover.model.metoring.common.response.DetailResponse;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class MeetMentoringDetailResPonse extends DetailResponse {
    private String type;

    private Integer currentPersonnel;

    private Integer maxPersonnel;

    private String place;

    public MeetMentoringDetailResPonse(String email, String nickName, String title, String content, String startTime,
                                       String endTime, String startDate, String endDate, String mentoringImageUrl,
                                       String type, Integer currentPersonnel, Integer maxPersonnel, String place) {
        super(email, nickName, title, content, startTime, endTime, startDate, endDate, mentoringImageUrl);
        this.type = type;
        this.currentPersonnel = currentPersonnel;
        this.maxPersonnel = maxPersonnel;
        this.place = place;
    }

    public static MeetMentoringDetailResPonse of(MentoringEntity mentoringEntity){
        return new MeetMentoringDetailResPonse(
                mentoringEntity.getUser().getEmail(),
                mentoringEntity.getUser().getNickName(),
                mentoringEntity.getTitle(),
                mentoringEntity.getContent(),
                mentoringEntity.getType(),
                mentoringEntity.getStartTime(),
                mentoringEntity.getStartDate(),
                mentoringEntity.getEndDate(),
                mentoringEntity.getEndDate(),
                mentoringEntity.getPlace(),
                mentoringEntity.getCurrentPersonnel(),
                mentoringEntity.getMaxPersonnel(),
                mentoringEntity.getMentoringImageUrl()
        );
    }
}
