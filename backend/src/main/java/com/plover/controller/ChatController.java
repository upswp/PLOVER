package com.plover.controller;

import com.plover.model.Chat.request.ChatMessageRequest;
import com.plover.model.Chat.request.ChatRequest;
import com.plover.model.Response;
import com.plover.service.ChatService;
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

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("chat")
public class ChatController {
    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);
    @Autowired
    ChatService chatService;

    @PostMapping("/send")
    @ApiOperation(value = "메세지 보내기",  notes = "1:1 메세지를 보냄", response = Response.class)
    public Object send(@RequestBody ChatRequest chatRequest,HttpServletRequest request) {


        if(chatRequest!=null){
            chatService.postRealTimeDataBase(chatRequest, request);
            return new ResponseEntity<>(new Response("success", "메세지 전송 성공", null), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(new Response("error", "메세지 전송 실패", null), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/message/send")
    @ApiOperation(value = "메세지 보내기",  notes = "1:1 메세지를 보냄", response = Response.class)
    public Object sendMessage(@RequestBody ChatMessageRequest chatMessageRequest, HttpServletRequest request) {
        if(chatMessageRequest !=null){
            chatService.postMessageRealTimeDataBase(chatMessageRequest, request);
            return new ResponseEntity<>(new Response("success", "메세지 전송 성공", null), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(new Response("error", "메세지 전송 실패", null), HttpStatus.BAD_REQUEST);
        }
    }
}
