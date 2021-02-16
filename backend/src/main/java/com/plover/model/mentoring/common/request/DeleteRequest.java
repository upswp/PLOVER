package com.plover.model.mentoring.common.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@ApiModel(description = "멘토링 삭제 공통 모델")
public class DeleteRequest {
    @ApiModelProperty(value = "작성자 이메일(현재 로그인한 사용자")
    @Email(message = "이메일 형식이 아닙니다.")
    @NotBlank(message = "반드시 입력해주세요")

    private String email;

    public DeleteRequest(@Email(message = "이메일 형식이 아닙니다.") @NotBlank(message = "반드시 입력해주세요") String email) {
        this.email = email;
    }
}
