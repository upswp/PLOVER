package com.plover.model.study.request;

import com.plover.model.study.Study;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@ApiModel(description = "스터디 수정 모델")
public class StudyDeleteRequest {
    @ApiModelProperty(value = "작성자이메일(현재로그인한 사용자)")
    @Email(message = "이메일 형식이 아닙니다.")
    @NotBlank(message = "반드시 입력해주세요.")
    private String email;

    public StudyDeleteRequest(@Email(message = "이메일 형식이 아닙니다.") @NotBlank(message = "반드시 입력해주세요.") String email) {
        this.email = email;
    }
}
