package com.plover.model.study.response;

import com.plover.model.study.Study;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
public class StudyNoticeResponse {
    private Long id;

    private String title;

    private String date;

    public StudyNoticeResponse(Long id, String title, LocalDateTime createDate) {
        this.id = id;
        this.title = title;
        this.date = countDay(createDate);
    }

    public static StudyNoticeResponse of(Study study) {
        return new StudyNoticeResponse(study.getId(), study.getTitle(),study.getCreateDate());
    }

    public static List<StudyNoticeResponse> listOf(List<Study> studies) {
        List<StudyNoticeResponse> studyNoticeResponses = new ArrayList<>();

        for (Study study : studies) {
            studyNoticeResponses.add(of(study));
        }
        return studyNoticeResponses;
    }
    public static String countDay(LocalDateTime createDate){
        ZonedDateTime nowSeoul = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        LocalDateTime currDate = nowSeoul.toLocalDateTime();

        StringBuilder period_s = new StringBuilder();
        long period = 0;
        if((period=createDate.until(currDate, ChronoUnit.YEARS))>0){
            period_s.append(period).append("년전");
        }else if((period=createDate.until(currDate, ChronoUnit.MONTHS))>0){
            period_s.append(period).append("달전");
        }else if((period=createDate.until(currDate, ChronoUnit.DAYS))>0){
            period_s.append(period).append("일전");
        }else if((period=createDate.until(currDate, ChronoUnit.HOURS))>0){
            period_s.append(period).append("시간전");
        }else if((period=createDate.until(currDate, ChronoUnit.MINUTES))>0){
            period_s.append(period).append("분전");
        }else{
            period = createDate.until(currDate,ChronoUnit.SECONDS);
            period_s.append(period).append("초전");
        }
        return period_s.toString();
    }
}
