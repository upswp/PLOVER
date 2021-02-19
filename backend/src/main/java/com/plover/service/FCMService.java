package com.plover.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.WebpushConfig;
import com.google.firebase.messaging.WebpushNotification;
import com.plover.model.notification.Response.NotificationResponse;
import com.plover.model.user.Users;
import com.plover.repository.UserRepository;
import com.plover.utils.CookieUtil;
import com.plover.utils.JwtUtil;
import com.plover.utils.RedisUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.ExecutionException;

@Service
public class FCMService {
    @Autowired
    RedisUtil redisUtil;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    CookieUtil cookieUtil;
    @Autowired
    UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(FCMService.class);
    //TO A0 : type에는 follow넣어 주세요
    //toUser에 user객체 넣어주세요
    //http에는 request받아온거 그대로 넣어주세요.(AccountContoller 참고하면 httpservletRequest 받는법 있음)
    //사용법 : send(setNotification("follow", user, request)); << 이런식으로 사용
    public NotificationResponse setNotification(String type, Users toUser, HttpServletRequest res){
        NotificationResponse notificationResponse = null;
        String token, sender, receiver;

        switch (type) {
            case "follow" :
                //받는 사람 FCM 토큰 redis에서 가지고 오기
                token = redisUtil.getData("FCM_TOKEN_"+toUser.getNo());
                if(token != null) {
                    //보내는 사람 닉네임 가지고 오기
                    sender = jwtUtil.getNickName(cookieUtil.getCookie(res, JwtUtil.ACCESS_TOKEN_NAME).getValue());
                    //받는 사람 닉네임 가지고 오기
                    receiver = toUser.getNickName();
                    notificationResponse = NotificationResponse.builder()
                            .token(token)
                            .title(receiver + "님 PLOVER가 알림을 받아왔어요.")
                            .message(sender + "님이 팔로우를 시작하셨습니다!")
                            .icon("images/plover.png")
                            .click_action("https://plover.co.kr/follow")//TODO : 경로 넣고 action 설정하기 (차후에 해야함)
                            .build();
                }
                else{
                    sender = jwtUtil.getNickName(cookieUtil.getCookie(res, JwtUtil.ACCESS_TOKEN_NAME).getValue());
                    //받는 사람 닉네임 가지고 오기
                    receiver = toUser.getNickName();
                    notificationResponse = NotificationResponse.builder()
                            .token(null)
                            .title(receiver + "님 PLOVER가 알림을 받아왔어요.")
                            .message(sender + "님이 팔로우를 시작하셨습니다!")
                            .icon("images/plover.png")
                            .click_action("https://plover.co.kr/follow")//TODO : 경로 넣고 action 설정하기 (차후에 해야함)
                            .build();
                }
            break;
//            case "mentoring":
//            case "all":
            default:
                break;
        }
        return notificationResponse;
    }

    public void send(NotificationResponse notificationResponse) throws InterruptedException, ExecutionException {

        Message message = Message.builder()
                .setToken(notificationResponse.getToken())
                .setWebpushConfig(WebpushConfig.builder().putHeader("ttl", "300")
                        .setNotification(new WebpushNotification(
                                notificationResponse.getTitle(),
                                notificationResponse.getMessage(),
                                notificationResponse.getIcon()
                        )).build())
                .build();
        String response = FirebaseMessaging.getInstance().sendAsync(message).get();
        logger.info("Sent message: " + response);
    }
}
