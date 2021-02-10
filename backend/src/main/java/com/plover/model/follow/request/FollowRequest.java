package com.plover.model.follow.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@ApiModel(description = "팔로우 모델")
public class FollowRequest {
    @ApiModelProperty(value = "팔로잉 당하는 사람의 번호")
    @NotNull(message = "반드시 입력해주세요.")
    private Long toUserNo;

    //TODO:userService에 findUserByNo 추가 후 email삭제
    @ApiModelProperty(value = "팔로잉 당하는 사람의 이메일")
    @Email(message = "이메일 형식이 아닙니다.")
    @NotBlank(message = "반드시 입력해주세요.")
    private String toUserEmail;

}
