package com.plover.service;

import com.plover.config.Constant;
import com.plover.model.follow.Follow;
import com.plover.model.follow.response.FollowUsersResponse;
import com.plover.model.user.UserDto;
import com.plover.repository.FollowRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FollowService {
    private FollowRepository followRepository;
    public FollowService(FollowRepository followRepository){
        this.followRepository = followRepository;
    }

    public void save(UserDto fromUser, UserDto toUser){
        Follow follow = Follow.builder().fromUser(fromUser).toUser(toUser).build();
        followRepository.save(follow);
    }

    public FollowUsersResponse getFollowingUsers(Long cursorId, Long no) {
        Pageable page = PageRequest.of(0, Constant.FOLLOW_PAGE_SIZE.getValue());
        //페이지에 맞게 리스트 반환
        List<Follow> follows;
        if(cursorId==0){
            follows = followRepository.findByFromUserNoOrderByIdDesc(no,page);
        }else{
            follows = followRepository.findByIdLessThanAndFromUserNoOrderByIdDesc(cursorId,no,page);
        }
        List<UserDto> followings = new ArrayList<>();
        for(Follow follow : follows){
            followings.add(follow.getToUser());
        }

        final Long lastIdOfList = follows.isEmpty()? null : follows.get(follows.size()-1).getId();
        return new FollowUsersResponse(followings,hasNext(lastIdOfList));
    }

    public FollowUsersResponse getFollowerUsers(Long cursorId, Long no) {
        Pageable page = PageRequest.of(0, Constant.FOLLOW_PAGE_SIZE.getValue());
        //페이지에 맞게 리스트 반환
        List<Follow> follows;
        if(cursorId==0){
            follows = followRepository.findByToUserNoOrderByIdDesc(no,page);
        }else{
            follows = followRepository.findByIdLessThanAndToUserNoOrderByIdDesc(cursorId,no,page);
        }
        List<UserDto> followers = new ArrayList<>();
        for(Follow follow : follows){
            followers.add(follow.getFromUser());
        }

        final Long lastIdOfList = follows.isEmpty()? null : follows.get(follows.size()-1).getId();
        return new FollowUsersResponse(followers,hasNext(lastIdOfList));
    }

    private Boolean hasNext(Long lastIdOfList) {
        if (lastIdOfList == null) return false;
        // 마지막 인덱스보다 작은 것이 있으면 true, 없으면 false
        return followRepository.existsByIdLessThan(lastIdOfList);
    }
}
