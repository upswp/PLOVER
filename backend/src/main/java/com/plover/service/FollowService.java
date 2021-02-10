package com.plover.service;

import com.plover.config.Constant;
import com.plover.exceptions.EntityNotFoundException;
import com.plover.exceptions.ErrorCode;
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

    public FollowService(FollowRepository followRepository) {
        this.followRepository = followRepository;
    }

    public Boolean existsFollowing(Long fromUserNo, Long toUserNo) {
        return followRepository.existsByFromUserNoAndToUserNo(fromUserNo, toUserNo);
    }

    public Boolean existsFollower(Long fromUserNo, Long toUserNo) {
        return followRepository.existsByFromUserNoAndToUserNo(toUserNo, fromUserNo);
    }

    // 팔로잉/팔로워 저장
    public void save(UserDto fromUser, UserDto toUser) {
        Follow follow = Follow.builder().fromUser(fromUser).toUser(toUser).build();
        followRepository.save(follow);
    }

    // 전달 받은 no값을 가진 유저의 팔로잉 리스트 반환
    public FollowUsersResponse getFollowingUsers(Long cursorId, Long no) {
        Pageable page = PageRequest.of(0, Constant.FOLLOW_PAGE_SIZE.getValue());
        //페이지에 맞게 리스트 반환
        List<Follow> follows;
        if (cursorId == 0) {
            follows = followRepository.findByFromUserNoOrderByIdDesc(no, page);
        } else {
            follows = followRepository.findByIdLessThanAndFromUserNoOrderByIdDesc(cursorId, no, page);
        }
        List<UserDto> followings = new ArrayList<>();
        for (Follow follow : follows) {
            followings.add(follow.getToUser());
        }

        final Long lastIdOfList = follows.isEmpty() ? null : follows.get(follows.size() - 1).getId();
        return new FollowUsersResponse(followings, hasNextFollowing(no, lastIdOfList));
    }

    // 다음 목록이 있는 지
    private Boolean hasNextFollowing(Long no, Long lastIdOfList) {
        if (lastIdOfList == null) return false;
        // 마지막 인덱스보다 작은 것이 있으면 true, 없으면 false
        return followRepository.existsByIdLessThanAndFromUserNo(lastIdOfList, no);
    }

    // 전달 받은 no값을 가진 유저의 팔로워 리스트 반환
    public FollowUsersResponse getFollowerUsers(Long cursorId, Long no) {
        Pageable page = PageRequest.of(0, Constant.FOLLOW_PAGE_SIZE.getValue());
        //페이지에 맞게 리스트 반환
        List<Follow> follows;
        if (cursorId == 0) {
            follows = followRepository.findByToUserNoOrderByIdDesc(no, page);
        } else {
            follows = followRepository.findByIdLessThanAndToUserNoOrderByIdDesc(cursorId, no, page);
        }
        List<UserDto> followers = new ArrayList<>();
        for (Follow follow : follows) {
            followers.add(follow.getFromUser());
        }

        final Long lastIdOfList = follows.isEmpty() ? null : follows.get(follows.size() - 1).getId();
        return new FollowUsersResponse(followers, hasNextFollower(no, lastIdOfList));
    }

    // 다음 목록이 있는 지
    private Boolean hasNextFollower(Long no, Long lastIdOfList) {
        if (lastIdOfList == null) return false;
        // 마지막 인덱스보다 작은 것이 있으면 true, 없으면 false
        return followRepository.existsByIdLessThanAndToUserNo(lastIdOfList, no);
    }

    public void delete(Long fromUserNo, Long toUserNo) {
        Follow follow = findByFromUserNoAndToUserNo(fromUserNo,toUserNo);
        followRepository.delete(follow);
    }

    private Follow findByFromUserNoAndToUserNo(Long fromUserNo, Long toUserNo) {
        return followRepository.findByFromUserNoAndToUserNo(fromUserNo,toUserNo)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.FOLLOW_NOT_FOUND));
    }
}
