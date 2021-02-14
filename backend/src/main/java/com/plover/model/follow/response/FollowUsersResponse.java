package com.plover.model.follow.response;

import com.plover.model.user.Users;
import lombok.Getter;

import java.util.List;

@Getter
public class FollowUsersResponse {
    List<FollowUserResponse> followUsers;
    boolean hasNext;

    public FollowUsersResponse(List<Users> followUsers, boolean hasNext) {
        this.followUsers = FollowUserResponse.listOf(followUsers);
        this.hasNext = hasNext;
    }
}
