package com.plover.controller;

import com.plover.model.Response;
import com.plover.service.FollowService;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@ApiResponses(value = {
        @ApiResponse(code = 401, message = "Unauthorized", response = Response.class),
        @ApiResponse(code = 403, message = "Forbidden", response = Response.class),
        @ApiResponse(code = 404, message = "Not Found", response = Response.class),
        @ApiResponse(code = 500, message = "Failure", response = Response.class)})

@RestController
@RequestMapping("follow")
public class FollowController {
    private FollowService followService;
    public FollowController(FollowService followService){}

//    @PostMapping
//    @ApiOperation(value = "팔로잉/팔로워를 저장",
//    notes = "로그인한 사용자의 email과 팔로우한 사용자의 email을 전달받아 팔로잉/팔로워를 저장한다.",
//    response = Response.class)
//    public Object saveFollow(@Valid @RequestBody FollowRequest followRequest){
//        UserDto from
//    }
}
