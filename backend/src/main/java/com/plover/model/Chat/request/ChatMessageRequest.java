package com.plover.model.Chat.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatMessageRequest {
    private String toUserNo;
    private String massage;

    public ChatMessageRequest(String toUserNo, String massage) {
        this.toUserNo = toUserNo;
        this.massage = massage;
    }
}
