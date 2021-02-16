package com.plover.service;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.plover.model.notification.FirebaseNotification;
import com.plover.model.notification.Notification;
import com.plover.model.notification.Response.NotificationResponse;
import com.plover.model.user.Users;
import com.plover.repository.NotificationRepository;
import com.plover.utils.CookieUtil;
import com.plover.utils.JwtUtil;
import com.plover.utils.RedisUtil;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.List;

@Service
public class NotificationService {
    static final String FCM = "FCM_TOKEN_";
    @Autowired
    RedisUtil redisUtil;
    @Autowired
    CookieUtil cookieUtil;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    NotificationRepository notificationRepository;

    public void registerFCMToken(final String userNo, final String token) {
        redisUtil.setData(FCM+userNo, token);
    }

    public void deleteFCMToken(final String userNo){
        redisUtil.deleteData(FCM+userNo);
    }

    // 메시지 저장
    public void save(final NotificationResponse notificationResponse, final Users fromUser, final Users toUser){
        Notification notification = notificationResponse.toNotification();
        notification.setFromUser(fromUser);
        notification.setToUser(toUser);
        //DB에 noti 저장
        notificationRepository.save(notification);
    }

    public void getNotification(final Long toNo){
        List<Notification> list = notificationRepository.findByToUserNoOrderByCreateDateDesc(toNo);
        for (Notification nt: list) {
            System.out.println(nt.toString());
        }
    }

    public void deleteNotification(final Long no){
        notificationRepository.deleteByNo(no);
    }

    public void postRealTimeDataBase(HttpServletRequest httpServletRequest, NotificationResponse notiResponse){
        Cookie accessToken = cookieUtil.getCookie(httpServletRequest, JwtUtil.ACCESS_TOKEN_NAME);
        String nickName = jwtUtil.getNickName(accessToken.getValue());
        ZonedDateTime nowSeoul = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        LocalDateTime currDate = nowSeoul.toLocalDateTime();

        final FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference ref = database.getReference().child("users").child(nickName);
        DatabaseReference newPostRef = ref.push();
        //TODO : 나중에 바꿔야함(경로)
        newPostRef.setValueAsync(new FirebaseNotification(notiResponse.getMessage(),"https://dev.plover.co.kr/profile","0",currDate.toString()));
    }
}