package com.plover.model.Chat;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Chat {
    private String massage;
    private String writerNickName;
    private String profileImage;
    private String sendTime;

    @Builder
    public Chat(String massage, String writerNickName, String profileImage, String sendTime) {
        this.massage = massage;
        this.writerNickName = writerNickName;
        this.profileImage = profileImage;
        this.sendTime = sendTime;
    }
}
