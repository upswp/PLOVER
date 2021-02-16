package com.plover.model.mentoring.meet.request;

import com.plover.model.mentoring.MentoringEntity;
import com.plover.model.mentoring.common.request.UpdateRequest;
import io.swagger.annotations.ApiModel;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@ApiModel(description = "라이브 멘토링 수정 모델")
public class MeetMentoringUpdateRequest extends UpdateRequest {
    @NotBlank
    private String type;

    @NotBlank
    private Integer currentPersonnel;

    @NotBlank
    private Integer maxPersonnel;

    @NotBlank
    private String place;

    public MeetMentoringUpdateRequest(@NotBlank @Length(max = 50, message = "제목의 최대 길이는 50자 입니다. ") String title,
                                      @Email @NotBlank String email, @NotBlank String startDate, @NotBlank String startTime,
                                      @NotBlank String endDate, @NotBlank String endTime, @NotBlank @Length(max = 1000, message = "내용의 최대 길이는 1000자 입니다.") String content,
                                      String mentoringImageUrl, @NotBlank String type, @NotBlank Integer currentPersonnel, @NotBlank Integer maxPersonnel, @NotBlank String place) {
        super(title, email, startDate, startTime, endDate, endTime, content, mentoringImageUrl);
        this.type = type;
        this.currentPersonnel = currentPersonnel;
        this.maxPersonnel = maxPersonnel;
        this.place = place;
    }

    public MentoringEntity toMeet(){
        return MentoringEntity.builder()
                .type(type)
                .currentPersonnel(currentPersonnel)
                .maxPersonnel(maxPersonnel)
                .place(place)
                .title(getTitle())
                .startDate(getStartDate())
                .endDate(getEndDate())
                .startTime(getStartTime())
                .endTime(getEndTime())
                .content(getContent())
                .mentoringImageUrl(getMentoringImageUrl())
                .build();
    }
}
