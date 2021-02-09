package com.plover.model.follow.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@ApiModel(description = "팔로우 모델")
public class FollowRequest {
    @ApiModelProperty(value = "팔로우를 누른 사람 이메일(현재로그인한 사용자)")
    @Email(message = "이메일 형식이 아닙니다.")
    @NotBlank(message = "반드시 입력해주세요.")
    private String fromEmail;

    @ApiModelProperty(value = "팔로잉 당하는 사람")
    @Email(message = "이메일 형식이 아닙니다.")
    @NotBlank(message = "반드시 입력해주세요.")
    private String toEmail;
}
