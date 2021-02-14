package com.plover.model.metoring.request;

import com.plover.model.metoring.Mentoring;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MentoringRequest {


    @NotBlank
    @Length(max = 50, message = "제목의 최대 길이는 50자 입니다. ")
    private String title;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String type;

    @NotBlank
    private String startDate;

    @NotBlank
    private String startTime;

    @NotBlank
    private String endDate;

    @NotBlank
    private String endTime;

    @NotBlank
    @Length(max = 1000, message = "내용의 최대 길이는 1000자 입니다.")
    private String content;

    private Long fileId;

    public Mentoring toMentoring(){
        return Mentoring.builder()
                .title(title)
                .content(content)
                .type(type)
                .startDate(startDate)
                .startTime(startTime)
                .endDate(endDate)
                .endTime(endTime)
                .fileId(fileId)
                .build();
    }

    @Builder

    public MentoringRequest(@NotBlank @Length(max = 50, message = "제목의 최대 길이는 50자 입니다. ") String title, @Email @NotBlank String email, @NotBlank String type, @NotBlank String startDate, @NotBlank String startTime, @NotBlank String endDate, @NotBlank String endTime,
                            @NotBlank @Length(max = 1000, message = "내용의 최대 길이는 1000자 입니다.") String content, Long fileId) {
        this.title = title;
        this.email = email;
        this.type = type;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.content = content;
        this.fileId = fileId;
    }
}
