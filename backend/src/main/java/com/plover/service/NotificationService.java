package com.plover.service;

import com.plover.model.notification.Notification;
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
    public void addNotification(final Notification notification){
        //DB에 noti 저장
        notificationRepository.save(notification);
    }
    public void getNotification(final Long toNo){
        List<Notification> list = notificationRepository.findByToUserNoOrderByCreateDateDesc(toNo);
        for (Notification nt: list) {
            System.out.println(nt.toString());
        }
    }
    public void setNotification(){

    }
    public void deleteNotification(final String notiNo){
        //DB에 저장된 notification 삭제
    }
}