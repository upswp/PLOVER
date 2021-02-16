package com.plover.model.metoring.live.response;

import com.plover.model.metoring.MentoringEntity;
import com.plover.model.metoring.common.response.DetailResponse;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@ToString
public class LiveMentoringDetailResPonse extends DetailResponse {

    private String type;

    private String address;

    private String state;

    public LiveMentoringDetailResPonse(String email, String nickName, String title, String content, String startTime, String endTime,
                                       String startDate, String endDate, String mentoringImageUrl, String type, String address, String state) {
        super(email, nickName, title, content, startTime, endTime, startDate, endDate, mentoringImageUrl);
        this.type = type;
        this.address = address;
        this.state = state;
    }

    public static LiveMentoringDetailResPonse of(MentoringEntity mentoringEntity){
        return new LiveMentoringDetailResPonse(
                mentoringEntity.getUser().getEmail(),
                mentoringEntity.getUser().getNickName(),
                mentoringEntity.getTitle(),
                mentoringEntity.getContent(),
                mentoringEntity.getType(),
                mentoringEntity.getStartTime(),
                mentoringEntity.getStartDate(),
                mentoringEntity.getEndDate(),
                mentoringEntity.getEndDate(),
                mentoringEntity.getAddress(),
                mentoringEntity.getState(),
                mentoringEntity.getMentoringImageUrl()
        );
    }
}
