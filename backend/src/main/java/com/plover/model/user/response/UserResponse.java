package com.plover.model.user.response;

import com.plover.model.user.Users;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class UserResponse {
    private String nickName;
    private String generation;
    private String profileImageUrl;

    public UserResponse(String nickName, String generation, String profileImageUrl) {
        this.nickName = nickName;
        this.generation = generation;
        this.profileImageUrl = profileImageUrl;
    }

    public static UserResponse of(Users user){
        return new UserResponse(user.getNickName(),user.getGeneration(),user.getProfileImageUrl());
    }

    public static List<UserResponse> lisfOf(List<Users> users){
        List<UserResponse> userResponses = new ArrayList<>();

        for (Users user : users){
            userResponses.add(of(user));
        }
        return userResponses;
    }
}
