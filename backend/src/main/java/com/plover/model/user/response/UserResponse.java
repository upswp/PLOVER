package com.plover.model.user.response;

import com.plover.model.user.Users;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class UserResponse {
    private String nickname;
    private String generation;
    //TODO : 프로필사진경로 추가

    public UserResponse(String nickname, String generation) {
        this.nickname = nickname;
        this.generation = generation;
    }

    public static UserResponse of(Users user){
        return new UserResponse(user.getNickName(),user.getGeneration());
    }

    public static List<UserResponse> lisfOf(List<Users> users){
        List<UserResponse> userResponses = new ArrayList<>();

        for (Users user : users){
            userResponses.add(of(user));
        }
        return userResponses;
    }
}
