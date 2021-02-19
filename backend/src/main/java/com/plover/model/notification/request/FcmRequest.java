package com.plover.model.notification.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FcmRequest {
    private String Token;
    public FcmRequest(){}
    public FcmRequest(String token) {
        Token = token;
    }
}
