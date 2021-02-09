package com.plover.controller;

import com.plover.model.Response;
import com.plover.model.follow.request.FollowRequest;
import com.plover.model.follow.response.FollowUsersResponse;
import com.plover.model.user.UserDto;
import com.plover.service.FollowService;
import com.plover.service.UserService;
import com.plover.utils.CookieUtil;
import com.plover.utils.JwtUtil;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import javassist.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@ApiResponses(value = {
        @ApiResponse(code = 401, message = "Unauthorized", response = Response.class),
        @ApiResponse(code = 403, message = "Forbidden", response = Response.class),
        @ApiResponse(code = 404, message = "Not Found", response = Response.class),
        @ApiResponse(code = 500, message = "Failure", response = Response.class)})

@RestController
@RequestMapping("follow")
public class FollowController {
    private FollowService followService;
    private UserService userService;
    private JwtUtil jwtUtil;
    private CookieUtil cookieUtil;

    public FollowController(FollowService followService, UserService userService, JwtUtil jwtUtil, CookieUtil cookieUtil) {
        this.followService = followService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.cookieUtil = cookieUtil;
    }

    @GetMapping("/following/{cursorid}")
    @ApiOperation(value = "팔로잉 목록 조회",
            notes = "마지막 팔로잉 id를 받아(맨처음에는 0) 팔로잉 목록을 조회한다.",
            response = Response.class)
    public Object getFollowing(HttpServletRequest request, @PathVariable @NotNull Long cursorId) {
        ResponseEntity response = null;
        try {
            Long no = jwtUtil.getNo(cookieUtil.getCookie(request, JwtUtil.ACCESS_TOKEN_NAME).getValue());
            FollowUsersResponse followUsersResponse = followService.getFollowingUsers(cursorId,no);
            final Response result = new Response("success", "팔로잉 목록 조회가 완료되었습니다.", followUsersResponse);
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            final Response result = new Response("error", "팔로잉 목록 조회에 실패했습니다.", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @GetMapping("/follower/{cursorid}")
    @ApiOperation(value = "팔로워 목록 조회",
            notes = "마지막 팔로워 id를 받아(맨처음에는 0) 팔로워 목록을 조회한다.",
            response = Response.class)
    public Object getFollower(HttpServletRequest request, @PathVariable @NotNull Long cursorId) {
        ResponseEntity response = null;
        try {
            Long no = jwtUtil.getNo(cookieUtil.getCookie(request, JwtUtil.ACCESS_TOKEN_NAME).getValue());
            FollowUsersResponse followUsersResponse = followService.getFollowerUsers(cursorId,no);
            final Response result = new Response("success", "팔로워 목록 조회가 완료되었습니다.", followUsersResponse);
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            final Response result = new Response("error", "팔로워 목록 조회에 실패했습니다.", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @PostMapping
    @ApiOperation(value = "팔로잉/팔로워를 저장",
            notes = "로그인한 사용자의 email과 팔로우한 사용자의 email을 전달받아 팔로잉/팔로워를 저장한다.",
            response = Response.class)
    public Object saveFollow(@Valid @RequestBody FollowRequest followRequest) {
        ResponseEntity response = null;
        try {
            UserDto fromUser = userService.findUserByEmail(followRequest.getFromEmail());
            UserDto toUser = userService.findUserByEmail(followRequest.getToEmail());
            followService.save(fromUser, toUser);
            final Response result = new Response("sucess", "팔로우를 성공하였습니다.", null);
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } catch (NotFoundException e) {
            final Response result = new Response("error", e.getMessage(), null);
            response = new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            final Response result = new Response("error", "팔로우를 실패했습니다.", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }
}
