package com.plover.model.mentoring.response;

import com.plover.model.mentoring.Mentoring;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@ApiModel(description = "멘토링 객체 공통")
public class MentoringResponse {
    private Long no;
    private String email;
    private String nickName;
    private String profileImageUrl;

    private Long id;
    private String mentoringImageUrl;
    private String title;
    private String startDate;
    private String startTime;
    private String endDate;
    private String endTime;
    private String content;
    private String type;

    private String address;

    private String state;

    private Integer currentPersonnel;

    private Integer maxPersonnel;

    private String place;

    private List<CommentResponse> comments;

    public MentoringResponse(Long no, String email, String nickName, String profileImageUrl, Long id, String mentoringImageUrl, String title, String startDate, String startTime, String endDate, String endTime, String content, String type, String address, String state, Integer currentPersonnel, Integer maxPersonnel, String place, List<CommentResponse> comments) {
        this.no = no;
        this.email = email;
        this.nickName = nickName;
        this.profileImageUrl = profileImageUrl;
        this.id = id;
        this.mentoringImageUrl = mentoringImageUrl;
        this.title = title;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.content = content;
        this.type = type;
        this.address = address;
        this.state = state;
        this.currentPersonnel = currentPersonnel;
        this.maxPersonnel = maxPersonnel;
        this.place = place;
        this.comments = comments;
    }

    public static MentoringResponse of(Mentoring mentoring){
        return new MentoringResponse(
                mentoring.getUser().getNo(),
                mentoring.getUser().getEmail(),
                mentoring.getUser().getNickName(),
                mentoring.getUser().getProfileImageUrl(),
                mentoring.getId(),
                mentoring.getMentoringImageUrl(),
                mentoring.getTitle(),
                mentoring.getStartDate(),
                mentoring.getStartTime(),
                mentoring.getEndDate(),
                mentoring.getEndTime(),
                mentoring.getContent(),
                mentoring.getType(),
                mentoring.getAddress(),
                mentoring.getState(),
                mentoring.getCurrentPersonnel(),
                mentoring.getMaxPersonnel(),
                mentoring.getPlace(),
                CommentResponse.listof(mentoring.getCommentList())
        );
    }

    public static List<MentoringResponse> listof(List<Mentoring> mentorings){
        List<MentoringResponse> mentoringResponses = new ArrayList<>();

        for (Mentoring metoring: mentorings) {
            mentoringResponses.add(of(metoring));
        }
        return mentoringResponses;
    }
}
