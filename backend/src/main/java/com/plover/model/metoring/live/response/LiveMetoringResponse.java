package com.plover.model.metoring.live.response;


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
public class LiveMetoringResponse extends MentoringResponse {
    private String type;

    private String address;

    private String state;

    public LiveMetoringResponse(Long id, String title, String startDate, String startTime,
                                String endDate, String endTime, String content, String type,
                                String address, String state) {
        super(id, title, startDate, startTime, endDate, endTime, content);
        this.type = type;
        this.address = address;
        this.state = state;
    }

    public static LiveMetoringResponse of(MentoringEntity mentoring){
        return new LiveMetoringResponse(
                mentoring.getId(),
                mentoring.getTitle(),
                mentoring.getStartDate(),
                mentoring.getStartTime(),
                mentoring.getEndDate(),
                mentoring.getEndTime(),
                mentoring.getContent(),
                mentoring.getType(),
                mentoring.getAddress(),
                mentoring.getAddress()
        );
    }

    public static List<LiveMetoringResponse> listof(List<MentoringEntity> mentoring){
        List<LiveMetoringResponse> liveMetoringResponseList = new ArrayList<>();

        for (MentoringEntity metoring: mentoring) {
            liveMetoringResponseList.add(of(metoring));
        }
        return liveMetoringResponseList;
    }
}
