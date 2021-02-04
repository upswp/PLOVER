package com.plover.model.study.request;

import com.plover.model.study.Study;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@ApiModel(description = "스터디 등록 모델")
public class StudyInsertRequest {
    @ApiModelProperty(value = "작성자이메일(현재로그인한 사용자)")
    @Email(message = "이메일 형식이 아닙니다.")
    @NotBlank(message = "반드시 입력해주세요.")
    private String email;

    @ApiModelProperty(value = "제목")
    @NotBlank
    @Length(max = 50, message = "제목의 최대 길이는 50자 입니다.")
    private String title;

    @ApiModelProperty(value = "내용")
    @NotBlank
    @Length(max = 1000, message = "내용의 최대 길이는 1000자 입니다.")
    private String content;

    @ApiModelProperty(value = "해시태그(String)리스트")
    private Set<String> hashtag;

    @ApiModelProperty(value = "공지사항여부(필수아님)", example = "false")
    private boolean notice; //isNotice라 하면 swagger에서 정상적으로 인식이 안됨.

    public StudyInsertRequest(@Email(message = "이메일 형식이 아닙니다.") @NotBlank(message = "반드시 입력해주세요.") String email, @NotBlank @Length(max = 50, message = "제목의 최대 길이는 50자 입니다.") String title, @NotBlank @Length(max = 1000, message = "내용의 최대 길이는 1000자 입니다.") String content, Set<String> hashtag, boolean notice) {
        this.email = email;
        this.title = title;
        this.content = content;
        this.hashtag = hashtag;
        this.notice = notice;
    }

    public Study toStudy(){
        return Study.builder()
                .title(title)
                .content(content)
                .isNotice(notice)
                .build();
    }
}
