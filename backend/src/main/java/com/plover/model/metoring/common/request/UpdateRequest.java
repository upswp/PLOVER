package com.plover.model.metoring.common.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
@NoArgsConstructor
@ApiModel(description = "멘토링 수정 공통 모델")
public class UpdateRequest {

    @NotBlank
    @Length(max = 50, message = "제목의 최대 길이는 50자 입니다. ")
    private String title;

    @Email
    @NotBlank
    private String email;

    @ApiModelProperty(value = "멘토링 시작날짜")
    @NotBlank
    private String startDate;

    @ApiModelProperty(value = "멘토링 시작시간")
    @NotBlank
    private String startTime;

    @ApiModelProperty(value = "멘토링 종료날짜")
    @NotBlank
    private String endDate;

    @ApiModelProperty(value = "멘토링 시작시간")
    @NotBlank
    private String endTime;

    @NotBlank
    @Length(max = 1000, message = "내용의 최대 길이는 1000자 입니다.")
    private String content;

    @Column(columnDefinition = "varchar(255) default 'images/mentoring/default-image.png'")
    private String mentoringImageUrl;

    public UpdateRequest(@NotBlank @Length(max = 50, message = "제목의 최대 길이는 50자 입니다. ") String title, @Email @NotBlank String email, @NotBlank String startDate, @NotBlank String startTime, @NotBlank String endDate, @NotBlank String endTime,
                         @NotBlank @Length(max = 1000, message = "내용의 최대 길이는 1000자 입니다.") String content, String mentoringImageUrl) {
        this.title = title;
        this.email = email;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.content = content;
        this.mentoringImageUrl = mentoringImageUrl;
    }
}
