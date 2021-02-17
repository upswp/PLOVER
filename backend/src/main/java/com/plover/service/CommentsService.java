package com.plover.service;

import com.plover.exceptions.EntityNotFoundException;
import com.plover.exceptions.ErrorCode;
import com.plover.model.mentoring.Comment;
import com.plover.model.mentoring.Mentoring;
import com.plover.model.mentoring.request.CommentUpdateRequest;
import com.plover.model.mentoring.request.CommentsRequest;
import com.plover.model.mentoring.response.CommentResponse;
import com.plover.model.user.Users;
import com.plover.repository.CommentsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentsService {
    private CommentsRepository commentsRepository;

    public CommentsService(CommentsRepository commentsRepository){
        this.commentsRepository = commentsRepository;
    }


    /*댓글 등록*/
    @Transactional
    public Long save(Users user, Mentoring mentoring, CommentsRequest commentsRequest){
        Comment comment = commentsRequest.toComment();
        comment.setUser(user);
        comment.setMentoring(mentoring);
        commentsRepository.save(comment);
        return comment.getId();
    }


    /*댓글 수정*/
    @Transactional
    public CommentResponse updateComment(CommentUpdateRequest commentUpdateRequest) {
        Comment comment = findById(commentUpdateRequest.getId());
        Comment requestComment = commentUpdateRequest.toComment();

        Comment updateComment = comment.update(requestComment);
        return CommentResponse.of(updateComment);
    }
    public Comment findById(Long id){
        return commentsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.MENTORING_NOT_FOUND));
    }

    /*댓글 삭제*/
    @Transactional
    public void deleteComment(Long id){commentsRepository.deleteById(id);
    }
}
