package com.plover.service;

import com.plover.model.follow.Follow;
import com.plover.model.user.UserDto;
import com.plover.repository.FollowRepository;
import org.springframework.stereotype.Service;

@Service
public class FollowService {
    private FollowRepository followRepository;
    public FollowService(FollowRepository followRepository){
        this.followRepository = followRepository;
    }

    public Long save(UserDto fromUser, UserDto toUser){
        Follow follow = Follow.builder().fromUser(fromUser).toUser(toUser).build();
        followRepository.save(follow);
        return follow.getId();
    }
}
