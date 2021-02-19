package com.plover.model.user.response;

import com.plover.model.user.Users;
import lombok.Getter;

@Getter
public class ProfileResponse {
    private Long no;
    private String email;
    private String nickname;
    private String profileImageUrl;
    private String generation;
    private String description;
    private Long articleNum; // 멘토링 게시글 수
    private Long followerNum;
    private Long followingNum;

    public ProfileResponse(Long no, String email, String nickname, String profileImageUrl, String generation, String description) {
        this.no = no;
        this.email = email;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
        this.generation = generation;
        this.description = description;
    }

    public static ProfileResponse of(Users user) {
        return new ProfileResponse(user.getNo(), user.getEmail(), user.getNickName(), user.getProfileImageUrl(), user.getGeneration(), user.getDescription());
    }

    public void setArticleNum(Long articleNum) {
        this.articleNum = articleNum;
    }

    public void setFollowerNum(Long followerNum) {
        this.followerNum = followerNum;
    }

    public void setFollowingNum(Long followingNum) {
        this.followingNum = followingNum;
    }
}
