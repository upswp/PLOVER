package com.plover.model.follow.response;

import com.plover.model.follow.Follow;
import lombok.Getter;

import java.util.List;

@Getter
public class FollowsResponse {
    List<FollowResponse> follows;
    boolean hasNext;

    public FollowsResponse(List<Follow> follows, boolean hasNext) {
        this.follows = FollowResponse.listOf(follows);
        this.hasNext = hasNext;
    }
}
