package com.plover.model.metoring.meet.request;

import com.plover.model.metoring.MentoringEntity;
import com.plover.model.metoring.common.request.InsertRequest;
import io.swagger.annotations.ApiModel;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@ApiModel(description = "만남 멘토링 등록 모델")
public class MeetMentoringInsertRequest extends InsertRequest {

    @NotBlank
    private String type;

    @NotNull
    private int currentPersonnel;

    @NotNull
    private int maxPersonnel;

    @NotBlank
    private String place;

    public MeetMentoringInsertRequest(@Email(message = "이메일 형식이 아닙니다.") @NotBlank(message = "반드시 입력해주세요") String email, @NotBlank @Length(max = 50, message = "제목의 최대 길이는 50자 입니다.") String title, @NotBlank @Length(max = 1000, message = "내용의 최대 길이는 1000자 입니다.") String content,
                                      @NotBlank String startDate, @NotBlank String startTime, @NotBlank String endDate, @NotBlank String endTime, @NotBlank String type, @NotNull int currentPersonnel, @NotNull int maxPersonnel, @NotBlank String place) {
        super(email, title, content, startDate, startTime, endDate, endTime);
        this.type = type;
        this.currentPersonnel = currentPersonnel;
        this.maxPersonnel = maxPersonnel;
        this.place = place;
    }

    public MentoringEntity toMeet() {
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
                .build();
    }
}
