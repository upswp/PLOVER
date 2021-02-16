package com.plover.model.notification;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class FirebaseNotification {
    private String message;
    private String clickAction;
    private String status;
    private String createDateTime;

    public FirebaseNotification(String message, String clickAction, String status, String createDateTime) {
        this.message = message;
        this.clickAction = clickAction;
        this.status = status;
        this.createDateTime = createDateTime;
    }
}
