package com.plover.controller;

import com.plover.exceptions.EntityNotFoundException;
import com.plover.model.Response;
import com.plover.model.user.response.ProfileResponse;
import com.plover.model.user.response.UsersResponse;
import com.plover.service.FollowService;
import com.plover.service.MentoringService;
import com.plover.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;

@ApiResponses(value = {
        @ApiResponse(code = 401, message = "Unauthorized", response = Response.class),
        @ApiResponse(code = 403, message = "Forbidden", response = Response.class),
        @ApiResponse(code = 404, message = "Not Found", response = Response.class),
        @ApiResponse(code = 500, message = "Failure", response = Response.class)})

@RestController
@RequestMapping("user")
public class UserController {
    private UserService userService;
    private FollowService followService;
    private MentoringService mentoringService;

    public UserController(UserService userService, FollowService followService, MentoringService mentoringService){
        this.userService = userService;
        this.followService = followService;
        this.mentoringService = mentoringService;
    }

    @GetMapping("/random")
    @ApiOperation(value = "유저 정보를 랜덤하게 반환",
            notes = "랜덤하게 12명의 유저정보를 반환한다",
            response = Response.class)
    public Object getRandomUser() {
        ResponseEntity response = null;
        try{
            UsersResponse usersResponse = userService.getUsersByRandom();
            final Response result = new Response("success", "랜덤유저정보 반환 성공", usersResponse);
            response = new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e){
            final Response result = new Response("error", "랜덤유저정보 반환 실패", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @GetMapping("/{no}")
    @ApiOperation(value = "유저 프로필 정보를 반환",
            notes = "유저 프로필 정보를 반환한다",
            response = Response.class)
    public Object getUserProfile(@PathVariable @NotNull Long no) {
        ResponseEntity response = null;
        try {
            ProfileResponse profileResponse = userService.getUserProfile(no);
            profileResponse.setFollowerNum(followService.getFollowerNum(no));
            profileResponse.setFollowingNum(followService.getFollowingNum(no));
            profileResponse.setArticleNum(mentoringService.getMentoringNum(no));
            final Response result = new Response("success", "프로필유저정보 반환 성공", profileResponse);
            response = new ResponseEntity<>(result, HttpStatus.OK);
        }catch (EntityNotFoundException e) {
            final Response result = new Response("error", e.getMessage(), null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            final Response result = new Response("error", "프로필유저정보 반환 실패", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }
}
