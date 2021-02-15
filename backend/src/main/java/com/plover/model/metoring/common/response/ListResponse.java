package com.plover.model.metoring.common.response;

import com.plover.model.metoring.chat.response.ChatMetoringResponse;
import com.plover.model.metoring.live.response.LiveMetoringResponse;
import com.plover.model.metoring.meet.response.MeetMetoringResponse;
import io.swagger.annotations.ApiModel;
import lombok.Getter;

import java.util.List;

@Getter
@ApiModel(description = "멘토링 전체 리스트 모델")
public class ListResponse {
    List<ChatMetoringResponse> chatMentoringListResponseList;
    List<LiveMetoringResponse> liveMetoringResponseList;
    List<MeetMetoringResponse> meetMetoringResponseList;

    public ListResponse(List<ChatMetoringResponse> chatMentoringListResponseList, List<LiveMetoringResponse> liveMetoringResponseList, List<MeetMetoringResponse> meetMetoringResponseList) {
        this.chatMentoringListResponseList = chatMentoringListResponseList;
        this.liveMetoringResponseList = liveMetoringResponseList;
        this.meetMetoringResponseList = meetMetoringResponseList;
    }
}
