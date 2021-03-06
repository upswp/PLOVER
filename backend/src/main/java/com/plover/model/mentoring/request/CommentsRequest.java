package com.plover.model.mentoring.request;

import com.plover.model.mentoring.Comment;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Getter
@ApiModel(description = "댓글 등록 모델")
public class CommentsRequest {
    @ApiModelProperty(value = "내용")
    @NotBlank
    @Length(max = 100, message = "내용의 최대 길이는 100자 입니다.")
    private String content;

    @ApiModelProperty(value = "댓글을 등록하는 멘토링 게시글 아이디")
    @NotNull
    private Long mentoringId;

    public Comment toComment(){
        return Comment.builder()
                .content(content)
                .build();
    }
}
