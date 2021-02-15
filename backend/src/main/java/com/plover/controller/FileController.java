package com.plover.controller;

import com.plover.model.Response;
import com.plover.model.notification.request.FcmRequest;
import com.plover.model.user.Users;
import com.plover.repository.UserRepository;
import com.plover.utils.JwtUtil;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.Date;

@ApiResponses(value = {
        @ApiResponse(code = 401, message = "Unauthorized", response = Response.class),
        @ApiResponse(code = 403, message = "Forbidden", response = Response.class),
        @ApiResponse(code = 404, message = "Not Found", response = Response.class),
        @ApiResponse(code = 500, message = "Failure", response = Response.class)})

@RestController
@RequestMapping("file")
public class FileController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/upload")
    public ResponseEntity upload() {

        return new ResponseEntity<>(new Response("success", "파일 등록 성공", null), HttpStatus.OK);
    }

//    @ApiOperation(value = "이미지 등록", notes = "성공시 200, 실패시 에러를 반환합니다. \n ")
//    @PostMapping("create")
//    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile multipartFile) throws IOException {}
}