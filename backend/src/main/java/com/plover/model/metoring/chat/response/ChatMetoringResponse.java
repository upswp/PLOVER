package com.plover.model.metoring.chat.response;

import com.plover.model.metoring.MentoringEntity;
import com.plover.model.metoring.common.response.MentoringResponse;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class ChatMetoringResponse extends MentoringResponse {

    private String type;

    public ChatMetoringResponse(Long id, String title, String startDate, String startTime,
                                String endDate, String endTime, String content, String type) {
        super(id, title, startDate, startTime, endDate, endTime, content);
        this.type = type;
    }

    public static ChatMetoringResponse of (MentoringEntity mentoring){
        return new ChatMetoringResponse(
                mentoring.getId(),
                mentoring.getTitle(),
                mentoring.getStartDate(),
                mentoring.getStartTime(),
                mentoring.getEndDate(),
                mentoring.getEndTime(),
                mentoring.getContent(),
                mentoring.getType());
    }

    public static List<ChatMetoringResponse> listof(List<MentoringEntity> mentorings){
        List<ChatMetoringResponse> chatMetoringResponseList = new ArrayList<>();

        for (MentoringEntity metoring: mentorings) {
            chatMetoringResponseList.add(of(metoring));
        }
        return chatMetoringResponseList;
    }
}
