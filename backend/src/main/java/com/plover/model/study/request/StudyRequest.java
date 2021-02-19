package com.plover.model.study.request;

import com.plover.model.study.Study;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import java.util.Set;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@ApiModel(description = "스터디 수정 모델")
public class StudyRequest {

    @ApiModelProperty(value = "제목")
    @NotBlank
    @Length(max = 50, message = "제목의 최대 길이는 50자 입니다.")
    private String title;

    @ApiModelProperty(value = "내용")
    @NotBlank
    @Length(max = 3000, message = "내용의 최대 길이는 3000자 입니다.")
    private String content;

    @ApiModelProperty(value = "해시태그(String)리스트")
    private Set<String> hashtag;

    public StudyRequest(@NotBlank @Length(max = 50, message = "제목의 최대 길이는 50자 입니다.") String title, @NotBlank @Length(max = 3000, message = "내용의 최대 길이는 3000자 입니다.") String content, Set<String> hashtag) {
        this.title = title;
        this.content = content;
        this.hashtag = hashtag;
    }

    public Study toStudy(){
        return Study.builder()
                .title(title)
                .content(content)
                .build();
    }
}
