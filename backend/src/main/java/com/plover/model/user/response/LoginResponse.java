package com.plover.model.user.response;

import com.plover.model.user.Users;
import lombok.Getter;

@Getter
public class LoginResponse {
    private Long no;
    private String email;
    private String nickName;
    private String profileImageUrl;

    public LoginResponse(Long no, String email, String nickName,String profileImageUrl) {
        this.no = no;
        this.email = email;
        this.nickName = nickName;
        this.profileImageUrl = profileImageUrl;
    }

    public static LoginResponse of(Users user){
        return new LoginResponse(user.getNo(),user.getEmail(),user.getNickName(),user.getProfileImageUrl());
    }
}
