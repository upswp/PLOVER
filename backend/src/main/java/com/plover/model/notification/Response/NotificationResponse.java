package com.plover.model.notification.Response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
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
}
