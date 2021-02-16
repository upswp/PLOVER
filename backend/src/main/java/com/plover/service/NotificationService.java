package com.plover.service;

import com.plover.model.notification.Notification;
import com.plover.model.notification.Response.NotificationResponse;
import com.plover.model.user.Users;
import com.plover.repository.NotificationRepository;
import com.plover.utils.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    static final String FCM = "FCM_TOKEN_";
    @Autowired
    RedisUtil redisUtil;
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
}