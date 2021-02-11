package com.plover.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.WebpushConfig;
import com.google.firebase.messaging.WebpushNotification;
import com.plover.model.notification.Response.NotificationResponse;
import com.plover.model.notification.request.NotificationRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class FCMService {

    private static final Logger logger = LoggerFactory.getLogger(FCMService.class);

    public void send(final NotificationResponse notificationResponse) throws InterruptedException, ExecutionException {
        logger.info(notificationResponse.getToken());
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
