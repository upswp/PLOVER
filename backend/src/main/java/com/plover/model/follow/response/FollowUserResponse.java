package com.plover.model.follow.response;

import com.plover.model.user.Users;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class FollowUserResponse {
    private String nickname;
    //TODO : 프로필사진경로 추가

    public FollowUserResponse(String nickname) {
        this.nickname = nickname;
    }

    public static FollowUserResponse of(Users followUser) {
        return new FollowUserResponse(followUser.getNickName());
    }

    public static List<FollowUserResponse> listOf(List<Users> followUsers) {
        List<FollowUserResponse> followUserResponses = new ArrayList<>();

        for (Users followUser : followUsers) {
            followUserResponses.add(of(followUser));
        }
        return followUserResponses;
    }
}
