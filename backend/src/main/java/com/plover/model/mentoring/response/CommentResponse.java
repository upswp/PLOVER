package com.plover.model.mentoring.response;

import com.plover.model.mentoring.Comment;
import com.plover.model.mentoring.Mentoring;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CommentResponse {

    private String nickName;

    private String profileImageUrl;

    private Long mentoringId;

    private Long commentId;

    private String content;

    public CommentResponse(String nickName, String profileImageUrl, Long mentoringId, Long commentId, String content) {
        this.nickName = nickName;
        this.profileImageUrl = profileImageUrl;
        this.mentoringId = mentoringId;
        this.commentId = commentId;
        this.content = content;
    }

    public static CommentResponse of(Comment comment){
        return new CommentResponse(
                comment.getUser().getNickName(),
                comment.getUser().getProfileImageUrl(),
                comment.getMentoring().getId(),
                comment.getId(),
                comment.getContent()
        );
    }

    public static List<CommentResponse> listof(List<Comment> comments){
        List<CommentResponse> commentResponses = new ArrayList<>();

        for (Comment comment: comments) {
            commentResponses.add(of(comment));
        }
        return commentResponses;
    }
}
