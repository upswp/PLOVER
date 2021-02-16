package com.plover.model.user.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@ApiModel(description = "유저 자기소개 모델")
@Getter
public class DescriptionRequest {
    @ApiModelProperty(value = "자기소개 내용")
    @NotNull(message = "자기소개는 null값일 수 없습니다.")
    private String description;
}
