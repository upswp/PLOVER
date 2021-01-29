package com.plover.model.study.request;

import com.plover.config.Constant;
import com.plover.model.study.Study;
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
public class StudyRequest {
    @Email(message = "이메일 형식이 유효하지 않습니다.")
    @NotBlank
    private String email;

    @NotBlank
    private String nickName;

    @NotBlank
    @Length(max = 50, message = "제목의 최대 길이는 50자 입니다.")
    private String title;

    @NotBlank
    @Length(max = 1000, message = "내용의 최대 길이는 1000자 입니다.")
    private String content;

    private Set<String> hashtag;

    @Builder
    public StudyRequest(@Email @NotBlank String email, @NotBlank String nickName, @NotBlank String title, @NotBlank String content, @NotBlank Set<String> hashtag) {
        this.email = email;
        this.nickName = nickName;
        this.title = title;
        this.content = content;
        this.hashtag = hashtag;
    }

    public Study toStudy(){
        return Study.builder()
                .email(email)
                .nickName(nickName)
                .title(title)
                .content(content)
                .build();
    }
}
