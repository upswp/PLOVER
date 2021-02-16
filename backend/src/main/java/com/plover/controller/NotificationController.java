package com.plover.controller;


import com.plover.model.Response;
import com.plover.model.notification.Response.NotificationResponse;
import com.plover.model.notification.request.FcmRequest;
import com.plover.service.FCMService;
import com.plover.service.NotificationService;
import com.plover.utils.CookieUtil;
import com.plover.utils.JwtUtil;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("notification")
public class NotificationController {
    private static final Logger logger = LoggerFactory.getLogger(NotificationController.class);
    @Autowired
    private CookieUtil cookieUtil;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private NotificationService notificationService;

    @ApiOperation(
            value = "FCM 토큰 등록",
            notes = "로그인 시 FCM 토큰을 전달받아 redis에 저장한다.",
            response = Response.class
    )
    @PostMapping("/registerFCMToken")
    public ResponseEntity registerFCMToken(@RequestBody FcmRequest fcmRequest, HttpServletRequest httpServletRequest) {
        //쿠키에서 엑세스 토큰을 가지고 와서
        Cookie accessToken = cookieUtil.getCookie(httpServletRequest, JwtUtil.ACCESS_TOKEN_NAME);
        logger.info(fcmRequest.getToken());
        //쿠키에 정상적으로 발급된 토큰이 있으면
        if(!jwtUtil.isTokenExpired(accessToken.getValue())){
            //FCM 토큰을 redis에 등록한다.
            notificationService.registerFCMToken(Integer.toString(jwtUtil.getNo(accessToken.getValue())), fcmRequest.getToken());
            return new ResponseEntity<>(new Response("success", "FCM 토큰 등록 성공", null), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(new Response("error", "FCM 토큰 등록 실패", null), HttpStatus.UNAUTHORIZED);
        }
    }
    @PostMapping("/rdbtest")
    public ResponseEntity ddd(@RequestBody NotificationResponse notificationResponse, HttpServletRequest request) {

            notificationService.postRealTimeDataBase(request, notificationResponse);
            return new ResponseEntity<>(new Response("success", "ok", null), HttpStatus.OK);
    }
}