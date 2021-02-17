package com.plover.service;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.plover.controller.AccountController;
import com.plover.model.Chat.Chat;
import com.plover.model.Chat.request.ChatMessageRequest;
import com.plover.model.Chat.request.ChatRequest;
import com.plover.utils.CookieUtil;
import com.plover.utils.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Service
public class ChatService {
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    CookieUtil cookieUtil;
    @Autowired
    UserService userService;

    private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    public void postRealTimeDataBase(ChatRequest chatRequest, HttpServletRequest request){
        //내 no가지고오기
        String fromUserNo = Integer.toString(jwtUtil.getNo(cookieUtil.getCookie(request, JwtUtil.ACCESS_TOKEN_NAME).getValue()));
        //내 닉네임 가지고오기(writer에 들어갈거임)
        String writerNickName = jwtUtil.getNickName(cookieUtil.getCookie(request, JwtUtil.ACCESS_TOKEN_NAME).getValue());
        logger.info("보내는 사람번호는 : "+fromUserNo+" 보내는 사람 이름은 : "+writerNickName);

        ZonedDateTime nowSeoul = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        LocalDateTime currDate = nowSeoul.toLocalDateTime();

        final FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference ref = database.getReference().child("users").child("chat-plover-KKHH");

        DatabaseReference senderRef = ref.child(fromUserNo).child(chatRequest.getToUserNo()).push();
        DatabaseReference receiverRef = ref.child(chatRequest.getToUserNo()).child(fromUserNo).push();

        Chat chat = Chat.builder()
                .massage(chatRequest.getMassage())
                .profileImage(chatRequest.getProfileImage())
                .writerNickName(writerNickName)
                .sendTime(currDate.toString())
                .build();

        senderRef.setValueAsync(chat);
        receiverRef.setValueAsync(chat);
    }

    public void postMessageRealTimeDataBase(ChatMessageRequest chatMessageRequest, HttpServletRequest request){
        Long no = (long)jwtUtil.getNo(cookieUtil.getCookie(request, JwtUtil.ACCESS_TOKEN_NAME).getValue());
        //내 no가지고오기
        String fromUserNo = Long.toString(no);
        //내 닉네임 가지고오기(writer에 들어갈거임)
        String writerNickName = jwtUtil.getNickName(cookieUtil.getCookie(request, JwtUtil.ACCESS_TOKEN_NAME).getValue());
        //내 사진 가지고오기
        String writerProfileImage = userService.findUserByNo(no).getProfileImageUrl();

        logger.info("보내는 사람번호는 : "+fromUserNo+" 보내는 사람 이름은 : "+writerNickName);

        ZonedDateTime nowSeoul = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        LocalDateTime currDate = nowSeoul.toLocalDateTime();

        final FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference ref = database.getReference().child("users").child("chat-plover-KKHH");

        DatabaseReference senderRef = ref.child(fromUserNo).child(chatMessageRequest.getToUserNo()).push();
        DatabaseReference receiverRef = ref.child(chatMessageRequest.getToUserNo()).child(fromUserNo).push();

        Chat chat = Chat.builder()
                .massage(chatMessageRequest.getMassage())
                .profileImage(writerProfileImage)
                .writerNickName(writerNickName)
                .sendTime(currDate.toString())
                .build();

        senderRef.setValueAsync(chat);
        receiverRef.setValueAsync(chat);
    }
}
