package com.plover.model.mentoring.chat.request;

import com.plover.model.mentoring.MentoringEntity;
import com.plover.model.mentoring.common.request.InsertRequest;
import io.swagger.annotations.ApiModel;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@ApiModel(description = "채팅 멘토링 등록 모델")
public class ChatMentoringInsertRequest extends InsertRequest {

    @NotBlank
    private String type;

    public ChatMentoringInsertRequest(@Email(message = "이메일 형식이 아닙니다.") @NotBlank(message = "반드시 입력해주세요") String email, @NotBlank @Length(max = 50, message = "제목의 최대 길이는 50자 입니다.") String title, @NotBlank @Length(max = 1000, message = "내용의 최대 길이는 1000자 입니다.") String content, @NotBlank String startDate, @NotBlank String startTime,
                                      @NotBlank String endDate, @NotBlank String endTime, String mentoringImageUrl, @NotBlank String type) {
        super(email, title, content, startDate, startTime, endDate, endTime, mentoringImageUrl);
        this.type = type;
    }

    public MentoringEntity toChat(){
        return MentoringEntity.builder()
                .type(type)
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
