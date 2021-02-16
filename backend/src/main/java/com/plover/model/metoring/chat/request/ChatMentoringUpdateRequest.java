package com.plover.model.metoring.chat.request;

import com.plover.model.metoring.MentoringEntity;
import com.plover.model.metoring.common.request.UpdateRequest;
import io.swagger.annotations.ApiModel;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@ApiModel(description = "채팅 멘토링 수정 모델")
public class ChatMentoringUpdateRequest extends UpdateRequest {
    @NotBlank
    private String type;

    public ChatMentoringUpdateRequest(@NotBlank @Length(max = 50, message = "제목의 최대 길이는 50자 입니다. ") String title, @Email @NotBlank String email, @NotBlank String startDate, @NotBlank String startTime, @NotBlank String endDate, @NotBlank String endTime,
                                      @NotBlank @Length(max = 1000, message = "내용의 최대 길이는 1000자 입니다.") String content, String mentoringImageUrl, @NotBlank String type) {
        super(title, email, startDate, startTime, endDate, endTime, content, mentoringImageUrl);
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
