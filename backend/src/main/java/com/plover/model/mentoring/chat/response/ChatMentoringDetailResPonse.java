package com.plover.model.mentoring.chat.response;

import com.plover.model.mentoring.MentoringEntity;
import com.plover.model.mentoring.common.response.DetailResponse;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ChatMentoringDetailResPonse extends DetailResponse {
    private String type;

    public ChatMentoringDetailResPonse(String email, String nickName, String title, String content,
                                       String startTime, String endTime, String startDate, String endDate,
                                       String mentoringImageUrl, String type) {
        super(email, nickName, title, content, startTime, endTime, startDate, endDate, mentoringImageUrl);
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
                mentoringEntity.getEndDate(),
                mentoringEntity.getMentoringImageUrl()
        );
    }
}
