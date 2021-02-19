package com.plover.controller;

import com.plover.model.Response;
import com.plover.model.mentoring.Mentoring;
import com.plover.model.mentoring.request.CommentUpdateRequest;
import com.plover.model.mentoring.request.CommentsRequest;
import com.plover.model.mentoring.response.CommentResponse;
import com.plover.model.user.Users;
import com.plover.service.CommentsService;
import com.plover.service.MentoringService;
import com.plover.service.UserService;
import com.plover.utils.CookieUtil;
import com.plover.utils.JwtUtil;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/comment")
public class CommentController {

    private CommentsService commentService;
    private MentoringService mentoringService;
    private UserService userService;
    private JwtUtil jwtUtil;
    private CookieUtil cookieUtil;

    public CommentController(CommentsService commentService, MentoringService mentoringService, UserService userService, JwtUtil jwtUtil, CookieUtil cookieUtil) {
        this.commentService = commentService;
        this.mentoringService = mentoringService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.cookieUtil = cookieUtil;
    }

    @PostMapping
    @ApiOperation(value = "댓글 등록(로그인필수)", notes = "댓글 정보를 전달받아 댓글을 등록한다.", response = Response.class)
    public Object saveComment(HttpServletRequest request, @Valid @RequestBody CommentsRequest commentsRequest) {
        ResponseEntity response = null;
        try {
            Long no = (long) jwtUtil.getNo(cookieUtil.getCookie(request, JwtUtil.ACCESS_TOKEN_NAME).getValue());
            if (no != null) {
                Users user = userService.findUserByNo(no);
                Mentoring currentMentoring = mentoringService.findById(commentsRequest.getMentoringId());
                Long commentId = commentService.save(user, currentMentoring, commentsRequest);
                final Response result = new Response("success", "댓글을 등록이 성공하였습니다.", commentId);
                response = new ResponseEntity<>(result, HttpStatus.OK);
            } else {
                final Response result = new Response("error", "유효하지 않은 토큰 값입니다.", null);
                response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            final Response result = new Response("error", e.getMessage(), null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @PutMapping("/{commentId}")
    @ApiOperation(value = "댓글 정보 수정(로그인필수)",
            notes = "수정하려는 정보와 댓글의 아이디를 전달 받아 해당 댓글 정보를 수정한다.",
            response = Response.class)
    public Object updateMentoring(HttpServletRequest request, @Valid @RequestBody CommentUpdateRequest commentUpdateRequest) {
        ResponseEntity response = null;

        try {
            Long no = (long) jwtUtil.getNo(cookieUtil.getCookie(request, JwtUtil.ACCESS_TOKEN_NAME).getValue());
            if (no != null) {
                if (no == commentService.findById(commentUpdateRequest.getId()).getUser().getNo()) {
                    CommentResponse commentResponse = commentService.updateComment(commentUpdateRequest);
                    final Response result = new Response("success", "댓글 정보 수정 성공", commentResponse);
                    response = new ResponseEntity<>(result, HttpStatus.OK);
                } else {
                    final Response result = new Response("error", "댓글 정보를 수정할 수 있는 권한이 없습니다.", null);
                    response = new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
                }
            } else {
                final Response result = new Response("error", "유효하지 않은 토큰 값입니다.", null);
                response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            final Response result = new Response("error", "댓글 정보 수정 실패", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @DeleteMapping("/{commentId}")
    @ApiOperation(value = "댓글 삭제(로그인필수)",
            notes = "댓글의 아이디를 전달 받아 해당 게시글을 삭제한다.",
            response = Response.class)
    public Object deleteMentoring(HttpServletRequest request, @PathVariable @NotNull Long commentId) {
        ResponseEntity response = null;
        try {
            Long no = (long) jwtUtil.getNo(cookieUtil.getCookie(request, JwtUtil.ACCESS_TOKEN_NAME).getValue());
            if (no != null) {
                if (no == commentService.findById(commentId).getUser().getNo()) {
                    commentService.deleteComment(commentId);
                    final Response result = new Response("success", "댓글 정보 삭제 성공", null);
                    response = new ResponseEntity<>(result, HttpStatus.OK);
                } else {
                    final Response result = new Response("error", "댓글 정보를 삭제할 수 있는 권한이 없습니다.", null);
                    response = new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
                }
            } else {
                final Response result = new Response("error", "유효하지 않은 토큰 값입니다.", null);
                response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            final Response result = new Response("error", "댓글 정보 삭제 실패", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }
}
