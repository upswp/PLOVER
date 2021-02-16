package com.plover.model.metoring.common.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Setter
@Getter
@ApiModel(description = "멘토링 등록 공통 모델")
public class InsertRequest {

    @ApiModelProperty(value = "작성자 이메일(현재로그인한 사용자)")
    @Email(message = "이메일 형식이 아닙니다.")
    @NotBlank(message = "반드시 입력해주세요")
    private String email;

    @ApiModelProperty(value = "제목")
    @NotBlank
    @Length(max = 50, message = "제목의 최대 길이는 50자 입니다.")
    private String title;

    @ApiModelProperty(value = "내용")
    @NotBlank
    @Length(max = 1000, message = "내용의 최대 길이는 1000자 입니다.")
    private String content;

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

    @Column(columnDefinition = "varchar(255) default 'images/mentoring/default-image.png'")
    private String mentoringImageUrl;

    public InsertRequest(@Email(message = "이메일 형식이 아닙니다.") @NotBlank(message = "반드시 입력해주세요") String email, @NotBlank @Length(max = 50, message = "제목의 최대 길이는 50자 입니다.") String title, @NotBlank @Length(max = 1000, message = "내용의 최대 길이는 1000자 입니다.") String content, @NotBlank String startDate,
                         @NotBlank String startTime, @NotBlank String endDate, @NotBlank String endTime, String mentoringImageUrl) {
        this.email = email;
        this.title = title;
        this.content = content;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.mentoringImageUrl = mentoringImageUrl;
    }
}
