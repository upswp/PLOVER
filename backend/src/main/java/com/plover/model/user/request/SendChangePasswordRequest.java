package com.plover.model.user.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SendChangePasswordRequest {
    private String nickName;
    private String email;
}
