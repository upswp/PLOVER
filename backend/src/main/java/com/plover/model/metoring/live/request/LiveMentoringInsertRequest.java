package com.plover.model.metoring.live.request;

import com.plover.model.metoring.MentoringEntity;
import com.plover.model.metoring.common.request.InsertRequest;
import io.swagger.annotations.ApiModel;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@ApiModel(description = "라이브 멘토링 등록 모델")
public class LiveMentoringInsertRequest extends InsertRequest {

    @NotBlank
    private String type;

    @NotBlank
    private String address;

    @NotBlank
    private String state;

    public LiveMentoringInsertRequest(@Email(message = "이메일 형식이 아닙니다.") @NotBlank(message = "반드시 입력해주세요") String email, @NotBlank @Length(max = 50, message = "제목의 최대 길이는 50자 입니다.") String title, @NotBlank @Length(max = 1000, message = "내용의 최대 길이는 1000자 입니다.") String content, @NotBlank String startDate, @NotBlank String startTime, @NotBlank String endDate,
                                      @NotBlank String endTime, @NotBlank String type, @NotBlank String address, @NotBlank String state) {
        super(email, title, content, startDate, startTime, endDate, endTime);
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
                .build();
    }
}
