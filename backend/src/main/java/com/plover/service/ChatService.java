package com.plover.service;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.plover.controller.AccountController;
import com.plover.model.Chat.Chat;
import com.plover.model.Chat.request.ChatRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Service
public class ChatService {
    private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    public void postRealTimeDataBase(ChatRequest chatRequest){
        ZonedDateTime nowSeoul = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        LocalDateTime currDate = nowSeoul.toLocalDateTime();

        final FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference ref = database.getReference().child("users").child("chat");

        DatabaseReference senderRef = ref.child(chatRequest.getFromUserNo()).child(chatRequest.getToUserNo()).push();
        DatabaseReference receiverRef = ref.child(chatRequest.getToUserNo()).child(chatRequest.getFromUserNo()).push();

        Chat chat = Chat.builder()
                .massage(chatRequest.getMassage())
                .profileImage(chatRequest.getProfileImage())
                .writerNickName(chatRequest.getWriterNickName())
                .sendTime(currDate.toString())
                .build();
        senderRef.setValueAsync(chat);
        receiverRef.setValueAsync(chat);
    }
}
