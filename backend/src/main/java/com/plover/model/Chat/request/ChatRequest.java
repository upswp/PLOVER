package com.plover.model.Chat.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatRequest {
    private String fromUserNo;
    private String toUserNo;
    private String massage;
    private String profileImage;
    private String writerNickName;

    public ChatRequest(String fromUserNo, String toUserNo, String massage, String profileImage, String writerNickName) {
        this.fromUserNo = fromUserNo;
        this.toUserNo = toUserNo;
        this.massage = massage;
        this.profileImage = profileImage;
        this.writerNickName = writerNickName;
    }
}
