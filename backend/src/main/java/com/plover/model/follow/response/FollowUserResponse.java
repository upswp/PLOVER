package com.plover.model.follow.response;

import com.plover.model.user.UserDto;
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

    public static FollowUserResponse of(UserDto followUser) {
        return new FollowUserResponse(followUser.getNickName());
    }

    public static List<FollowUserResponse> listOf(List<UserDto> followUsers) {
        List<FollowUserResponse> followUserResponses = new ArrayList<>();

        for (UserDto followUser : followUsers) {
            followUserResponses.add(of(followUser));
        }
        return followUserResponses;
    }
}
