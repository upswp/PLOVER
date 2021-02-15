package com.plover.model.metoring.chat.response;

import com.plover.model.metoring.MentoringEntity;
import com.plover.model.metoring.common.BaseTimeEntity;
import com.plover.model.metoring.common.response.DetailResponse;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;

@Getter
@ToString
public class ChatMentoringDetailResPonse extends DetailResponse {
    private String type;

    public ChatMentoringDetailResPonse(String email, String nickName, String title, String content,
                                       String startTime, String endTime, String startDate, String endDate, String type) {
        super(email, nickName, title, content, startTime, endTime, startDate, endDate);
        this.type = type;
    }

    public static ChatMentoringDetailResPonse of(MentoringEntity mentoringEntity){
        return new ChatMentoringDetailResPonse(
                mentoringEntity.getUser().getEmail(),
                mentoringEntity.getUser().getNickName(),
                mentoringEntity.getTitle(),
                mentoringEntity.getContent(),
                mentoringEntity.getType(),
                mentoringEntity.getStartTime(),
                mentoringEntity.getStartDate(),
                mentoringEntity.getEndDate(),
                mentoringEntity.getEndDate()
        );
    }
}
