package com.plover.model.notification.Response;

import com.plover.model.notification.Notification;
import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class NotificationResponse {
    private String token;
    private String title;
    private String message;
    private String icon;
    private String click_action;


    @Builder
    public NotificationResponse(String token, String title, String message, String icon, String click_action) {
        this.token = token;
        this.title = title;
        this.message = message;
        this.icon = icon;
        this.click_action = click_action;
    }

    public Notification toNotification(){
        return new Notification(this.getTitle(),
                this.getMessage(),
                this.getClick_action(),
                0);
    }
}
