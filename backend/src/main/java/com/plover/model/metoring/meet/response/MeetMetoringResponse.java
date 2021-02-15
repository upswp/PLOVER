package com.plover.model.metoring.meet.response;

import com.plover.model.metoring.MentoringEntity;
import com.plover.model.metoring.common.response.MentoringResponse;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class MeetMetoringResponse extends MentoringResponse {
    private String type;

    private Integer currentPersonnel;

    private Integer maxPersonnel;

    private String place;

    public MeetMetoringResponse(Long id, String title, String startDate, String startTime, String endDate, String endTime, String content, String type, Integer currentPersonnel, Integer maxPersonnel, String place) {
        super(id, title, startDate, startTime, endDate, endTime, content);
        this.type = type;
        this.currentPersonnel = currentPersonnel;
        this.maxPersonnel = maxPersonnel;
        this.place = place;
    }

    public static MeetMetoringResponse of(MentoringEntity mentoring) {
        return new MeetMetoringResponse(
                mentoring.getId(),
                mentoring.getTitle(),
                mentoring.getStartDate(),
                mentoring.getStartTime(),
                mentoring.getEndDate(),
                mentoring.getEndTime(),
                mentoring.getContent(),
                mentoring.getType(),
                mentoring.getCurrentPersonnel(),
                mentoring.getMaxPersonnel(),
                mentoring.getPlace()
        );
    }

    public static List<MeetMetoringResponse> listof(List<MentoringEntity> mentorintg){
        List<MeetMetoringResponse>meetMetoringResponseList = new ArrayList<>();

        for (MentoringEntity metoring: mentorintg) {
            meetMetoringResponseList.add(of(metoring));
        }
        return meetMetoringResponseList;
    }
}
