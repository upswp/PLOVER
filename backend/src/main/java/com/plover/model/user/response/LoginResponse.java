package com.plover.model.user.response;

import com.plover.model.user.Users;
import lombok.Getter;

@Getter
public class LoginResponse {
    private Long no;
    private String email;
    private String nickName;
    private String profileImageUrl;
    private String accessToken;

    public LoginResponse(Long no, String email, String nickName,String profileImageUrl, String accessToken) {
        this.no = no;
        this.email = email;
        this.nickName = nickName;
        this.profileImageUrl = profileImageUrl;
        this.accessToken = accessToken;
    }

    public static LoginResponse of(Users user, String accessToken){
        return new LoginResponse(user.getNo(),user.getEmail(),user.getNickName(),user.getProfileImageUrl(), accessToken);
    }
}
