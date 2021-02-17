package com.plover.model.Chat.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatRequest {
    private String toUserNo;
    private String massage;
    private String profileImage;

    public ChatRequest(String toUserNo, String massage, String profileImage) {
        this.toUserNo = toUserNo;
        this.massage = massage;
        this.profileImage = profileImage;
    }
}
