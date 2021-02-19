package com.plover.model.follow.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@ApiModel(description = "팔로우 모델")
public class FollowRequest {
    @ApiModelProperty(value = "팔로잉 당하는 사람의 번호")
    @NotNull(message = "반드시 필요한 값입니다")
    private Long toUserNo;
}
