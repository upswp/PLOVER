package com.plover.model.mentoring.live.request;

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
public class LiveMentoringUpdateRequest extends UpdateRequest {
    @NotBlank
    private String type;

    @NotBlank
    private String address;

    @NotBlank
    private String state;

    public LiveMentoringUpdateRequest(@NotBlank @Length(max = 50, message = "제목의 최대 길이는 50자 입니다. ") String title, @Email @NotBlank String email, @NotBlank String startDate, @NotBlank String startTime, @NotBlank String endDate, @NotBlank String endTime, @NotBlank @Length(max = 1000, message = "내용의 최대 길이는 1000자 입니다.") String content,
                                      String mentoringImageUrl, @NotBlank String type, @NotBlank String address, @NotBlank String state) {
        super(title, email, startDate, startTime, endDate, endTime, content, mentoringImageUrl);
        this.type = type;
        this.address = address;
        this.state = state;
    }

    public MentoringEntity toLive(){
        return MentoringEntity.builder()
                .type(type)
                .address(address)
                .state(state)
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
