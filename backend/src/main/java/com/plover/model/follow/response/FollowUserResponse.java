package com.plover.model.follow.response;

import com.plover.model.user.Users;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class FollowUserResponse {
    private Long no;
    private String nickname;
    private String profileImageUrl;

    public FollowUserResponse(Long no, String nickname, String profileImageUrl) {
        this.no = no;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
    }


    public static FollowUserResponse of(Users followUser) {
        return new FollowUserResponse(followUser.getNo(),followUser.getNickName(),followUser.getProfileImageUrl());
    }

    public static List<FollowUserResponse> listOf(List<Users> followUsers) {
        List<FollowUserResponse> followUserResponses = new ArrayList<>();

        for (Users followUser : followUsers) {
            followUserResponses.add(of(followUser));
        }
        return followUserResponses;
    }
}
