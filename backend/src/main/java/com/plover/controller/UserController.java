package com.plover.controller;

import com.plover.model.Response;
import com.plover.model.user.response.UsersResponse;
import com.plover.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@ApiResponses(value = {
        @ApiResponse(code = 401, message = "Unauthorized", response = Response.class),
        @ApiResponse(code = 403, message = "Forbidden", response = Response.class),
        @ApiResponse(code = 404, message = "Not Found", response = Response.class),
        @ApiResponse(code = 500, message = "Failure", response = Response.class)})

@RestController
@RequestMapping("user")
public class UserController {
    private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/random")
    @ApiOperation(value = "유저 정보를 랜덤하게 가져온다",
            notes = "랜덤하게 12명의 유저정보를 반환한다.",
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
}
