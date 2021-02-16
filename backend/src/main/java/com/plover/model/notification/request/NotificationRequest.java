package com.plover.model.notification.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Setter
@Getter
@ToString
public class NotificationRequest {

    @NotBlank
    private String Token;
    @NotBlank
    private String title;
    @NotBlank
    private String message;
    private String icon;
    private String click_action;
    @NotNull
    private Long from;
    @NotNull
    private Long to;

    @Builder
    public NotificationRequest(@NotBlank String title, @NotBlank String message, String icon, String click_action, @NotNull Long from, @NotNull Long to) {
        this.title = title;
        this.message = message;
        this.icon = icon;
        this.click_action = click_action;
        this.from = from;
        this.to = to;
    }
}
